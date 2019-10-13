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
var ERole;
(function (ERole) {
    ERole[ERole["USER"] = 0] = "USER";
    ERole[ERole["ADMIN"] = 1] = "ADMIN";
})(ERole = exports.ERole || (exports.ERole = {}));
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    groups: [Group_1.default],
});
exports.default = mongoose_1.default.model("Users", UserSchema);
//# sourceMappingURL=User.js.map