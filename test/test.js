const { subUrl } = require("../index");
console.log(subUrl());

describe("测试 suburl()", function() {
  it("/123/qwe", function() {
    subUrl("c:/user/123/qwe", "c:/user");
  });
});
