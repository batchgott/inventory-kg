import BaseRepository from "./BaseReposetory";
import { IBook } from "../model/Book";


class BookRepository extends BaseRepository<IBook> {

    private static _bookRepository:BookRepository;
    public static get Instance():BookRepository{
        return this._bookRepository||(this._bookRepository=new BookRepository());
    }
    private constructor() {
        super("books")
    }
}

export default BookRepository.Instance;