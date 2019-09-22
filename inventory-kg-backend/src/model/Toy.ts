import mongoose,{ Schema,Document } from "mongoose";
import Group, { IGroup } from "./Group";


const ToySchema:Schema=new Schema({
    name:{
        type:String,
        required:true
    },
    producer:{
        type:String,
        required:false
    },
    date:{
        type:Date,
        default:Date.now
    },
    group:{
        type:Group,
        required:true
    }
});

export interface IToy extends Document{
    name:string;
    producer?:string;
    date:Date;
    group:IGroup["_id"];
}

export default mongoose.model<IToy>("Toys",ToySchema);