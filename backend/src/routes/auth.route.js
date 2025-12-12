import { Router } from "express";
import { getCurrentUser, login, logoutUser, register } from "../controllers/auth.controller.js";
import { tokenDecoder } from "../middlewares/tokenDecoder.js";

const authRouter=Router();

authRouter.post("/register",register);
authRouter.post("/login",login)
authRouter.post("/logout",logoutUser)
authRouter.get("/current-user",tokenDecoder,getCurrentUser)

export default authRouter;