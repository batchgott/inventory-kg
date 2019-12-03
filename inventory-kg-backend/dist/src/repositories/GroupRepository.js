"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseReposetory_1 = __importDefault(require("./BaseReposetory"));
class GroupRepository extends BaseReposetory_1.default {
    static get Instance() {
        return this._groupRepository || (this._groupRepository = new this());
    }
    constructor() {
        super("groups");
    }
}
exports.default = GroupRepository.Instance;
//# sourceMappingURL=GroupRepository.js.map