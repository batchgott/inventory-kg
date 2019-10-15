import { Router } from "express";
import { Document } from "mongoose";
import BaseRepository from "../../src/repositories/BaseReposetory";
import express from "express";

export default abstract class ARoutes<T extends BaseRepository<Document>> {

    public router: Router;
    protected repository: T;

    protected constructor() {
        this.router=express.Router();
        this.routes();
    }

    protected abstract routes(): void;
}
