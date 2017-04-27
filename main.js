var redis = require('redis');
var VK = require('vk-io');
var Members = require("./members.js");

client = redis.createClient();

var vk = new VK({});

vk.setOptions({
    app: 0,
    login: '@.ru',
    pass: '',
    phone: ''
});

vk.setToken("");

var vaporlab = new Members(vk, client, "vaporlab");

//vaporlab.getAllMembers(function(){console.log("wew")});
//vaporlab.isMember(858, function(res){console.log(res)});
//vaporlab.delId(2363459);