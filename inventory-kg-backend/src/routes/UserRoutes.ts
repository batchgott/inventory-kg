import { string } from "@hapi/joi";
import bcrypt from "bcryptjs";
import express, { Router } from "express";
import jwt from "jsonwebtoken";
import User, { ERole, IUser } from "../../src/model/User";
import UserRepository from "../../src/repositories/UserRepository";
import * as config from "../../src/utils/config";
import { authSelfOrAdmin } from "../../src/utils/VerifyRoutes";
import ARoutes from "./ARoutes";
import { loginValidation, registerValidation, updateUserSelfValidation } from "./validation/userValidation";

class UserRoutes extends ARoutes<typeof UserRepository> {

    constructor() {
        super();
        // this.router = express.Router();
        this.repository = UserRepository;
    }

    protected routes(): void {

        // GetAll
        this.router.get("/", async (req, res) => {
            res.json(await this.repository.find());
        });

        // GetOne
        this.router.get("/:userId", async (req, res) => res.json(await this.repository.findOne(req.params.userId)));

        // Create / register
        this.router.post(["/", "/register"], async (req, res) => {
            const {error} = registerValidation(req.body);
            if (error) { return res.status(400).send(error.details[0].message); }
            const user: IUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: (String)(req.body.firstName).toLowerCase() + "." + (String)(req.body.lastName).toLowerCase(),
                password: req.body.password,
                role: ERole.USER,
            });
            let usernameExists = await User.findOne({username: user.username});
            let count: number = 2;
            let newUserName: string = user.username;
            while (usernameExists) {
                newUserName = user.username + count.toString();
                count++;
                usernameExists = await User.findOne({username: newUserName});
            }
            user.username = newUserName;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;

            res.json(await this.repository.create(user));
        });

        // Login
        this.router.post("/login", async (req, res) => {
            const {error} = loginValidation(req.body);
            if (error) { return res.status(400).send(error.details[0].message); }

            const user: IUser = await User.findOne({username: req.body.username});
            if (!user) {return res.status(400).send("Username does not exist"); }

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {return res.status(400).send("Invalid password"); }

            const token = jwt.sign({_id: user._id}, config.TOKEN_SECRET);
            res.header("auth-token", token).send(token);
        });

        // Delete
        this.router.delete("/:userId", authSelfOrAdmin, async (req, res) => {
            res.json(await this.repository.delete(req.params.userId));
        });

        // Update
        // TODO: Check if username exists
        this.router.put("/:userId", authSelfOrAdmin, async (req, res) => {
            const {error} = updateUserSelfValidation(req.body);
            if (error) { return res.status(400).send(error.details[0].message); }
            const user: IUser = await User.findById(req.params.userId);
            user.username = req.body.username;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            res.json(await this.repository.update(user));
        });

        // TODO: Create route for updating password
        // TODO: Create update route for administrator
    }
}

export default new UserRoutes().router;
