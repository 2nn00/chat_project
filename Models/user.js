// 유저스키마 만들기 
const mongoose = require("mongoose");

//Schema: 데이터의 설계도  
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User must type name"],
        unique: true,
    },
    // 이름뿐만 아니라 연결 id 정보를 token으로 저장 
    token: {
        type: String,
    },
    // 상태가 온라인인지 오프라인인지 
    online: {
        type: Boolean,
        default: false,
    },

});
module.exports = mongoose.model("User", userSchema);