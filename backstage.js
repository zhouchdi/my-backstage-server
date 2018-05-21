const express = require("express");
// fs
const fs = require("fs");
// opn模块, 自动打开浏览器
const opn = require('opn');

const app = express();

// 获取当前文件夹
let thisPath = process.cwd();
// port
let port = "1994";
// host
let host = "127.0.0.1";

// 静态文件
app.use(express.static(thisPath)).listen(port, host, function() {
  let consoleUrl = "http://" + host + ":" + port;
  console.log(`Serving ${__dirname + "/codes"} at ${consoleUrl}`);
  // 打开consoleUrl
  opn(consoleUrl);
});