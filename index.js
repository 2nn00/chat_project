const { createServer } = require("http");
const app = require("./app");
const { server } = require("socket.io");
require("dotenv").config();

const httpServer = createServer(app);
// httpServer위에 웹소켓 올림
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
})

//함수로 리턴했기 때문에 매개변수로 io를 넣어주어 전달
require("./utils/io")(io);

httpServer.listen(process.env.PORT, () => {
    console.log("server listening on port", process.env.PORT);
})