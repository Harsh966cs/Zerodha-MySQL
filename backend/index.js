import express from "express";
import { main } from "./mogodbConection.js";
import Holding from "./models/Holding.js";
import Position from "./models/Position.js";
import cors from 'cors';
import dotenv from 'dotenv'; // 🟢 1. Import dotenv to read environment configurations

// Load variables from your .env file
dotenv.config();

const app = express();

// 🟢 2. Fetch allowed origins strictly from the environment variable.
// No hardcoded fallback — if ALLOWED_ORIGINS isn't set, no cross-origin requests are allowed.
if (!process.env.ALLOWED_ORIGINS) {
  console.warn("⚠️ ALLOWED_ORIGINS is not set. No cross-origin requests will be allowed.");
}

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [];

// 🟢 3. Clear and unified CORS configuration setup
app.use(cors({
  origin: function (origin, callback) {
    // Allows server-to-server or postman requests with no origin header
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      const msg = `The CORS policy for this site does not allow access from origin: ${origin}`;
      return callback(new Error(msg), false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Handles methods globally
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"] // Handles headers globally
}));

app.use(express.json());

app.get("/status", (req, res) => {
    res.send("This is the server runing");
});

app.post("/holdings", async (req, res) => {
    try {
        const holdings = Array.isArray(req.body) ? req.body : req.body.holdings;
        if (!Array.isArray(holdings) || holdings.length === 0) {
            return res.status(400).json({ message: "Send a non-empty holdings array in the request body." });
        }
        const savedHoldings = await Holding.insertMany(holdings);
        res.status(201).json({ message: `${savedHoldings.length} holdings added successfully.`, holdings: savedHoldings });
    } catch (error) {
        res.status(400).json({ message: "Unable to add holdings.", error: error.message });
    }
});

app.get("/holdings", async (req, res) => {
    try {
        res.json(await Holding.find());
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch holdings.", error: error.message });
    }
});

app.post("/positions", async (req, res) => {
    try {
        const positions = Array.isArray(req.body) ? req.body : req.body.positions;
        if (!Array.isArray(positions) || positions.length === 0) {
            return res.status(400).json({ message: "Send a non-empty positions array in the request body." });
        }
        const savedPositions = await Position.insertMany(positions);
        res.status(201).json({ message: `${savedPositions.length} positions added successfully.`, positions: savedPositions });
    } catch (error) {
        res.status(400).json({ message: "Unable to add positions.", error: error.message });
    }
});

app.get("/positions", async (req, res) => {
    try {
        res.json(await Position.find());
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch positions.", error: error.message });
    }
});

main()
    .then(() => app.listen(8080, () => console.log("Server listening on port 8080")))
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    });