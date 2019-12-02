import { IToy } from "../model/Toy";
import BaseRepository from "./BaseReposetory";

class ToyRepository extends BaseRepository<IToy> {

    private static _toyRepository: ToyRepository;
    public static get Instance(): ToyRepository {
        return this._toyRepository || (this._toyRepository = new this());
    }
    private constructor() {
        super("toys");
    }
}

export default ToyRepository.Instance;
