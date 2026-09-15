INSERT INTO stocks (symbol, name, current_price, day_change)
VALUES
  ('INFY', 'INFY', 1555.45, -1.60),
  ('ONGC', 'ONGC', 116.80, -0.09),
  ('TCS', 'TCS', 3194.80, -0.25),
  ('KPITTECH', 'KPITTECH', 266.45, 3.54),
  ('QUICKHEAL', 'QUICKHEAL', 308.55, -0.15),
  ('WIPRO', 'WIPRO', 577.75, 0.32),
  ('M&M', 'M&M', 779.80, -0.01),
  ('RELIANCE', 'RELIANCE', 2112.40, 1.44),
  ('HUL', 'HUL', 512.40, 1.04),
  ('BHARTIARTL', 'BHARTIARTL', 541.15, 0),
  ('HDFCBANK', 'HDFCBANK', 1522.35, 0),
  ('HINDUNILVR', 'HINDUNILVR', 2417.40, 0),
  ('ITC', 'ITC', 207.90, 0),
  ('SBIN', 'SBIN', 430.20, 0),
  ('SGBMAY29', 'SGBMAY29', 4719.00, 0),
  ('TATAPOWER', 'TATAPOWER', 124.15, 0),
  ('EVEREADY', 'EVEREADY', 312.35, -1.24),
  ('JUBLFOOD', 'JUBLFOOD', 3082.65, -1.35)
ON CONFLICT (symbol) DO UPDATE
SET name = EXCLUDED.name,
    current_price = EXCLUDED.current_price,
    day_change = EXCLUDED.day_change;
