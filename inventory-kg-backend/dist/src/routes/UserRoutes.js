"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_1 = __importDefault(require("express"));
const User_1 = __importStar(require("../../src/model/User"));
const UserRepository_1 = __importDefault(require("../../src/repositories/UserRepository"));
const validation_1 = require("../../src/utils/validation");
const ARoutes_1 = __importDefault(require("./ARoutes"));
class UserRoutes extends ARoutes_1.default {
    constructor() {
        super();
        this.router === express_1.default.Router();
        this.routes();
    }
    routes() {
        this.router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json(UserRepository_1.default.find());
        }));
        this.router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.default({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.firstName + "." + req.body.lastName,
                password: req.body.password,
                role: User_1.ERole.USER,
            });
            const { error } = validation_1.registerValidation(user);
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
            let usernameExists = yield User_1.default.findOne({ username: user.username });
            let count = 1;
            while (usernameExists) {
                user.username = user.username + count.toString();
                count++;
                usernameExists = yield User_1.default.findOne({ username: user.username });
            }
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(user.password, salt);
            user.password = hashedPassword;
            res.json(UserRepository_1.default.create(user));
        }));
    }
}
exports.default = new UserRoutes().router;
//# sourceMappingURL=UserRoutes.js.map