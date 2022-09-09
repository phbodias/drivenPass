import { Router } from "express";
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware';
import { signInController, signUpController } from "../controllers/authController";
import authSchema from '../schemas/authSchema'

const authRoute = Router();

authRoute.post('/signup', validateSchemaMiddleware(authSchema), signUpController);
authRoute.post('/signin', validateSchemaMiddleware(authSchema), signInController);

export default authRoute;