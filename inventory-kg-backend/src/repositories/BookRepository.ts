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
    public async unsetIsbn(book:IBook){
        try {
            return await this._collection.update({_id:book._id},{$unset:{isbn:1}});
        } catch (error) {
            return {message:error}
        }
    }
}

export default BookRepository.Instance;