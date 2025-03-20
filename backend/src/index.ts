import express from "express";
import dotenv from "dotenv";
import passport from "./config/passport";
import session, { SessionOptions } from "express-session";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import journalRoutes from "./routes/journalRoutes";
import path from "path";

// Load environment variables
dotenv.config();
connectDB();

// Initialize Express
const app = express();
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "yourSecretKey",
  resave: false, // Boolean
  saveUninitialized: true, // Boolean
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/journal", journalRoutes);

app.use(express.static(path.join(__dirname, "../../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
