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
Object.defineProperty(exports, "__esModule", { value: true });
const Toy_1 = __importDefault(require("../model/Toy"));
const ToyRepository_1 = __importDefault(require("../repositories/ToyRepository"));
const VerifyRoutes_1 = require("../utils/VerifyRoutes");
const ARoutes_1 = __importDefault(require("./ARoutes"));
const toyValidation_1 = require("./validation/toyValidation");
class ToyRoutes extends ARoutes_1.default {
    constructor() {
        super();
        this.repository = ToyRepository_1.default;
    }
    routes() {
        // GetAll
        this.router.get("/", VerifyRoutes_1.authUser, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.json(yield this.repository.find()); }));
        // GetOne
        this.router.get("/:toyId", VerifyRoutes_1.authUser, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.json(yield this.repository.findOne(req.params.toyId)); }));
        // Create
        this.router.post("/", VerifyRoutes_1.authGroupMemberOrAdmin_Toy, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { error } = toyValidation_1.createToyValidation(req.body);
            if (error) {
                res.status(400).send(error.details[0].message);
            }
            const toy = new Toy_1.default({
                name: req.body.name,
                producer: req.body.producer,
                group: req.body.group,
            });
            res.json(yield this.repository.create(toy));
        }));
        // Update
        this.router.put("/:toyId", VerifyRoutes_1.authGroupMemberOrAdmin_Toy, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { error } = toyValidation_1.updateToyValidation(req.body);
            if (error) {
                res.status(400).send(error.details[0].message);
            }
            const toy = yield this.repository.findOne(req.params.toyId);
            if (!toy) {
                res.status(400).send("No Toy with that ID");
            }
            toy.name = req.body.name;
            toy.producer = req.body.producer;
            res.json(yield this.repository.update(toy));
        }));
        // Delete
        this.router.delete("/:toyId", VerifyRoutes_1.authGroupMemberOrAdmin_Toy, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.json(yield this.repository.delete(req.params.toyId)); }));
    }
}
exports.default = new ToyRoutes().router;
//# sourceMappingURL=ToyRoutes.js.map