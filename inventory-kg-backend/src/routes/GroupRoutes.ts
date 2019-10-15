import ARoutes from "./ARoutes";
import GroupRepository from "../repositories/GroupRepository";


class GroupRoutes extends ARoutes<typeof GroupRepository> {

    constructor() {
        super();
        this.repository=GroupRepository;
    } 
       protected routes(): void {
        //GetAll
        this.router.get("/",(req,res)=>res.json(this.repository.find()));

        //GetOne
        this.router.get("/groupId",(req,res)=>res.json(this.repository.findOne(req.params.groupId)));

        
    }
}

export default new GroupRoutes().router;