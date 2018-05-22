#!/usr/bin/env node
const express = require("express");
// fs
const fs = require("fs");
// opn模块, 自动打开浏览器
const opn = require("opn");

const app = express();

// 获取当前文件夹
let thisPath = process.cwd();
// port
let port = "1994";
// host
let host = "127.0.0.1";

// 启动服务
function start() {
  // 静态文件夹
  app.use(express.static(thisPath));

  function readFiles(path) {
    // 读取文件
    fs.readdir(path, function(err, files) {
      if (err) {
        return console.error(err);
      }

      // 读取所有子文件
      files.forEach(function(file) {
        // 获取当前的文件状态
        let states = fs.statSync(path + "/" + file);
        // 判断是否是文件夹，是则继续读取文件，不是则直接输出其中的内容
        if (states.isDirectory()) {
          // 自调
          readFiles(path + "/" + file);
        } else {
          let url = subUrl(path + "/" + file);
          app.get(url, function(req, res) {
            res.end();
          });
        }
      });
    });
  }

  // 读取文件
  readFiles(thisPath);

  // 服务器监听
  app.listen(port, host, function() {
    let consoleUrl = "http://" + host + ":" + port;
    console.log(`Serving ${thisPath} at ${consoleUrl}`);
    // 打开consoleUrl
    opn(consoleUrl);
  });
}

// 截取地址组成url地址
function subUrl(path) {
  let oriPath = path;
  let reg = thisPath;
  let url = thisPath.replace(reg, "");

  return url;
}

module.exports = {
  start: start
};
