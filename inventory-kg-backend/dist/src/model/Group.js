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
const Book_1 = __importDefault(require("./Book"));
const Toy_1 = __importDefault(require("./Toy"));
const User_1 = __importDefault(require("./User"));
const GroupSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    color: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 7,
        validate: [(c) => c.indexOf("#") === 0, "not a valid hex color"],
    },
    users: [User_1.default],
    books: [Book_1.default],
    toys: [Toy_1.default],
    date: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("Groups", GroupSchema);
//# sourceMappingURL=Group.js.map