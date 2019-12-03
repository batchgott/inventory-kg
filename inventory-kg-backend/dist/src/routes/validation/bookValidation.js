"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.createBookValidation = (book) => {
    const schema = {
        isbn: joi_1.default.string().optional(),
        title: joi_1.default.string().required(),
        author: joi_1.default.string().optional(),
        group: joi_1.default.string().required(),
    };
    return joi_1.default.validate(book, schema);
};
exports.updateBookValidation = (book) => {
    const schema = {
        isbn: joi_1.default.string().optional(),
        title: joi_1.default.string().required(),
        author: joi_1.default.string().optional(),
    };
    return joi_1.default.validate(book, schema);
};
//# sourceMappingURL=bookValidation.js.map