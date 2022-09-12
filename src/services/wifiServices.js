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
exports.deletewifi = exports.wifiById = exports.userWifis = exports.createWifi = void 0;
const wifisRepository = __importStar(require("../repositories/wifisRepository"));
const passwordsFunctions_1 = require("../utils/passwordsFunctions");
function createWifi(wifiData, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        wifiData.password = (0, passwordsFunctions_1.encryptString)(wifiData.password);
        yield wifisRepository.insert(wifiData, userId);
    });
}
exports.createWifi = createWifi;
function userWifis(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifis = yield wifisRepository.findByUserId(userId);
        return wifis.map((wifi) => {
            wifi.password = (0, passwordsFunctions_1.decrypt)(wifi.password);
            return wifi;
        });
    });
}
exports.userWifis = userWifis;
function wifiById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifi = yield wifisRepository.findById(id);
        if (!wifi)
            throw { code: "NotFound", message: "wifi does not exist" };
        const ownerId = wifi.userId;
        if (userId !== ownerId)
            throw { code: "Unauthorized", message: "Unauthorized" };
        wifi.password = (0, passwordsFunctions_1.decrypt)(wifi.password);
        return wifi;
    });
}
exports.wifiById = wifiById;
function deletewifi(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wifi = yield wifiById(id, userId);
        yield wifisRepository.deleteOne(id);
    });
}
exports.deletewifi = deletewifi;
