const io = require("socket.io")(5001, {
    cors: {
        origin: "*",
    },
});

const users = {}; // 유저를 저장할 객체
const rooms = {}; // 방별 메시지를 저장할 객체

io.on("connection", (socket) => {
    console.log("client is connected", socket.id);

    socket.on("login", (userName, callback) => {
        if (!userName) {
            return callback({ ok: false, message: "Username is required" });
        }
        const user = { id: socket.id, name: userName, lastMessages: {} };
        users[socket.id] = user;
        io.emit("updateUserList", Object.values(users));
        return callback({ ok: true, user });
    });

    socket.on("sendMessage", (message, callback) => {
        const { to, chat, user, room } = message;
        if (!to || !chat || !user || !room) {
            return callback({ ok: false, message: "Invalid message format" });
        }
        const recipientSocketId = Object.values(users).find(u => u.name === to)?.id;
        if (recipientSocketId) {
            if (!rooms[room]) {
                rooms[room] = [];
            }
            rooms[room].push(message);

            users[recipientSocketId].lastMessages[room] = chat;
            users[socket.id].lastMessages[room] = chat;

            io.emit("updateUserList", Object.values(users));
            io.to(recipientSocketId).emit("message", message);
            return callback({ ok: true });
        }
        return callback({ ok: false, message: "Recipient not found" });
    });

    socket.on("disconnect", () => {
        delete users[socket.id];
        io.emit("updateUserList", Object.values(users));
        console.log("user is disconnected");
    });
});