import { IGroup } from "../model/Group";
import Group from "../model/Group";
import BookRepository from "../repositories/BookRepository";
import GroupRepository from "../repositories/GroupRepository";
import { authAdmin } from "../utils/VerifyRoutes";
import ARoutes from "./ARoutes";
import { createGroupValidation, updateGroupValidation } from "./validation/groupValidation";

class GroupRoutes extends ARoutes<typeof GroupRepository> {

    constructor() {
        super();
        this.repository = GroupRepository;
    }
       protected routes(): void {
        // GetAll
        this.router.get("/", async (req, res) => res.json(await this.repository.find()));

        // GetOne
        this.router.get("/:groupId", async (req, res) => res.json(await this.repository.findOne(req.params.groupId)));

        this.router.get("/:groupId/books", async (req, res) => res.json(await BookRepository.getBooksByGroup(req.params.groupId)));

        // Create
        this.router.post("/", authAdmin, async (req, res) => {
            const {error} = createGroupValidation(req.body);
            if (error) { return res.status(400).send(error.details[0].message); }
            const group: IGroup = new Group({
                name: req.body.name,
                color: req.body.color,
            });
            res.json( await this.repository.create(group));
        });

        // Update
        this.router.put("/:groupId", authAdmin, async (req, res) => {
            const {error} = updateGroupValidation(req.body);
            if (error) { return res.status(400).send(error.details[0].message); }
            const group: IGroup = await this.repository.findOne(req.params.groupId);
            group.users = req.body.users;
            group.color = req.body.color;
            group.name = req.body.name;
            res.json(await this.repository.update(group));
        });

        // Delete
        this.router.delete("/:groupId", authAdmin, async (req, res) => res.json(await this.repository.delete(req.params.groupId)));
    }
}

export default new GroupRoutes().router;
