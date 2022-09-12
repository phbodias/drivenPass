"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWifi = exports.getUserWifis = exports.getWifiById = exports.createWifi = void 0;
const wifiServices = __importStar(require("../services/wifiServices"));
function createWifi(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifiData = req.body;
        const userId = res.locals.userId;
        yield wifiServices.createWifi(wifiData, userId);
        return res.sendStatus(201);
    });
}
exports.createWifi = createWifi;
function getWifiById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.userId;
        const wifiId = Number(req.params.id);
        const wifi = yield wifiServices.wifiById(wifiId, userId);
        return res.status(200).send(wifi);
    });
}
exports.getWifiById = getWifiById;
function getUserWifis(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.userId;
        const wifis = yield wifiServices.userWifis(userId);
        return res.status(200).send(wifis);
    });
}
exports.getUserWifis = getUserWifis;
function deleteWifi(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.userId;
        const id = Number(req.params.id);
        yield wifiServices.deletewifi(id, userId);
        return res.sendStatus(204);
    });
}
exports.deleteWifi = deleteWifi;
