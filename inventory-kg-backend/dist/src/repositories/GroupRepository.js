"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseReposetory_1 = __importDefault(require("./BaseReposetory"));
class GroupRepository extends BaseReposetory_1.default {
    constructor() {
        super("groups");
    }
    static get Instance() {
        return this._groupRepository || (this._groupRepository = new this());
    }
    getGroupsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (yield this._collection.find({ users: userId })).toArray();
            }
            catch (error) {
                return { message: error };
            }
        });
    }
}
exports.default = GroupRepository.Instance;
//# sourceMappingURL=GroupRepository.js.map