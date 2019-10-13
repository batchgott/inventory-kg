import { IUser } from "../../src/model/User";
import BaseRepository from "./BaseReposetory";

class UserRepository extends BaseRepository<IUser> {

}
export default new UserRepository("users");
