const express = require("express");
// fs
const fs = require("fs");

const app = express();

// 静态文件
app.use(express.static("public"));

console.log(__dirname);

module.exports = function() {
    console.log(__dirname)
};
