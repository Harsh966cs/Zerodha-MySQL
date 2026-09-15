CREATE TABLE IF NOT EXISTS users (
  clerk_id TEXT PRIMARY KEY,
  email TEXT,
  name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stocks (
  id SERIAL PRIMARY KEY,
  symbol TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  exchange TEXT,
  current_price NUMERIC(18, 4) NOT NULL DEFAULT 0 CHECK (current_price >= 0),
  day_change NUMERIC(10, 4) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE stocks ADD COLUMN IF NOT EXISTS current_price NUMERIC(18, 4) NOT NULL DEFAULT 0;
ALTER TABLE stocks ADD COLUMN IF NOT EXISTS day_change NUMERIC(10, 4) NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS watchlist (
  id SERIAL PRIMARY KEY,
  clerk_id TEXT NOT NULL REFERENCES users(clerk_id) ON DELETE CASCADE,
  stock_id INTEGER NOT NULL REFERENCES stocks(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (clerk_id, stock_id)
);

CREATE TABLE IF NOT EXISTS holdings (
  id SERIAL PRIMARY KEY,
  clerk_id TEXT NOT NULL REFERENCES users(clerk_id) ON DELETE CASCADE,
  stock_id INTEGER NOT NULL REFERENCES stocks(id) ON DELETE CASCADE,
  qty NUMERIC(18, 4) NOT NULL CHECK (qty > 0),
  avg_price NUMERIC(18, 4) NOT NULL CHECK (avg_price >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (clerk_id, stock_id)
);

CREATE TABLE IF NOT EXISTS positions (
  id SERIAL PRIMARY KEY,
  clerk_id TEXT NOT NULL REFERENCES users(clerk_id) ON DELETE CASCADE,
  stock_id INTEGER NOT NULL REFERENCES stocks(id) ON DELETE CASCADE,
  product TEXT NOT NULL,
  qty NUMERIC(18, 4) NOT NULL CHECK (qty <> 0),
  avg_price NUMERIC(18, 4) NOT NULL CHECK (avg_price >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (clerk_id, stock_id, product)
);

CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  clerk_id TEXT NOT NULL REFERENCES users(clerk_id) ON DELETE CASCADE,
  stock_id INTEGER NOT NULL REFERENCES stocks(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('BUY', 'SELL')),
  qty NUMERIC(18, 4) NOT NULL CHECK (qty > 0),
  price NUMERIC(18, 4) NOT NULL CHECK (price >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS holdings_clerk_stock_uidx
  ON holdings(clerk_id, stock_id);
CREATE UNIQUE INDEX IF NOT EXISTS positions_clerk_stock_product_uidx
  ON positions(clerk_id, stock_id, product);
CREATE INDEX IF NOT EXISTS watchlist_clerk_id_idx ON watchlist(clerk_id);
CREATE INDEX IF NOT EXISTS holdings_clerk_id_idx ON holdings(clerk_id);
CREATE INDEX IF NOT EXISTS positions_clerk_id_idx ON positions(clerk_id);
CREATE INDEX IF NOT EXISTS transactions_clerk_id_idx ON transactions(clerk_id);
