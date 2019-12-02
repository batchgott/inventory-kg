import mongoose, {Document, mongo, Schema} from "mongoose";
import Group, { IGroup } from "./Group";

export enum ERole {"USER", "ADMIN"}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export interface IUser extends Document {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    role: ERole;
    date: Date;
    groups: Array<IGroup["_id"]>;
}

export default mongoose.model<IUser>("users", UserSchema);
