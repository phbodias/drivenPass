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
exports.deleteCredential = exports.credentialById = exports.userCredentials = exports.createCredential = void 0;
const credentialsRepository = __importStar(require("../repositories/credentialsRepository"));
const passwordsFunctions_1 = require("../utils/passwordsFunctions");
function verifyCredentialLabelAvailable(userId, label) {
    return __awaiter(this, void 0, void 0, function* () {
        const notAvailable = yield credentialsRepository.findByTitleAndUserId(userId, label);
        if (notAvailable)
            return false;
        return true;
    });
}
function createCredential(credentialData, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const labelIsAvailable = yield verifyCredentialLabelAvailable(userId, credentialData.label);
        if (!labelIsAvailable)
            throw { code: "Conflict", message: "Label already in use" };
        credentialData.password = (0, passwordsFunctions_1.encryptString)(credentialData.password);
        yield credentialsRepository.insert(credentialData, userId);
    });
}
exports.createCredential = createCredential;
function userCredentials(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = yield credentialsRepository.findByUserId(userId);
        return credentials.map((credential) => {
            credential.password = (0, passwordsFunctions_1.decrypt)(credential.password);
            return credential;
        });
    });
}
exports.userCredentials = userCredentials;
function credentialById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield credentialsRepository.findById(id);
        if (!credential)
            throw { code: "NotFound", message: "Credential does not exist" };
        const ownerId = credential.userId;
        if (userId !== ownerId)
            throw { code: "Unauthorized", message: "Unauthorized" };
        credential.password = (0, passwordsFunctions_1.decrypt)(credential.password);
        return credential;
    });
}
exports.credentialById = credentialById;
function deleteCredential(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield credentialById(id, userId);
        yield credentialsRepository.deleteOne(id);
    });
}
exports.deleteCredential = deleteCredential;
