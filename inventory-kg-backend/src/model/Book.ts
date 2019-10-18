import mongoose, { Document, Schema } from "mongoose";
import Group, { IGroup } from "../../src/model/Group";

const BookSchema: Schema = new Schema({
    isbn: {
        type: String,
        default: null,
        unique: true,
        sparse: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    group: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:"groups"
    },
});

export interface IBook extends Document {
    isbn?: string;
    title: string;
    author?: string;
    date: Date;
    group: IGroup["_id"];
}

export default mongoose.model<IBook>("books", BookSchema);
