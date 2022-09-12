"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var wifiController_1 = require("../controllers/wifiController");
var tokenMiddleware_1 = require("../middlewares/tokenMiddleware");
var validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
var wifiSchema_1 = __importDefault(require("../schemas/wifiSchema"));
var wifiRoute = (0, express_1.Router)();
wifiRoute.post("/wifi", tokenMiddleware_1.validateJWT, (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(wifiSchema_1["default"]), wifiController_1.createWifi);
wifiRoute.get("/wifis", tokenMiddleware_1.validateJWT, wifiController_1.getUserWifis);
wifiRoute.get("/wifi/:id", tokenMiddleware_1.validateJWT, wifiController_1.getWifiById);
wifiRoute["delete"]("/wifi/:id", tokenMiddleware_1.validateJWT, wifiController_1.deleteWifi);
exports["default"] = wifiRoute;
