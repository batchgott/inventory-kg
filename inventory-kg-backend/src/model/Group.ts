import mongoose, { Document, Schema } from "mongoose";
import Book, { IBook } from "./Book";
import Toy, { IToy } from "./Toy";
import User, { IUser } from "./User";
import { type } from "os";

const GroupSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    color: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 7,
        validate: [(c) => c.indexOf("#") === 0, "not a valid hex color"],
    },
    users: [{
            ref:"users",
            type:Schema.Types.ObjectId
        }],
    date: {
        type: Date,
        default: Date.now,
    },
});

export interface IGroup extends Document {
    name: string;
    color: string;
    users: Array<IUser["_id"]>;
    books: Array<IBook["_id"]>;
    toys: Array<IToy["_id"]>;
    date: Date;
}

export default mongoose.model<IGroup>("groups", GroupSchema);
