import { Router } from "express";
import { createCard, deletecard, getCardById, getUsercards } from "../controllers/cardController";
import { validateJWT } from "../middlewares/tokenMiddleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import cardSchema from "../schemas/cardSchema";

const cardRoute = Router();

cardRoute.post(
  "/card",
  validateJWT,
  validateSchemaMiddleware(cardSchema),
  createCard
);
cardRoute.get("/cards", validateJWT, getUsercards);
cardRoute.get("/card/:id", validateJWT, getCardById);
cardRoute.delete("/card/:id", validateJWT, deletecard);

export default cardRoute;