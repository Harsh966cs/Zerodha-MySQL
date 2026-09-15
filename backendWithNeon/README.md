# Neon backend

This is the active backend for the dashboard. It uses Clerk for authentication and Neon PostgreSQL for users, stocks, watchlists, holdings, positions, and transactions.

1. Copy `.env.example` to `.env` and fill in the Neon and Clerk values.
2. Run `schema.sql` in the Neon SQL editor.
3. Run `seed.sql` in the Neon SQL editor.
4. Start the server with `npm run dev` or `npm start`.

The dashboard must use the server URL in `REACT_APP_API_URL`. Every `/api/*` route requires a Clerk bearer token.
