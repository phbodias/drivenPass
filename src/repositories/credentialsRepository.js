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
exports.findByTitleAndUserId = exports.findByUserId = exports.findById = exports.deleteOne = exports.insert = void 0;
const database_1 = __importDefault(require("../database/database"));
function insert(newCredential, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.credentials.create({ data: Object.assign(Object.assign({}, newCredential), { userId }) });
    });
}
exports.insert = insert;
function deleteOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.credentials.delete({ where: { id } });
    });
}
exports.deleteOne = deleteOne;
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield database_1.default.credentials.findUnique({
            where: { id },
            select: {
                id: true,
                url: true,
                username: true,
                password: true,
                label: true,
                userId: true,
                createdAt: true,
            },
        });
        return credential;
    });
}
exports.findById = findById;
function findByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = yield database_1.default.credentials.findMany({
            where: { userId },
            select: {
                id: true,
                url: true,
                username: true,
                password: true,
                label: true,
                userId: true,
                createdAt: true,
            },
        });
        return credentials;
    });
}
exports.findByUserId = findByUserId;
function findByTitleAndUserId(userId, label) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield database_1.default.credentials.findFirst({
            where: {
                AND: [{ label }, { userId }],
            },
        });
        return credential;
    });
}
exports.findByTitleAndUserId = findByTitleAndUserId;
