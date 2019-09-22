import mongoose, {Schema,Document, mongo} from "mongoose";
import Group, { IGroup } from "./Group";

enum ERole{"USER","ADMIN"}

const UserSchema:Schema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"user",
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    groups:[Group]
});

export interface IUser extends Document{
    username:string;
    firstName:string;
    lastName:string;
    password:string;
    role:ERole;
    date:Date;
    groups:Array<IGroup["_id"]>;
}

export default mongoose.model<IUser>("Users",UserSchema);