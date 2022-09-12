"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var annotationSchema = joi_1["default"].object({
    text: joi_1["default"].string().max(1000).required(),
    label: joi_1["default"].string().max(50).required()
});
exports["default"] = annotationSchema;
