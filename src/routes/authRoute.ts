import { Router } from "express";
import { signInController, signUpController } from "../controllers/authController";

const authRoute = Router();

authRoute.post('/signup', signUpController);
authRoute.post('/signin', signInController);

export default authRoute;