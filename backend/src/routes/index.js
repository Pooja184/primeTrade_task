import { Router } from "express";
import authRouter from "./auth.route.js";
import blogRouter from "./blog.route.js";

const mainRouter=Router();

mainRouter.use("/auth",authRouter)
mainRouter.use("/blog",blogRouter)


export default mainRouter;