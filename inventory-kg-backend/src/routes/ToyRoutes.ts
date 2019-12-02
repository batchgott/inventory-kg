import Toy, { IToy } from "../model/Toy";
import ToyRepository from "../repositories/ToyRepository";
import { authGroupMemberOrAdmin_Toy } from "../utils/VerifyRoutes";
import ARoutes from "./ARoutes";
import { createToyValidation, updateToyValidation } from "./validation/toyValidation";

class ToyRoutes extends ARoutes<typeof ToyRepository> {

    constructor() {
        super();
        this.repository = ToyRepository;
    }
    protected routes(): void {
        // GetAll
        this.router.get("/", async (req, res) => res.json(await this.repository.find()));

        // GetOne
        this.router.get("/:toyId", async (req, res) => res.json(await this.repository.findOne(req.params.toyId)));

        // Create
        this.router.post("/", authGroupMemberOrAdmin_Toy, async (req, res) => {
            const {error} = createToyValidation(req.body);
            if (error) {res.status(400).send(error.details[0].message); }
            const toy: IToy = new Toy({
                name: req.body.name,
                producer: req.body.producer,
                group: req.body.group,
            });
            res.json(await this.repository.create(toy));
        });

        // Update
        this.router.put("/:toyId", authGroupMemberOrAdmin_Toy, async (req, res) => {
            const {error} = updateToyValidation(req.body);
            if (error) {res.status(400).send(error.details[0].message); }
            const toy: IToy = await this.repository.findOne(req.params.toyId);
            if (!toy) {res.status(400).send("No Toy with that ID"); }
            toy.name = req.body.name;
            toy.producer = req.body.producer;
            res.json(await this.repository.update(toy));
        });

        // Delete
        this.router.delete("/:toyId", authGroupMemberOrAdmin_Toy, async (req, res) =>
        res.json(await this.repository.delete(req.params.toyId)));
    }
}

export default new ToyRoutes().router;
