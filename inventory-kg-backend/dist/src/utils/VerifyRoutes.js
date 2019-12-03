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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../src/model/User");
const BookRepository_1 = __importDefault(require("../repositories/BookRepository"));
const GroupRepository_1 = __importDefault(require("../repositories/GroupRepository"));
const ToyRepository_1 = __importDefault(require("../repositories/ToyRepository"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const config = __importStar(require("../utils/config"));
class VerifyRoutes {
    constructor() { }
    authSelfOrAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.header("auth-token");
            if (!token) {
                return res.status(401).send("Access Denied");
            }
            try {
                const decodedToken = jsonwebtoken_1.default.verify(token, config.TOKEN_SECRET);
                const user = yield UserRepository_1.default.findOne(decodedToken._id);
                if (user._id != req.params.userId && user.role != User_1.ERole.ADMIN) {
                    return res.status(400).send("No permission for this user");
                }
                next();
            }
            catch (error) {
                res.status(400).send("Invalid Token");
            }
        });
    }
    authAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.header("auth-token");
            if (!token) {
                return res.status(401).send("Access Denied");
            }
            try {
                const decodedToken = jsonwebtoken_1.default.verify(token, config.TOKEN_SECRET);
                const user = yield UserRepository_1.default.findOne(decodedToken._id);
                if (user.role != User_1.ERole.ADMIN) {
                    return res.status(400).send("Only admins are allowed for this route");
                }
                next();
            }
            catch (error) {
                res.status(400).send("Invalid Token");
            }
        });
    }
    authGroupMemberOrAdmin_Book(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.header("auth-token");
            if (!token) {
                return res.status(401).send("Access Denied");
            }
            try {
                const decodedToken = jsonwebtoken_1.default.verify(token, config.TOKEN_SECRET);
                const user = yield UserRepository_1.default.findOne(decodedToken._id);
                let group;
                let book;
                if (req.body.group) {
                    group = yield GroupRepository_1.default.findOne(req.body.group);
                }
                else {
                    book = yield BookRepository_1.default.findOne(req.params.bookId);
                    group = yield GroupRepository_1.default.findOne(book.group);
                }
                let isGroupMember = false;
                for (const u of group.users) {
                    if (user._id == u) {
                        isGroupMember = true;
                        break;
                    }
                }
                if (user.role != User_1.ERole.ADMIN && !isGroupMember) {
                    return res.status(400).send("Only admins or group members are allowed for this route");
                }
                next();
            }
            catch (error) {
                res.status(400).send("Invalid Token");
            }
        });
    }
    authGroupMemberOrAdmin_Toy(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.header("auth-token");
            if (!token) {
                return res.status(401).send("Access Denied");
            }
            try {
                const decodedToken = jsonwebtoken_1.default.verify(token, config.TOKEN_SECRET);
                const user = yield UserRepository_1.default.findOne(decodedToken._id);
                let group;
                let toy;
                if (req.body.group) {
                    group = yield GroupRepository_1.default.findOne(req.body.group);
                }
                else {
                    toy = yield ToyRepository_1.default.findOne(req.params.toyId);
                    group = yield GroupRepository_1.default.findOne(toy.group);
                }
                let isGroupMember = false;
                for (const u of group.users) {
                    if (user._id == u) {
                        isGroupMember = true;
                        break;
                    }
                }
                if (user.role != User_1.ERole.ADMIN && !isGroupMember) {
                    return res.status(400).send("Only admins or group members are allowed for this route");
                }
                next();
            }
            catch (error) {
                res.status(400).send("Invalid Token");
            }
        });
    }
}
exports.authSelfOrAdmin = new VerifyRoutes().authSelfOrAdmin;
exports.authAdmin = new VerifyRoutes().authAdmin;
exports.authGroupMemberOrAdmin_Book = new VerifyRoutes().authGroupMemberOrAdmin_Book;
exports.authGroupMemberOrAdmin_Toy = new VerifyRoutes().authGroupMemberOrAdmin_Toy;
//# sourceMappingURL=VerifyRoutes.js.map