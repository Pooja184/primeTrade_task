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
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use('/api/v1',mainRouter);


const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, () => {
  console.log(` Server is listening on port ${port}`);
});