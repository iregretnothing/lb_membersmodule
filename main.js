var redis = require('redis');
var VK = require('vk-io');
var Members = require("./members_2.js");

client = redis.createClient();

var vk = new VK({});

vk.setOptions({
    app: 6005112,
    login: 'leoweyfreelancewallet@yandex.ru',
    pass: 'blitz3dfastextmangoworms12345',
    phone: '+79683373481'
});






vk.setToken("41730f1cc6e1cc35b845f23a505f1e8053eb1800c836632539284521584288f0f76dbcbe077772297611e");

var members = new Members(vk, client, "vaporlab");

members.getAllMembers(function(){console.log("wew")});
 //members.isMember(858, function(res){console.log(res)});

// members.delId(2363459);

