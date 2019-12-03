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
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "groups",
    },
});
exports.default = mongoose_1.default.model("toys", ToySchema);
//# sourceMappingURL=Toy.js.map