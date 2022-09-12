"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var annotationRoute_1 = __importDefault(require("./annotationRoute"));
var authRoute_1 = __importDefault(require("./authRoute"));
var cardRoute_1 = __importDefault(require("./cardRoute"));
var credentialsRoute_1 = __importDefault(require("./credentialsRoute"));
var wifiRoute_1 = __importDefault(require("./wifiRoute"));
var router = (0, express_1.Router)();
router.use(authRoute_1["default"]);
router.use(credentialsRoute_1["default"]);
router.use(annotationRoute_1["default"]);
router.use(cardRoute_1["default"]);
router.use(wifiRoute_1["default"]);
exports["default"] = router;
