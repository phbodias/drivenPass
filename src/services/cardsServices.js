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
exports.deletecard = exports.cardById = exports.userCards = exports.createCard = void 0;
const cardsRepository = __importStar(require("../repositories/cardsRepository"));
const passwordsFunctions_1 = require("../utils/passwordsFunctions");
function verifyCardLabelAvailable(userId, label) {
    return __awaiter(this, void 0, void 0, function* () {
        const notAvailable = yield cardsRepository.findByTitleAndUserId(userId, label);
        if (notAvailable)
            return false;
        return true;
    });
}
function createCard(cardData, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const labelIsAvailable = yield verifyCardLabelAvailable(userId, cardData.label);
        if (!labelIsAvailable)
            throw { code: "Conflict", message: "Label already in use" };
        cardData.password = (0, passwordsFunctions_1.encryptString)(cardData.password);
        cardData.cvv = (0, passwordsFunctions_1.encryptString)(cardData.cvv);
        yield cardsRepository.insert(cardData, userId);
    });
}
exports.createCard = createCard;
function userCards(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cards = yield cardsRepository.findByUserId(userId);
        return cards.map((card) => {
            card.password = (0, passwordsFunctions_1.decrypt)(card.password);
            card.cvv = (0, passwordsFunctions_1.decrypt)(card.cvv);
            return card;
        });
    });
}
exports.userCards = userCards;
function cardById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield cardsRepository.findById(id);
        if (!card)
            throw { code: "NotFound", message: "card does not exist" };
        const ownerId = card.userId;
        if (userId !== ownerId)
            throw { code: "Unauthorized", message: "Unauthorized" };
        card.password = (0, passwordsFunctions_1.decrypt)(card.password);
        card.cvv = (0, passwordsFunctions_1.decrypt)(card.cvv);
        return card;
    });
}
exports.cardById = cardById;
function deletecard(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const card = yield cardById(id, userId);
        yield cardsRepository.deleteOne(id);
    });
}
exports.deletecard = deletecard;
