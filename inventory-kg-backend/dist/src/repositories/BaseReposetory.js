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
const mongoose_1 = __importDefault(require("mongoose"));
class BaseRepository {
    constructor(collectionName) {
        this._collection = mongoose_1.default.connection.collection(collectionName);
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._collection.insertOne(item);
            }
            catch (error) {
                return { message: error };
            }
        });
    }
    update(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._collection.updateOne({ _id: item._id }, { $set: item });
            }
            catch (error) {
                return { message: error };
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._collection.findOneAndDelete({ _id: new bson_1.ObjectId(id) });
            }
            catch (error) {
                return { message: error };
            }
        });
    }
    find(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!item) {
                    return yield this._collection.find().toArray();
                }
                return yield this._collection.find(item).toArray();
            }
            catch (error) {
                return { message: error };
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._collection.findOne({ _id: new bson_1.ObjectId(id) });
            }
            catch (error) {
                return { message: error };
            }
        });
    }
}
exports.default = BaseRepository;
//# sourceMappingURL=BaseReposetory.js.map