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
const Book_1 = __importDefault(require("../model/Book"));
const BookRepository_1 = __importDefault(require("../repositories/BookRepository"));
const VerifyRoutes_1 = require("../utils/VerifyRoutes");
const ARoutes_1 = __importDefault(require("./ARoutes"));
const bookValidation_1 = require("./validation/bookValidation");
class BookRoutes extends ARoutes_1.default {
    constructor() {
        super();
        this.repository = BookRepository_1.default;
    }
    routes() {
        // GetAll
        this.router.get("/", VerifyRoutes_1.authUser, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.json(yield this.repository.find()); }));
        // GetOne
        this.router.get("/:bookId", VerifyRoutes_1.authUser, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.json(yield this.repository.findOne(req.params.bookId)); }));
        // Create
        this.router.post("/", VerifyRoutes_1.authGroupMemberOrAdmin_Book, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { error } = bookValidation_1.createBookValidation(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
            const book = new Book_1.default({
                title: req.body.title,
                author: req.body.author,
                isbn: req.body.isbn,
                group: req.body.group,
            });
            res.json(yield this.repository.create(book));
        }));
        // Update
        this.router.put("/:bookId", VerifyRoutes_1.authGroupMemberOrAdmin_Book, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { error } = bookValidation_1.updateBookValidation(req.body);
            if (error) {
                return res.status(400).send(error.details[0].message);
            }
            const book = yield this.repository.findOne(req.params.bookId);
            if (!book) {
                return res.status(400).send({ message: "Book not found" });
            }
            if (req.body.isbn) {
                book.isbn = req.body.isbn;
            }
            else {
                delete book.isbn;
                yield this.repository.unsetIsbn(book);
            }
            book.author = req.body.author;
            book.title = req.body.title;
            res.json(yield this.repository.update(book));
        }));
        // Delete
        this.router.delete("/:bookId", VerifyRoutes_1.authGroupMemberOrAdmin_Book, (req, res) => __awaiter(this, void 0, void 0, function* () { return res.json(yield this.repository.delete(req.params.bookId)); }));
    }
}
exports.default = new BookRoutes().router;
//# sourceMappingURL=BookRoutes.js.map