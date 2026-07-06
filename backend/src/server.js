const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const trackerRoutes = require("./routes/trackerRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const { notFound, errorHandler,} = require("./middleware/errorMiddleware");


connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/tracker", trackerRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});