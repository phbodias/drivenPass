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
exports.validateJWT = exports.createToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
function createToken(user) {
    var _a;
    const secret = (_a = process.env.TOKEN_SECRET_KEY) !== null && _a !== void 0 ? _a : "";
    const token = jsonwebtoken_1.default.sign({ id: user.id }, secret, {
        expiresIn: "1h",
    });
    return token;
}
exports.createToken = createToken;
function validateJWT(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { authorization } = req.headers;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.replace("Bearer ", "");
        if (!token)
            throw { code: "Unauthorized", message: "Token inválido" };
        const SECRET = (_a = process.env.TOKEN_SECRET_KEY) !== null && _a !== void 0 ? _a : "";
        jsonwebtoken_1.default.verify(token, SECRET, (err, decoded) => {
            if (err)
                throw { code: "Unauthorized", message: "Token inválido" };
            res.locals.userId = Number(decoded.id);
            next();
        });
    });
}
exports.validateJWT = validateJWT;
