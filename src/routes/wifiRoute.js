"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wifiController_1 = require("../controllers/wifiController");
const tokenMiddleware_1 = require("../middlewares/tokenMiddleware");
const validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
const wifiSchema_1 = __importDefault(require("../schemas/wifiSchema"));
const wifiRoute = (0, express_1.Router)();
wifiRoute.post("/wifi", tokenMiddleware_1.validateJWT, (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(wifiSchema_1.default), wifiController_1.createWifi);
wifiRoute.get("/wifis", tokenMiddleware_1.validateJWT, wifiController_1.getUserWifis);
wifiRoute.get("/wifi/:id", tokenMiddleware_1.validateJWT, wifiController_1.getWifiById);
wifiRoute.delete("/wifi/:id", tokenMiddleware_1.validateJWT, wifiController_1.deleteWifi);
exports.default = wifiRoute;
