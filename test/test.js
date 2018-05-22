const { subUrl } = require("../index");

describe('测试 suburl()',function(){
    it('/123/qwe',function(){
        suburl('c:/user/123/qwe','c:/user');
    });
});