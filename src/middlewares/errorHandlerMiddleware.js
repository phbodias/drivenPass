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
function errorHandler(error, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (error.code === 'NotFound') {
            return res.status(404).send(error.message);
        }
        else if (error.code === 'Conflict') {
            return res.status(409).send(error.message);
        }
        else if (error.code === 'IncompatibleFormat') {
            return res.status(422).send(error.message);
        }
        else if (error.code === 'Expired') {
            return res.status(406).send(error.message);
        }
        else if (error.code === 'Unauthorized') {
            return res.status(401).send(error.message);
        }
        else if (error.code === 'BadRequest') {
            return res.status(400).send(error.message);
        }
        res.sendStatus(500);
    });
}
exports.default = errorHandler;
