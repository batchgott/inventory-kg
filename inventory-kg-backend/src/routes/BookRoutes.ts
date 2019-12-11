import { IBook } from "../model/Book";
import Book from "../model/Book";
import BookRepository from "../repositories/BookRepository";
import { authGroupMemberOrAdmin_Book,authUser } from "../utils/VerifyRoutes";
import ARoutes from "./ARoutes";
import { createBookValidation, updateBookValidation } from "./validation/bookValidation";

class BookRoutes extends ARoutes<typeof BookRepository> {

    constructor() {
        super();
        this.repository = BookRepository;
    }

    protected routes(): void {
        // GetAll
        this.router.get("/",authUser, async (req, res) => res.json(await this.repository.find()));

        // GetOne
        this.router.get("/:bookId",authUser, async (req, res) => res.json(await this.repository.findOne(req.params.bookId)));

        // Create
        this.router.post("/", authGroupMemberOrAdmin_Book, async (req, res) => {
            const {error} = createBookValidation(req.body);
            if (error) { return res.status(400).send(error.details[0].message); }
            const book: IBook = new Book({
                title: req.body.title,
                author: req.body.author,
                isbn: req.body.isbn,
                group: req.body.group,
            });
            res.json(await this.repository.create(book));
        });

        // Update
        this.router.put("/:bookId", authGroupMemberOrAdmin_Book, async (req, res) => {
            const {error} = updateBookValidation(req.body);
            if (error) {return res.status(400).send(error.details[0].message); }
            const book: IBook = await this.repository.findOne(req.params.bookId);
            if (!book) {return res.status(400).send({message: "Book not found"}); }
            if (req.body.isbn) {
            book.isbn = req.body.isbn;
            } else {
            delete book.isbn;
            await this.repository.unsetIsbn(book);
            }
            book.author = req.body.author;
            book.title = req.body.title;
            res.json(await this.repository.update(book));
        });

        // Delete
        this.router.delete("/:bookId", authGroupMemberOrAdmin_Book, async (req, res) => res.json(await this.repository.delete(req.params.bookId)));
    }
}

export default new BookRoutes().router;
