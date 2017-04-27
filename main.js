var redis = require('redis');
var VK = require('vk-io');
var Members = require("./members.js");

client = redis.createClient();

var vk = new VK({});

vk.setOptions({
    app: 0,
    login: 'leoweyfreelancewallet@yandex.ru',
    pass: '',
    phone: ''
});

vk.setToken("");

var members = new Members(vk, client, "vaporlab");

members.getAllMembers(function(){console.log("wew")});
 //members.isMember(858, function(res){console.log(res)});

// members.delId(2363459);