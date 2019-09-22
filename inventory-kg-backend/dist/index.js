"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./src/app"));
const port = 3070;
// App.listen(port);
app_1.default.set("port", port);
const server = http_1.default.createServer(app_1.default);
server.listen(port);
server.on("listening", () => {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`listening on ${bind}`);
});
module.exports = app_1.default;
//# sourceMappingURL=index.js.map