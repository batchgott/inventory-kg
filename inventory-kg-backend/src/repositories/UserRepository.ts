import { IUser } from "../../src/model/User";
import BaseRepository from "./BaseReposetory";

class UserRepository extends BaseRepository<IUser> {

    private static _userRepository: UserRepository;
    public static get Instance(): UserRepository {
        return this._userRepository || (this._userRepository = new this());
    }

    private constructor() {
        super("users");
    }
    

}

export default UserRepository.Instance;
