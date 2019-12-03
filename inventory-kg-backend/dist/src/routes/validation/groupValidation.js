"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.createGroupValidation = (group) => {
    const schema = {
        name: joi_1.default.string().required(),
        color: joi_1.default.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
    };
    return joi_1.default.validate(group, schema);
};
exports.updateGroupValidation = (group) => {
    const schema = {
        users: joi_1.default.array().required(),
        name: joi_1.default.string().required(),
        color: joi_1.default.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
    };
    return joi_1.default.validate(group, schema);
};
//# sourceMappingURL=groupValidation.js.map