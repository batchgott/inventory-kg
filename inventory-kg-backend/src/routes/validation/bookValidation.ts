import { IBook } from "../../model/Book";
import Joi from "@hapi/joi";

export const createBookValidation=(book:IBook)=>{
    const schema={
        isbn:Joi.string().optional(),
        title:Joi.string().required(),
        author:Joi.string().optional(),
        group:Joi.string().required()
    }
    return Joi.validate(book,schema);
}