//io에 관련된 모든 일을 함수
module.exports = function (io) {
    //말하는 함수: .emit
    //듣는 함수: .on
    io.on("connection", async (socket) => {
        // 연결된사람을 socket이라는 매개변수로 가져올 수 있음
        console.log("client is connected", socket.id);
    });

};