import { ObjectId } from "bson";
import { IBook } from "../model/Book";
import BaseRepository from "./BaseReposetory";

class BookRepository extends BaseRepository<IBook> {

    private static _bookRepository: BookRepository;
    public static get Instance(): BookRepository {
        return this._bookRepository || (this._bookRepository = new BookRepository());
    }
    private constructor() {
        super("books");
    }
    public async unsetIsbn(book: IBook) {
        try {
            return await this._collection.update({_id: book._id}, {$unset: {isbn: 1}});
        } catch (error) {
            return {message: error};
        }
    }

    public async getBooksByGroup(groupId: string) {
        try {
            return (await this._collection.find({group: new ObjectId(groupId)})).toArray();
        } catch (error) {
            return {message: error};
        }
    }
}

export default BookRepository.Instance;
