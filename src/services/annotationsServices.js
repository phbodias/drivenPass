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
exports.deleteAnnotation = exports.annotationById = exports.userAnnotations = exports.createAnnotation = void 0;
const annotationsRepository = __importStar(require("../repositories/annotationsRepository"));
function verifyAnnotationLabelAvailable(userId, label) {
    return __awaiter(this, void 0, void 0, function* () {
        const notAvailable = yield annotationsRepository.findByTitleAndUserId(userId, label);
        if (notAvailable)
            return false;
        return true;
    });
}
function createAnnotation(annotationData, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const labelIsAvailable = yield verifyAnnotationLabelAvailable(userId, annotationData.label);
        if (!labelIsAvailable)
            throw { code: "Conflict", message: "Label already in use" };
        yield annotationsRepository.insert(annotationData, userId);
    });
}
exports.createAnnotation = createAnnotation;
function userAnnotations(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const annotations = yield annotationsRepository.findByUserId(userId);
        return annotations;
    });
}
exports.userAnnotations = userAnnotations;
function annotationById(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const annotation = yield annotationsRepository.findById(id);
        if (!annotation)
            throw { code: "NotFound", message: "annotation does not exist" };
        const ownerId = annotation.userId;
        if (userId !== ownerId)
            throw { code: "Unauthorized", message: "Unauthorized" };
        return annotation;
    });
}
exports.annotationById = annotationById;
function deleteAnnotation(id, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const credential = yield annotationById(id, userId);
        yield annotationsRepository.deleteOne(id);
    });
}
exports.deleteAnnotation = deleteAnnotation;
