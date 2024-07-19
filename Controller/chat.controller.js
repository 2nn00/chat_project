const Chat = require("../Models/chat");
const chatController = {};

chatController.saveChat = async (message, user) => {
    // 소켓정보로 유저 아이디를 알 수 있다 .
    const newMessage = new Chat({
        chat: message,
        user: {
            id: user._id, // 몽고디비, 새로운 정보가 생성될때 부여해주는 번호
            name: user.name,
        },

    });
    await newMessage.save();
    return newMessage;
};

module.exports = chatController;