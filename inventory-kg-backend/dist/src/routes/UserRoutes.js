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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importStar(require("../../src/model/User"));
const UserRepository_1 = __importDefault(require("../../src/repositories/UserRepository"));
const config = __importStar(require("../../src/utils/config"));
const VerifyRoutes_1 = require("../../src/utils/VerifyRoutes");
const ARoutes_1 = __importDefault(require("./ARoutes"));
const userValidation_1 = require("./validation/userValidation");
const GroupRepository_1 = __importDefault(require("../repositories/GroupRepository"));
class UserRoutes extends ARoutes_1.default {
    constructor() {
        super();
        // this.router = express.Router();
        this.repository = UserRepository_1.default;
    }
    routes() {
        // GetAll
        this.router.get("/", VerifyRoutes_1.authAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json(yield this.repository.find());
        }));
        // GetOne
        this.router.get("/:userId", VerifyRoutes_1.authAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.json(yield this.repository.findOne(req.params.userId)); }));
        this.router.get("/:userId/groups", VerifyRoutes_1.authAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.json(yield GroupRepository_1.default.getGroupsByUser(req.params.userId)); }));
        // Create / register
        this.router.post(["/", "/register"], VerifyRoutes_1.authAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { error } = userValidation_1.registerValidation(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
            const user = new User_1.default({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: (String)(req.body.firstName).toLowerCase() + "." + (String)(req.body.lastName).toLowerCase(),
                password: req.body.password,
                role: User_1.ERole.USER,
            });
            let usernameExists = yield User_1.default.findOne({ username: user.username });
            let count = 2;
            let newUserName = user.username;
            while (usernameExists) {
                newUserName = user.username + count.toString();
                count++;
                usernameExists = yield User_1.default.findOne({ username: newUserName });
            }
            user.username = newUserName;
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(user.password, salt);
            user.password = hashedPassword;
            res.json(yield this.repository.create(user));
        }));
        // Login
        this.router.post("/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { error } = userValidation_1.loginValidation(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
            const user = yield User_1.default.findOne({ username: req.body.username });
            if (!user) {
                return res.status(400).send("Username does not exist");
            }
            const validPassword = yield bcryptjs_1.default.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(400).send("Invalid password");
            }
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, config.TOKEN_SECRET, { expiresIn: "1d" });
            res.header("auth-token", token).json({
                "_id": user._id,
                "username": user.username,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "password": user.password,
                "role": user.role,
                "date": user.date,
                "authToken": token,
                "expirationDate": new Date(new Date().getTime() + 86400000)
            });
        }));
        // Delete
        this.router.delete("/:userId", VerifyRoutes_1.authSelfOrAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json(yield this.repository.delete(req.params.userId));
        }));
        // Update
        this.router.put("/:userId", VerifyRoutes_1.authSelfOrAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { error } = userValidation_1.updateUserSelfValidation(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
            const user = yield User_1.default.findById(req.params.userId);
            if ((yield this.repository.usernameIsTaken(req.body.username)) && req.body.username != user.username)
                return res.status(404).json({ "error": "Username already taken" });
            user.username = req.body.username;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            res.json(yield this.repository.update(user));
        }));
        //Change Groups
        this.router.patch("/:userId/groups", VerifyRoutes_1.authAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.groups == null)
                return res.status(400).send({ error: "no groups" });
            try {
                yield GroupRepository_1.default.deleteUserFromGroups(req.params.userId);
                yield req.body.groups.forEach((g) => __awaiter(this, void 0, void 0, function* () {
                    let group = yield GroupRepository_1.default.findOne(g._id);
                    group.users.push(req.params.userId);
                    yield GroupRepository_1.default.update(group);
                }));
                res.status(200).send();
            }
            catch (error) {
                res.status(400).send({ "error": error });
            }
        }));
        // TODO: Create route for updating password
        // TODO: Create update route for administrator
    }
}
exports.default = new UserRoutes().router;
//# sourceMappingURL=UserRoutes.js.map