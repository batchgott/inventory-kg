import http from "http";
import App from "./src/app";

const port = 3070;
// App.listen(port);
App.set("port", port);
const server = http.createServer(App);
server.listen(port);

server.on("listening", () => {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`listening on ${bind}`);
});

module.exports = App;
