import { IUser } from "../../src/model/User";
import BaseRepository from "./BaseReposetory";
import { ObjectId } from "bson";

class UserRepository extends BaseRepository<IUser> {

    private static _userRepository: UserRepository;
    public static get Instance(): UserRepository {
        return this._userRepository || (this._userRepository = new this());
    }

    private constructor() {
        super("users");
    }
    
    public async usernameIsTaken(username:string):Promise<boolean>{
        try {
            const user=await this._collection.find({"username": username}).toArray();
            if (user.length>0)
                return true;
            return false;
        } catch (error) {
            return false;
        }
    }

}

export default UserRepository.Instance;
