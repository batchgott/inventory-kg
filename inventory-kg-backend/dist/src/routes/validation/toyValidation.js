"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.createToyValidation = (toy) => {
    const schema = {
        name: joi_1.default.string().required(),
        producer: joi_1.default.string().optional(),
        group: joi_1.default.string().required(),
    };
    return joi_1.default.validate(toy, schema);
};
exports.updateToyValidation = (toy) => {
    const schema = {
        name: joi_1.default.string().required(),
        producer: joi_1.default.string().optional(),
    };
    return joi_1.default.validate(toy, schema);
};
//# sourceMappingURL=toyValidation.js.map