import Joi from "@hapi/joi";
import Book, { IBook } from "../../model/Book";

export const createBookValidation = (book: IBook) => {
    const schema = {
        isbn: Joi.string().optional().allow("").allow(null),
        title: Joi.string().required(),
        author: Joi.string().optional().allow("").allow(null),
        group: Joi.string().required(),
    };
    return Joi.validate(book, schema);
};

export const updateBookValidation = (book: IBook) => {
    const schema = {
        isbn: Joi.string().optional().allow("").allow(null),
        title: Joi.string().required(),
        author: Joi.string().optional().allow("").allow(null),
    };
    return Joi.validate(book, schema);
};
