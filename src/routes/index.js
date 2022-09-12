"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const annotationRoute_1 = __importDefault(require("./annotationRoute"));
const authRoute_1 = __importDefault(require("./authRoute"));
const cardRoute_1 = __importDefault(require("./cardRoute"));
const credentialsRoute_1 = __importDefault(require("./credentialsRoute"));
const wifiRoute_1 = __importDefault(require("./wifiRoute"));
const router = (0, express_1.Router)();
router.use(authRoute_1.default);
router.use(credentialsRoute_1.default);
router.use(annotationRoute_1.default);
router.use(cardRoute_1.default);
router.use(wifiRoute_1.default);
exports.default = router;
