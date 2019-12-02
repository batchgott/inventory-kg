import Joi from "@hapi/joi";
import { IToy } from "../../model/Toy";

export const createToyValidation = (toy: IToy) => {
    const schema = {
        name: Joi.string().required(),
        producer: Joi.string().optional(),
        group: Joi.string().required(),
    };
    return Joi.validate(toy, schema);
};

export const updateToyValidation = (toy: IToy) => {
    const schema = {
        name: Joi.string().required(),
        producer: Joi.string().optional(),
    };
    return Joi.validate(toy, schema);
};
