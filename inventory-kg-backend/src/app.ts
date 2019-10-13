import bodyParser from "body-parser";
import cors from "cors";
import express, { Router } from "express";
import mongoose from "mongoose";
import UserRoutes from "./routes/UserRoutes";
import * as config from "./utils/config";

class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.connectDatabase();
    }

    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(cors());
    }

    private routes(): void {
        const router: Router = express.Router();
        router.use("/users", UserRoutes);

        this.express.use("/api", router);
    }

    private connectDatabase(): void {
        mongoose.connect(config.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true},
            (err) => err ?
            console.log(err) :
            console.log("Connected to DB"));
    }
}

export default new App().express;
