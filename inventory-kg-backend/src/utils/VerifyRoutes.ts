import jwt from "jsonwebtoken";
import *as config from "../utils/config";
import User,{IUser, ERole} from "../../src/model/User";
import UserRepository from "../repositories/UserRepository";
import BaseRepository from "../repositories/BaseReposetory";
import GroupRepository from "../repositories/GroupRepository";
import BookRepository from "../repositories/BookRepository";
import ToyRepository from "../repositories/ToyRepository";
import { Document } from "mongoose";
import { IGroup } from "../model/Group";
import { IBook } from "../model/Book";
import { IToy } from "../model/Toy";

class VerifyRoutes {

    constructor() {  }

    public async authSelfOrAdmin(req,res,next){
        const token=req.header("auth-token");
        if(!token)return res.status(401).send("Access Denied");

        try {
            const decodedToken=jwt.verify(token,config.TOKEN_SECRET);
            const user:IUser=await UserRepository.findOne(decodedToken["_id"]);
            if(user._id!=req.params.userId&&user.role!=ERole.ADMIN)
            return res.status(400).send("No permission for this user")
            next();
        } catch (error) {
            res.status(400).send("Invalid Token")
        }
    }

    public async authAdmin(req,res,next){
        const token=req.header("auth-token");
        if(!token)return res.status(401).send("Access Denied");

        try {
            const decodedToken=jwt.verify(token,config.TOKEN_SECRET);
            const user:IUser=await UserRepository.findOne(decodedToken["_id"]);
            if(user.role!=ERole.ADMIN)
            return res.status(400).send("Only admins are allowed for this route");
            next();
        } catch (error) {
            res.status(400).send("Invalid Token");
        }
    }

    public async authGroupMemberOrAdmin_Book(req,res,next){
        const token=req.header("auth-token");
        if(!token)return res.status(401).send("Access Denied");
        try {
            const decodedToken=jwt.verify(token,config.TOKEN_SECRET);
            const user:IUser=await UserRepository.findOne(decodedToken["_id"]);
            let group:IGroup;
            let book:IBook;
            if(req.body.group)
                group=await GroupRepository.findOne(req.body.group);
            else{
                book=await BookRepository.findOne(req.params.bookId);
                group=await GroupRepository.findOne(book.group);
            }
            let isGroupMember:boolean=false;
            for(let u of group.users)
                if(user._id==u){
                    isGroupMember=true;
                    break;
                };
            if(user.role!=ERole.ADMIN&&!isGroupMember)
                return res.status(400).send("Only admins or group members are allowed for this route");
            next();
        } catch (error) {
            res.status(400).send("Invalid Token");
        }
    }

    public async authGroupMemberOrAdmin_Toy(req,res,next){
        const token=req.header("auth-token");
        if(!token)return res.status(401).send("Access Denied");
        try {
            const decodedToken=jwt.verify(token,config.TOKEN_SECRET);
            const user:IUser=await UserRepository.findOne(decodedToken["_id"]);
            let group:IGroup;
            let toy:IToy;
            if(req.body.group)
                group=await GroupRepository.findOne(req.body.group);
            else{
                toy=await ToyRepository.findOne(req.params.toyId);
                group=await GroupRepository.findOne(toy.group);
            }
            let isGroupMember:boolean=false;
            for(let u of group.users)
                if(user._id==u){
                    isGroupMember=true;
                    break;
                };
            if(user.role!=ERole.ADMIN&&!isGroupMember)
                return res.status(400).send("Only admins or group members are allowed for this route");
            next();
        } catch (error) {
            res.status(400).send("Invalid Token");
        }
    }

}

export const authSelfOrAdmin= new VerifyRoutes().authSelfOrAdmin;
export const authAdmin=new VerifyRoutes().authAdmin;
export const authGroupMemberOrAdmin_Book=new VerifyRoutes().authGroupMemberOrAdmin_Book;
export const authGroupMemberOrAdmin_Toy=new VerifyRoutes().authGroupMemberOrAdmin_Toy;