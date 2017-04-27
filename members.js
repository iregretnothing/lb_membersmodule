
module.exports = members = function(vk, client, group_id) {
	this.vk = vk;
	this.client = client;
	this.group_id = group_id;
}

members.prototype.getAllMembers = function(callback) {

	const vk = this.vk;
	const client = this.client;
	const group_id = this.group_id;

	client.del(group_id, function() {

		vk.collect.groups.getMembers({
			group_id: group_id
		})
		.then(function(members) {
			client.lpush(group_id, members, function() {
				callback();
			});
		})
		.catch(function(error) {
			console.error(error);
		});

	});

}

members.prototype.isMember = function(user_id, callback) {	

	const client = this.client;
	const group_id = this.group_id;

	client.lrange(group_id, 0, -1, function(err, reply) {

		if(err) {
			callback(err)
		}

		reply.forEach(function(value, i) {
			if(value == user_id) {
				callback(i);
			}
		});

	});

}

members.prototype.setId = function(user_id, callback) {
	client.lpush(this.group_id, user_id, callback);
}

members.prototype.delId = function(user_id, callback) {
	client.lrem(this.group_id, 0, user_id, callback);
}