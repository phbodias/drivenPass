"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encryptString = exports.comparePasswords = exports.encryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const cryptr_1 = __importDefault(require("cryptr"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function encryptPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRound = Number(process.env.ENCRYPT_SALTS) || 20;
        const salt = yield bcrypt_1.default.genSalt(saltRound);
        const crypt = yield bcrypt_1.default.hash(password, salt);
        return crypt;
    });
}
exports.encryptPassword = encryptPassword;
function comparePasswords(password, crypPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const passwordsMatch = yield bcrypt_1.default.compare(password, crypPassword);
        if (!passwordsMatch)
            return false;
        return true;
    });
}
exports.comparePasswords = comparePasswords;
function encryptString(password) {
    var _a;
    const cryptrKey = (_a = process.env.CRYPTR_PASSWORD) !== null && _a !== void 0 ? _a : "";
    const cryptr = new cryptr_1.default(cryptrKey);
    return cryptr.encrypt(password);
}
exports.encryptString = encryptString;
function decrypt(password) {
    var _a;
    const cryptrKey = (_a = process.env.CRYPTR_PASSWORD) !== null && _a !== void 0 ? _a : "";
    const cryptr = new cryptr_1.default(cryptrKey);
    return cryptr.decrypt(password);
}
exports.decrypt = decrypt;
