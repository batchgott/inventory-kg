"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bson_1 = require("bson");
const BaseReposetory_1 = __importDefault(require("./BaseReposetory"));
class BookRepository extends BaseReposetory_1.default {
    static get Instance() {
        return this._bookRepository || (this._bookRepository = new BookRepository());
    }
    constructor() {
        super("books");
    }
    unsetIsbn(book) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._collection.update({ _id: book._id }, { $unset: { isbn: 1 } });
            }
            catch (error) {
                return { message: error };
            }
        });
    }
    getBooksByGroup(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this._collection.find({ group: new bson_1.ObjectId(groupId) })).toArray();
            }
            catch (error) {
                return { message: error };
            }
        });
    }
}
exports.default = BookRepository.Instance;
//# sourceMappingURL=BookRepository.js.map