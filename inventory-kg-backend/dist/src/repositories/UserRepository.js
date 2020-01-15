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
class UserRepository extends BaseReposetory_1.default {
    constructor() {
        super("users");
    }
    static get Instance() {
        return this._userRepository || (this._userRepository = new this());
    }
    usernameIsTaken(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._collection.find({ "username": username }).toArray();
                if (user.length > 0)
                    return true;
                return false;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.default = UserRepository.Instance;
//# sourceMappingURL=UserRepository.js.map