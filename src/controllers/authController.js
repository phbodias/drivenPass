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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInController = exports.signUpController = void 0;
const userServices_1 = require("../services/userServices");
function signUpController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        yield (0, userServices_1.createUser)(user);
        return res.sendStatus(201);
    });
}
exports.signUpController = signUpController;
function signInController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        const token = yield (0, userServices_1.verifyLogin)(user);
        return res.status(200).send({ token });
    });
}
exports.signInController = signInController;
