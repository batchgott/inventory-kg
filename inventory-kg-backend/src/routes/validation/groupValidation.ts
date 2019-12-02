import Joi from "@hapi/joi";
import Group, { IGroup } from "../../model/Group";

export const createGroupValidation = (group: IGroup) => {
    const schema = {
        name: Joi.string().required(),
        color: Joi.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
    };
    return Joi.validate(group, schema);
};

export const updateGroupValidation = (group: IGroup) => {
    const schema = {
        users: Joi.array().required(),
        name: Joi.string().required(),
        color: Joi.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
    };
    return Joi.validate(group, schema);
};
