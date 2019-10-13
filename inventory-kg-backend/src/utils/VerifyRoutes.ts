import jwt from "jsonwebtoken";
import *as config from "../utils/config";
import User,{IUser, ERole} from "../../src/model/User";

class VerifyRoutes {
    constructor() {  }

    public async authSelfOrAdmin(req,res,next){
        const token=req.header("auth-token");
        if(!token)return res.status(401).send("Access Denied");

        try {
            const decodedToken=jwt.verify(token,config.TOKEN_SECRET);
            const user:IUser=await User.findOne({_id:decodedToken["_id"]});
            if(user._id!=req.params.userId&&user.role!=ERole.ADMIN)
            return res.status(400).send("No permission for this user")
            next();
        } catch (error) {
            res.status(400).send("Invalid Token")
        }
    }

}

export const authSelfOrAdmin= new VerifyRoutes().authSelfOrAdmin;