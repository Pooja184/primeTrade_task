import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/mongoDB.js";
import mainRouter from "./src/routes/index.js"

dotenv.config();

const app = express();


app.use(express.json());
app.use(cookieParser());
connectDB();

app.use(
  cors({
    origin: "https://primetradeblog-application.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Backend is running ");
});

app.use('/api/v1',mainRouter);


const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, () => {
  console.log(` Server is listening on port ${port}`);
});