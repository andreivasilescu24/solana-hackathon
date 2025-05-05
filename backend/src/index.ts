import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import tournamentRoutes from "./routes/tournament.routes";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tournaments", tournamentRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Cron job for tournament finalization
// Run every hour
cron.schedule("0 * * * *", async () => {
  try {
    console.log("Running tournament finalization check...");
    // TODO: Implement tournament finalization logic
  } catch (error) {
    console.error("Error in tournament finalization cron job:", error);
  }
});
