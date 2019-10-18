import BaseRepository from "./BaseReposetory";
import { IToy } from "../model/Toy";



class ToyRepository extends BaseRepository<IToy> {

    private static _toyRepository:ToyRepository;
    public static get Instance():ToyRepository{
        return this._toyRepository||(this._toyRepository=new this());
    }
    private constructor(){
        super("toys");
    }
}

export default ToyRepository.Instance;