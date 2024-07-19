const Room = require("../Models/room");
const roomController = {};

roomController.createRoom = async (roomName) => {
    const existingRoom = await Room.findOne({ room: roomName });
    if (existingRoom) throw new Error("Room already exists");

    const newRoom = new Room({
        room: roomName,
        members: [],
    });

    await newRoom.save();
    return newRoom;
};

roomController.getAllRooms = async () => {
    const roomList = await Room.find({});
    return roomList;
};

roomController.addUserToRoom = async (roomId, userId) => {
    const room = await Room.findById(roomId);
    if (!room) throw new Error("Room not found");

    if (!room.members.includes(userId)) {
        room.members.push(userId);
        await room.save();
    }
    return room;
};

roomController.removeUserFromRoom = async (roomId, userId) => {
    const room = await Room.findById(roomId);
    if (!room) throw new Error("Room not found");

    room.members = room.members.filter(member => member.toString() !== userId);
    await room.save();
    return room;
};

module.exports = roomController;