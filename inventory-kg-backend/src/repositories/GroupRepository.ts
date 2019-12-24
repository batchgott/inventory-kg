import { IBook } from "../model/Book";
import { IGroup } from "../model/Group";
import BaseRepository from "./BaseReposetory";
import { ObjectId } from "bson";

class GroupRepository extends BaseRepository<IGroup> {

    private static _groupRepository: GroupRepository;
    public static get Instance(): GroupRepository {
        return this._groupRepository || (this._groupRepository = new this());
    }
    private constructor() {
        super("groups");
    }

    public async getGroupsByUser(userId:string){
        try {
            return await (await this._collection.find({users: userId})).toArray();
        } catch (error) {
            return {message:error}
        }
    }

}

export default GroupRepository.Instance;
