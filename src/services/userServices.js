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
exports.verifyLogin = exports.createUser = void 0;
const tokenMiddleware_1 = require("../middlewares/tokenMiddleware");
const userRepository = __importStar(require("../repositories/userRepository"));
const passwordsFunctions_1 = require("../utils/passwordsFunctions");
function emailIsInUse(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const inUse = yield userRepository.findByEmail(email);
        if (inUse)
            return true;
        return false;
    });
}
function createUser(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const emailIsNotAvailable = yield emailIsInUse(userData.email);
        if (emailIsNotAvailable)
            throw { code: "Conflict", message: "Email already in use" };
        userData.password = yield (0, passwordsFunctions_1.encryptPassword)(userData.password);
        yield userRepository.insert(userData);
    });
}
exports.createUser = createUser;
function verifyLogin(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userRepository.findByEmail(userData.email);
        if (!user)
            throw { code: "NotFound", message: "You haven't an account" };
        const correctPass = yield (0, passwordsFunctions_1.comparePasswords)(userData.password, user.password);
        if (!correctPass)
            throw { code: "Unauthorized", message: "Incorrect email or password" };
        const token = (0, tokenMiddleware_1.createToken)(user);
        return token;
    });
}
exports.verifyLogin = verifyLogin;
