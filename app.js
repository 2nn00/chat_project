const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors"); // 테스트 위해서 잠깐 풀어둠
const app = express();
app.use(cors());

// 데이터 베이스 연결
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => console.log("connected to database"))
    .catch(err => console.log(err));

module.exports = app;