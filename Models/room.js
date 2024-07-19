const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {
        room: {
            type: String,
            required: true,
            unique: true,
        },
        members: [
            {
                type: mongoose.Schema.ObjectId,
                unique: true,
                ref: "User",
            },
        ],
    },
    { timestamp: true }
);
module.exports = mongoose.model("Room", roomSchema);
