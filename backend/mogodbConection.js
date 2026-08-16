// getting-started.js

import mongoose from "mongoose";
import "dotenv/config";

export async function main() {
  const uri = process.env.DB_URL;
  if (!uri) {
    throw new Error("DB_URL is missing from the .env file.");
  }

  await mongoose.connect(uri);
  console.log("MongoDB connected");

}
