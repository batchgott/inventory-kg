"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const Group_1 = __importDefault(require("../../src/model/Group"));
const BookSchema = new mongoose_1.Schema({
    isbn: {
        type: String,
        default: null,
        unique: true,
        sparse: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    group: {
        type: Group_1.default,
        required: true,
    },
});
exports.default = mongoose_1.default.model("Books", BookSchema);
//# sourceMappingURL=Book.js.map