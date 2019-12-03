"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const BookSchema = new mongoose_1.Schema({
    isbn: {
        type: String,
        unique: true,
        index: true,
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
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "groups",
    },
});
exports.default = mongoose_1.default.model("books", BookSchema);
//# sourceMappingURL=Book.js.map