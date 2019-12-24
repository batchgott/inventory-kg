"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseReposetory_1 = __importDefault(require("./BaseReposetory"));
class UserRepository extends BaseReposetory_1.default {
    constructor() {
        super("users");
    }
    static get Instance() {
        return this._userRepository || (this._userRepository = new this());
    }
}
exports.default = UserRepository.Instance;
//# sourceMappingURL=UserRepository.js.map