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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deleteAnnotation = exports.annotationById = exports.userAnnotations = exports.createAnnotation = void 0;
var annotationsRepository = __importStar(require("../repositories/annotationsRepository"));
function verifyAnnotationLabelAvailable(userId, label) {
    return __awaiter(this, void 0, void 0, function () {
        var notAvailable;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, annotationsRepository.findByTitleAndUserId(userId, label)];
                case 1:
                    notAvailable = _a.sent();
                    if (notAvailable)
                        return [2 /*return*/, false];
                    return [2 /*return*/, true];
            }
        });
    });
}
function createAnnotation(annotationData, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var labelIsAvailable;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, verifyAnnotationLabelAvailable(userId, annotationData.label)];
                case 1:
                    labelIsAvailable = _a.sent();
                    if (!labelIsAvailable)
                        throw { code: "Conflict", message: "Label already in use" };
                    return [4 /*yield*/, annotationsRepository.insert(annotationData, userId)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createAnnotation = createAnnotation;
function userAnnotations(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var annotations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, annotationsRepository.findByUserId(userId)];
                case 1:
                    annotations = _a.sent();
                    return [2 /*return*/, annotations];
            }
        });
    });
}
exports.userAnnotations = userAnnotations;
function annotationById(id, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var annotation, ownerId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, annotationsRepository.findById(id)];
                case 1:
                    annotation = _a.sent();
                    if (!annotation)
                        throw { code: "NotFound", message: "annotation does not exist" };
                    ownerId = annotation.userId;
                    if (userId !== ownerId)
                        throw { code: "Unauthorized", message: "Unauthorized" };
                    return [2 /*return*/, annotation];
            }
        });
    });
}
exports.annotationById = annotationById;
function deleteAnnotation(id, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var credential;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, annotationById(id, userId)];
                case 1:
                    credential = _a.sent();
                    return [4 /*yield*/, annotationsRepository.deleteOne(id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteAnnotation = deleteAnnotation;
