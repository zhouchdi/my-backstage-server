#!/usr/bin/env node
const express = require("express");
// fs
const fs = require("fs");
// opn模块, 自动打开浏览器
const opn = require("opn");
// http
const http = require("http");
// 监视文件变化
const chokidar = require("chokidar");

const app = express();

// 获取当前文件夹
let thisPath = process.cwd();
// port
let port = "1994";
// host
let host = "127.0.0.1";

// 启动服务
function start() {
  // 创建一个服务器
  let server = http.createServer(function(req, res) {
    res.setHeader("Content-Type", "text/plain");
    res.end();
  });

  // 静态文件
  app.use(express.static(thisPath));
  // 服务器监听
  server.listen(port, host, function() {
    let consoleUrl = "http://" + host + ":" + port;
    console.log(`Serving ${__dirname} at ${consoleUrl}`);
    console.dir(process.argv);
    console.dir(process.env)
    console.log(" 返回当前进程的工作目录."+process.argv);
    console.log("这是启动进程的可执行程序的绝对路径."+process.execPath);
    // 打开consoleUrl
    opn(consoleUrl);
  });

  // 监听
  const watcher = chokidar.watch('.',{
    ignored: /(^|[\/\\])\../,
    persistent: true
  });

  watcher
  .on('add', path => console.log(`File ${path} has been added`))
  .on('change', path => console.log(`File ${path} has been changed`))
  .on('unlink', path => console.log(`File ${path} has been removed`))
  .on('addDir', path => console.log(`Directory ${path} has been added`))
  .on('unlinkDir', path => console.log(`Directory ${path} has been removed`))
  .on('error', error => console.log(`Watcher error: ${error}`))
//   .on('ready', () => console.log('Initial scan complete. Ready for changes'))
//   .on('all', (event, path) => console.log(event,path))
//   .on('raw', (event, path, details) => {
//     console.log('Raw event info:', event, path, details);
//   });
}

module.exports = {
  start: start
};
