import BaseRepository from "./BaseReposetory";
import { IGroup } from "../model/Group";



class GroupRepository extends BaseRepository<IGroup> {

    private static _groupRepository:GroupRepository;
    public static get Instance():GroupRepository{
        return this._groupRepository||(this._groupRepository=new this());
    }
    private constructor(){
        super("groups");
    }
}

export default GroupRepository.Instance;