import Joi from "@hapi/joi";
import Book, { IBook } from "../../model/Book";

export const createBookValidation = (book: IBook) => {
    const schema = {
        isbn: Joi.string().optional(),
        title: Joi.string().required(),
        author: Joi.string().optional(),
        group: Joi.string().required(),
    };
    return Joi.validate(book, schema);
};

export const updateBookValidation = (book: IBook) => {
    const schema = {
        isbn: Joi.string().optional(),
        title: Joi.string().required(),
        author: Joi.string().optional(),
    };
    return Joi.validate(book, schema);
};