"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseReposetory_1 = __importDefault(require("./BaseReposetory"));
class ToyRepository extends BaseReposetory_1.default {
    static get Instance() {
        return this._toyRepository || (this._toyRepository = new this());
    }
    constructor() {
        super("toys");
    }
}
exports.default = ToyRepository.Instance;
//# sourceMappingURL=ToyRepository.js.map