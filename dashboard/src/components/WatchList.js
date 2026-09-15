
import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");
  const { getToken } = useAuth();

  useEffect(() => {
    const loadStocks = async () => {
      try {
        const token = await getToken();
        const headers = { Authorization: `Bearer ${token}` };
        const [stockResponse, watchlistResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/api/stocks`, { headers }),
          axios.get(`${process.env.REACT_APP_API_URL}/api/watchlist`, { headers }),
        ]);
        setStocks(stockResponse.data);
        setWatchlist(watchlistResponse.data);
      } catch (error) {
        console.error("Unable to fetch stocks:", error);
      }
    };
    loadStocks();
  }, [getToken]);

  const addToWatchlist = async (stock) => {
    try {
      const token = await getToken();
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/watchlist`,
        { stockId: stock.id },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setWatchlist((current) => [...current, stock]);
      setSearch("");
    } catch (error) {
      console.error("Unable to add stock to watchlist:", error);
    }
  };

  const visibleStocks = useMemo(() => {
    const query = search.trim().toLowerCase();
    const watchedIds = new Set(watchlist.map((stock) => stock.id));
    return stocks
      .filter((stock) => !watchedIds.has(stock.id))
      .filter((stock) => !query || stock.symbol.toLowerCase().includes(query))
      .slice(0, 5);
  }, [search, stocks, watchlist]);

  const labels = watchlist.map((stock) => stock.symbol);
  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => Number(stock.price)),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // export const data = {
  //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  // datasets: [
  //   {
  //     label: "# of Votes",
  //     data: [12, 19, 3, 5, 2, 3],
  //     backgroundColor: [
  //       "rgba(255, 99, 132, 0.2)",
  //       "rgba(54, 162, 235, 0.2)",
  //       "rgba(255, 206, 86, 0.2)",
  //       "rgba(75, 192, 192, 0.2)",
  //       "rgba(153, 102, 255, 0.2)",
  //       "rgba(255, 159, 64, 0.2)",
  //     ],
  //     borderColor: [
  //       "rgba(255, 99, 132, 1)",
  //       "rgba(54, 162, 235, 1)",
  //       "rgba(255, 206, 86, 1)",
  //       "rgba(75, 192, 192, 1)",
  //       "rgba(153, 102, 255, 1)",
  //       "rgba(255, 159, 64, 1)",
  //     ],
  //     borderWidth: 1,
  //   },
  // ],
  // };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <span className="counts"> {watchlist.length} / 50</span>
      </div>

      {search && visibleStocks.length > 0 && (
        <ul className="list">
          {visibleStocks.map((stock) => (
            <li key={stock.id}>
              <button type="button" className="action" onClick={() => addToWatchlist(stock)}>
                Add {stock.symbol}
              </button>
            </li>
          ))}
        </ul>
      )}

      <ul className="list">
        {watchlist.map((stock) => {
          return <WatchListItem stock={stock} key={stock.id} />;
        })}
      </ul>

      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = (e) => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = (e) => {
    setShowWatchlistActions(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={Number(stock.day_change) < 0 ? "down" : "up"}>{stock.symbol}</p>
        <div className="itemInfo">
          <span className="percent">{Number(stock.day_change).toFixed(2)}%</span>
          {Number(stock.day_change) < 0 ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="down" />
          )}
          <span className="price">{Number(stock.price).toFixed(2)}</span>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions uid={stock.symbol} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={handleBuyClick}
        >
          <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
