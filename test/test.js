const { subUrl } = require("../index");

describe("测试 subUrl()", function() {
  it("/123/qwe", function() {
    subUrl("c:/user/123/qwe", "c:/user");
  });
});
