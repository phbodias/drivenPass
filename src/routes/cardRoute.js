"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cardController_1 = require("../controllers/cardController");
const tokenMiddleware_1 = require("../middlewares/tokenMiddleware");
const validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
const cardSchema_1 = __importDefault(require("../schemas/cardSchema"));
const cardRoute = (0, express_1.Router)();
cardRoute.post("/card", tokenMiddleware_1.validateJWT, (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(cardSchema_1.default), cardController_1.createCard);
cardRoute.get("/cards", tokenMiddleware_1.validateJWT, cardController_1.getUsercards);
cardRoute.get("/card/:id", tokenMiddleware_1.validateJWT, cardController_1.getCardById);
cardRoute.delete("/card/:id", tokenMiddleware_1.validateJWT, cardController_1.deletecard);
exports.default = cardRoute;
