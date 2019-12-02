import Joi from "@hapi/joi";
import { IUser } from "../../model/User";

export const registerValidation = (user: IUser) => {
    const schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().min(6).required(),
    };
    return Joi.validate(user, schema);
};

export const loginValidation = (user: IUser) => {
    const schema = {
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
    };
    return Joi.validate(user, schema);
};

export const updateUserSelfValidation = (user: IUser) => {
    const schema = {
        username: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
    };
    return Joi.validate(user, schema);
};
