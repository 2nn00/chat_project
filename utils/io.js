const chatController = require("../Controller/chat.controller");
const userController = require("../Controller/user.controller")
const roomController = require("../Controller/room.controller");

//io에 관련된 모든 일을 함수
module.exports = function (io) {
    //말하는 함수: .emit
    //듣는 함수: .on
    io.on("connection", async (socket) => {
        // 연결된사람을 socket이라는 매개변수로 가져올 수 있음
        console.log("client is connected", socket.id);

        // 프론트에서 온 username 확인
        socket.on("login", async (userName, cb) => {
            console.log("backend", userName);

            try {
                // 유저정보를 저장하는 함수는 통신과 관련 없기 때문에 Contollers에 만듬
                const user = await userController.saveUser(userName, socket.id);
                // 접속한 사람들 확인
                const welcomeMessage = {
                    chat: `${user.name} is joined to this room`,
                    user: { id: null, name: "system" },
                };
                io.emit("message", welcomeMessage); // 이걸 해줘야 프론트단에서 보여짐
                //응답값 결정
                cb({ ok: true, data: user });

            } catch (error) {
                cb({ ok: false, error: error.message });
            }
        });

        socket.on("createRoom", async (roomName, cb) => {
            try {
                const newRoom = await roomController.createRoom(roomName);
                cb({ ok: true, data: newRoom });
            } catch (error) {
                cb({ ok: false, error: error.message });
            }
        });

        socket.on("joinRoom", async (roomId, cb) => {
            try {
                const user = await userController.checkUser(socket.id);
                const room = await roomController.addUserToRoom(roomId, user._id);
                socket.join(roomId);
                cb({ ok: true, data: room });
            } catch (error) {
                cb({ ok: false, error: error.message });
            }
        });

        socket.on("leaveRoom", async (roomId, cb) => {
            try {
                const user = await userController.checkUser(socket.id);
                const room = await roomController.removeUserFromRoom(roomId, user._id);
                socket.leave(roomId);
                cb({ ok: true, data: room });
            } catch (error) {
                cb({ ok: false, error: error.message });
            }
        });


        socket.on("sendMessage", async (message, cb) => {
            try {
                // socket.id로 유저 찾기
                const user = await userController.checkUser(socket.id);
                // 메시지 저장 (컨트롤러 따로 만듬)
                const newMessage = await chatController.saveChat(message, user);
                // cd({ ok: true, data: newMessage }); 이렇게 간단하게 넘길 수 없음 
                // 서버 접속한 두명이상의 클라이언트에게 모두 보여줘야하기 때문에 콜백 의미 없음
                io.emit("message", newMessage);
                cb({ ok: true });

            } catch (error) {
                cb({ ok: false, error: error.message });
            }
        });

        // 연결끊김 확인
        socket.on("disconnect", () => {
            console.log("user is disconnected");
        });
    });

};