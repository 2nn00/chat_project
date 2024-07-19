const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        // 메시지 내용
        chat: String,
        // 보낸사람(객체)
        user: {
            id: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
            },
            name: String,

        },

    },
    { timeStamp: true }
);

module.exports = mongoose.model("Chat", chatSchema);