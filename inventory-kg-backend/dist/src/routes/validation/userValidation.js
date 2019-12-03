"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.registerValidation = (user) => {
    const schema = {
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        password: joi_1.default.string().min(6).required(),
    };
    return joi_1.default.validate(user, schema);
};
exports.loginValidation = (user) => {
    const schema = {
        username: joi_1.default.string().required(),
        password: joi_1.default.string().min(6).required(),
    };
    return joi_1.default.validate(user, schema);
};
exports.updateUserSelfValidation = (user) => {
    const schema = {
        username: joi_1.default.string().required(),
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
    };
    return joi_1.default.validate(user, schema);
};
//# sourceMappingURL=userValidation.js.map