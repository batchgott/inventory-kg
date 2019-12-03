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
Object.defineProperty(exports, "__esModule", { value: true });
const Group_1 = __importDefault(require("../model/Group"));
const BookRepository_1 = __importDefault(require("../repositories/BookRepository"));
const GroupRepository_1 = __importDefault(require("../repositories/GroupRepository"));
const VerifyRoutes_1 = require("../utils/VerifyRoutes");
const ARoutes_1 = __importDefault(require("./ARoutes"));
const groupValidation_1 = require("./validation/groupValidation");
class GroupRoutes extends ARoutes_1.default {
    constructor() {
        super();
        this.repository = GroupRepository_1.default;
    }
    routes() {
        // GetAll
        this.router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () { return res.json(yield this.repository.find()); }));
        // GetOne
        this.router.get("/:groupId", (req, res) => __awaiter(this, void 0, void 0, function* () { return res.json(yield this.repository.findOne(req.params.groupId)); }));
        this.router.get("/:groupId/books", (req, res) => __awaiter(this, void 0, void 0, function* () { return res.json(yield BookRepository_1.default.getBooksByGroup(req.params.groupId)); }));
        // Create
        this.router.post("/", VerifyRoutes_1.authAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { error } = groupValidation_1.createGroupValidation(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
            const group = new Group_1.default({
                name: req.body.name,
                color: req.body.color,
            });
            res.json(yield this.repository.create(group));
        }));
        // Update
        this.router.put("/:groupId", VerifyRoutes_1.authAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { error } = groupValidation_1.updateGroupValidation(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
            const group = yield this.repository.findOne(req.params.groupId);
            group.users = req.body.users;
            group.color = req.body.color;
            group.name = req.body.name;
            res.json(yield this.repository.update(group));
        }));
        // Delete
        this.router.delete("/:groupId", VerifyRoutes_1.authAdmin, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.json(yield this.repository.delete(req.params.groupId)); }));
    }
}
exports.default = new GroupRoutes().router;
//# sourceMappingURL=GroupRoutes.js.map