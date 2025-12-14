import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/mongoDB.js";
import mainRouter from "./src/routes/index.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: true, 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions)); 


connectDB();

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/v1", mainRouter);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
