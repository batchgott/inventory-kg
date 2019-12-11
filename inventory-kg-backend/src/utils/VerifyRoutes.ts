import jwt from "jsonwebtoken";
import { Document } from "mongoose";
import User, {ERole, IUser} from "../../src/model/User";
import { IBook } from "../model/Book";
import { IGroup } from "../model/Group";
import { IToy } from "../model/Toy";
import BaseRepository from "../repositories/BaseReposetory";
import BookRepository from "../repositories/BookRepository";
import GroupRepository from "../repositories/GroupRepository";
import ToyRepository from "../repositories/ToyRepository";
import UserRepository from "../repositories/UserRepository";
import *as config from "../utils/config";

class VerifyRoutes {

    constructor() {  }

    public async authSelfOrAdmin(req, res, next) {
        const token = req.header("auth-token");
        if (!token) {return res.status(401).send("Access Denied"); }

        try {
            const decodedToken = jwt.verify(token, config.TOKEN_SECRET);
            const user: IUser = await UserRepository.findOne((decodedToken as any)._id);
            if (user._id != req.params.userId && user.role != ERole.ADMIN) {
            return res.status(400).send("No permission for this user");
            }
            next();
        } catch (error) {
            res.status(400).send("Invalid Token");
        }
    }

    public async authUser(req,res,next){
        const token = req.header("auth-token");
        if (!token) {return res.status(401).send("Access Denied"); }
        try {
            const decodedToken = jwt.verify(token, config.TOKEN_SECRET);
            const user: IUser = await UserRepository.findOne((decodedToken as any)._id);
            if (!user) {
            return res.status(400).send("You need to be a User to see this route");
            }
            next();
        } catch (error) {
            res.status(400).send("Invalid Token");
        }
    }

    public async authAdmin(req, res, next) {
        const token = req.header("auth-token");
        if (!token) {return res.status(401).send("Access Denied"); }

        try {
            const decodedToken = jwt.verify(token, config.TOKEN_SECRET);
            const user: IUser = await UserRepository.findOne((decodedToken as any)._id);
            if (user.role != ERole.ADMIN) {
            return res.status(400).send("Only admins are allowed for this route");
            }
            next();
        } catch (error) {
            res.status(400).send("Invalid Token");
        }
    }

    public async authGroupMemberOrAdmin_Book(req, res, next) {
        const token = req.header("auth-token");
        if (!token) {return res.status(401).send("Access Denied"); }
        try {
            const decodedToken = jwt.verify(token, config.TOKEN_SECRET);
            const user: IUser = await UserRepository.findOne((decodedToken as any)._id);
            let group: IGroup;
            let book: IBook;
            if (req.body.group) {
                group = await GroupRepository.findOne(req.body.group);
            } else {
                book = await BookRepository.findOne(req.params.bookId);
                group = await GroupRepository.findOne(book.group);
            }
            let isGroupMember: boolean = false;
            for (const u of group.users) {
                if (user._id == u) {
                    isGroupMember = true;
                    break;
                }
            }
            if (user.role != ERole.ADMIN && !isGroupMember) {
                return res.status(400).send("Only admins or group members are allowed for this route");
            }
            next();
        } catch (error) {
            res.status(400).send("Invalid Token");
        }
    }

    public async authGroupMemberOrAdmin_Toy(req, res, next) {
        const token = req.header("auth-token");
        if (!token) {return res.status(401).send("Access Denied"); }
        try {
            const decodedToken = jwt.verify(token, config.TOKEN_SECRET);
            const user: IUser = await UserRepository.findOne((decodedToken as any)._id);
            let group: IGroup;
            let toy: IToy;
            if (req.body.group) {
                group = await GroupRepository.findOne(req.body.group);
            } else {
                toy = await ToyRepository.findOne(req.params.toyId);
                group = await GroupRepository.findOne(toy.group);
            }
            let isGroupMember: boolean = false;
            for (const u of group.users) {
                if (user._id == u) {
                    isGroupMember = true;
                    break;
                }
            }
            if (user.role != ERole.ADMIN && !isGroupMember) {
                return res.status(400).send("Only admins or group members are allowed for this route");
            }
            next();
        } catch (error) {
            res.status(400).send("Invalid Token");
        }
    }

}

export const authSelfOrAdmin = new VerifyRoutes().authSelfOrAdmin;
export const authAdmin = new VerifyRoutes().authAdmin;
export const authGroupMemberOrAdmin_Book = new VerifyRoutes().authGroupMemberOrAdmin_Book;
export const authGroupMemberOrAdmin_Toy = new VerifyRoutes().authGroupMemberOrAdmin_Toy;
export const authUser=new VerifyRoutes().authUser;
