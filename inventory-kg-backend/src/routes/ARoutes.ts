import { Router } from "express";
import { Document } from "mongoose";
import BaseRepository from "../../src/repositories/BaseReposetory";
import express from "express";

export default abstract class ARoutes {

    public router: Router;
    protected repository: BaseRepository<Document>;

    protected constructor() {
        this.router=express.Router();
        this.routes();
    }

    protected abstract routes(): void;
}
