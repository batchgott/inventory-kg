"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const BookRoutes_1 = __importDefault(require("./routes/BookRoutes"));
const GroupRoutes_1 = __importDefault(require("./routes/GroupRoutes"));
const ToyRoutes_1 = __importDefault(require("./routes/ToyRoutes"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const config = __importStar(require("./utils/config"));
class App {
    constructor() {
        this.express = express_1.default();
        this.middleware();
        this.routes();
        this.connectDatabase();
    }
    middleware() {
        this.express.use(body_parser_1.default.json());
        this.express.use(body_parser_1.default.urlencoded({ extended: false }));
        this.express.use(cors_1.default());
    }
    routes() {
        const router = express_1.default.Router();
        router.use("/users", UserRoutes_1.default);
        router.use("/groups", GroupRoutes_1.default);
        router.use("/books", BookRoutes_1.default);
        router.use("/toys", ToyRoutes_1.default);
        this.express.use("/api", router);
    }
    connectDatabase() {
        mongoose_1.default.connect(config.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => err ?
            console.log(err) :
            console.log("Connected to DB"));
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map