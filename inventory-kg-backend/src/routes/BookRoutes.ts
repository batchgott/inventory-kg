import ARoutes from "./ARoutes";
import BookRepository from "../repositories/BookRepository";


class BookRoutes extends ARoutes<typeof BookRepository>{

    constructor() {
        super();
        this.repository=BookRepository;
    }

    protected routes(): void {
        //GetAll
        this.router.get("/",async(req,res)=>res.json(await this.repository.find()));

        //GetOne
        this.router.get("/:bookId",async(req,res)=>res.json(await this.repository.findOne(req.params.bookId)));

        //Create
        this.router.post("/",async(req,res)=>{
            
        });
    }
}

export default new BookRoutes().router;