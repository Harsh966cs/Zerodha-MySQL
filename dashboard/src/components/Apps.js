import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const Apps = () => {
  const { getToken } = useAuth();
  const [stocks, setStocks] = useState([]);
  const [form, setForm] = useState({
    stockId: "",
    qty: 1,
    price: "",
    product: "CNC",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStocks = async () => {
      try {
        setLoading(true);
        setError("");
        const token = await getToken();
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stocks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStocks(response.data);
        if (response.data.length > 0) {
          setForm((current) => ({
            ...current,
            stockId: String(response.data[0].id),
            price: response.data[0].price,
          }));
        }
      } catch (requestError) {
        setError(requestError.response?.data?.error || "Unable to load stocks.");
      } finally {
        setLoading(false);
      }
    };
    loadStocks();
  }, [getToken]);

  const selectedStock = stocks.find((stock) => String(stock.id) === form.stockId);

  const updateStock = (event) => {
    const stock = stocks.find((item) => String(item.id) === event.target.value);
    setForm((current) => ({
      ...current,
      stockId: event.target.value,
      price: stock?.price ?? "",
    }));
  };

  const submit = async (type) => {
    try {
      setMessage("");
      setError("");
      const token = await getToken();
      const headers = { Authorization: `Bearer ${token}` };
      const payload = {
        stockId: Number(form.stockId),
        qty: Number(form.qty),
        price: Number(form.price),
      };

      if (type === "watchlist") {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/watchlist`, payload, { headers });
        setMessage(`${selectedStock.symbol} added to your watchlist.`);
      } else if (type === "holding") {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/buy`, payload, { headers });
        setMessage(`${selectedStock.symbol} added to your holdings.`);
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/positions`,
          { ...payload, product: form.product },
          { headers },
        );
        setMessage(`${selectedStock.symbol} added to your positions.`);
      }
    } catch (requestError) {
      setError(requestError.response?.data?.error || "Unable to save stock.");
    }
  };

  return (
    <div className="apps">
      <h3 className="title">Stocks from Neon</h3>
      <p>Select a stock below, then add it to your holdings, positions, or watchlist.</p>
      {loading && <p>Loading stocks from Neon...</p>}
      {!loading && !error && stocks.length === 0 && (
        <p className="loss">No stocks were found in Neon. Restart the backend and refresh this page.</p>
      )}
      {error && <p className="loss">{error}</p>}
      {!loading && stocks.length > 0 && (
        <>
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Day change</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock) => (
                  <tr key={stock.id}>
                    <td>{stock.symbol}</td>
                    <td>{Number(stock.price).toFixed(2)}</td>
                    <td className={Number(stock.day_change) < 0 ? "loss" : "profit"}>
                      {Number(stock.day_change).toFixed(2)}%
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-blue"
                        onClick={() => {
                          setForm((current) => ({
                            ...current,
                            stockId: String(stock.id),
                            price: stock.price,
                          }));
                          document.getElementById("stock-order-form")?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="form" id="stock-order-form">
            <h4>{selectedStock ? `Add ${selectedStock.symbol}` : "Add selected stock"}</h4>
            <label htmlFor="stock">Stock</label>
            <select id="stock" value={form.stockId} onChange={updateStock}>
              {stocks.map((stock) => (
                <option key={stock.id} value={stock.id}>
                  {stock.symbol} - {Number(stock.price).toFixed(2)}
                </option>
              ))}
            </select>

            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="number"
              min="0.0001"
              step="0.0001"
              value={form.qty}
              onChange={(event) => setForm({ ...form, qty: event.target.value })}
            />

            <label htmlFor="price">Average / buy price</label>
            <input
              id="price"
              type="number"
              min="0.0001"
              step="0.01"
              value={form.price}
              onChange={(event) => setForm({ ...form, price: event.target.value })}
            />

            <label htmlFor="product">Position product</label>
            <select
              id="product"
              value={form.product}
              onChange={(event) => setForm({ ...form, product: event.target.value })}
            >
              <option value="CNC">CNC</option>
              <option value="MIS">MIS</option>
              <option value="NRML">NRML</option>
            </select>

            <div className="buttons">
              <button type="button" className="btn btn-blue" onClick={() => submit("holding")}>
                Add holding
              </button>
              <button type="button" className="btn btn-green" onClick={() => submit("position")}>
                Add position
              </button>
              <button type="button" className="btn" onClick={() => submit("watchlist")}>
                Add watchlist
              </button>
            </div>
            {message && <p className="profit">{message}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default Apps;
