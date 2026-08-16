import express from "express";
import { main } from "./mogodbConection.js";
import Holding from "./models/Holding.js";
import Position from "./models/Position.js";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/status",(req,res)=>{
    res.send("This is the server runing");
})

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


