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
        minlength: 6,
    },
    role: {
        type: Number,
        min: 0,
        max: 1,
        default: 0,
        validate: [(c) => c === 0 || c === 1, "not an integer/enum"],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("users", UserSchema);
//# sourceMappingURL=User.js.map