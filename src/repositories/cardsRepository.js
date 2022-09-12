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
function insert(newCard, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.cards.create({ data: Object.assign(Object.assign({}, newCard), { userId }) });
    });
}
exports.insert = insert;
function deleteOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.default.cards.delete({ where: { id } });
    });
}
exports.deleteOne = deleteOne;
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield database_1.default.cards.findUnique({
            where: { id },
            select: {
                id: true,
                number: true,
                cardholderName: true,
                cvv: true,
                expiration: true,
                password: true,
                isVirtual: true,
                type: true,
                label: true,
                userId: true,
                createdAt: true,
            },
        });
        return card;
    });
}
exports.findById = findById;
function findByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cards = yield database_1.default.cards.findMany({
            where: { userId },
            select: {
                id: true,
                number: true,
                cardholderName: true,
                cvv: true,
                expiration: true,
                password: true,
                isVirtual: true,
                type: true,
                label: true,
                userId: true,
                createdAt: true,
            },
        });
        return cards;
    });
}
exports.findByUserId = findByUserId;
function findByTitleAndUserId(userId, label) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield database_1.default.cards.findFirst({
            where: {
                AND: [{ label }, { userId }],
            },
        });
        return card;
    });
}
exports.findByTitleAndUserId = findByTitleAndUserId;
