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
const Group_1 = __importDefault(require("./Group"));
const ToySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    producer: {
        type: String,
        required: false,
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
exports.default = mongoose_1.default.model("Toys", ToySchema);
//# sourceMappingURL=Toy.js.map