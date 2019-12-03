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
        default: "#75736e",
        validate: [(c) => c.indexOf("#") === 0, "not a valid hex color"],
    },
    users: [{
            ref: "users",
            type: mongoose_1.Schema.Types.ObjectId,
        }],
    date: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("groups", GroupSchema);
//# sourceMappingURL=Group.js.map