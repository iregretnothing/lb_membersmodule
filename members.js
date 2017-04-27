
module.exports = members = function(vk, client, groupId) {
	this.vk = vk;
	this.client = client;
	this.groupId = 'members_' + groupId;
}

members.prototype.getAllMembers = function() {

	let vk = this.vk;
	let client = this.client;
	let groupId = this.groupId;

	let promise = new Promise(
		function(resolve, reject) {
			vk.collect.groups.getMembers({
				group_id: groupId
			})
			.then(function(members) {
				client.zadd(groupId, members, function() {
					resolve(members);
				});
			})
			.catch(function(error) {
				reject(error);
			});
		}
	);

	return promise;

}

members.prototype.isMember = function(user_id) {	

	let client = this.client;
	let groupId = this.groupId;

	let promise = new Promise(
		function(resolve, reject) {
			client.zscore(groupId, user_id, function(err, reply) {

				if (err) {
					reject(err);
				} else {
					resolve(reply);
				}

			});
		}
	);

	return promise;

}

members.prototype.setId = function(user_id) {

	let promise = new Promise(
		function(resolve, reject) {
			client.zadd(this.groupId, user_id, function(err, reply) {
				if (err) {
					reject(err);
				} else {
					resolve(reply);
				}
			});
		}
	);

	return promise;

}

members.prototype.delId = function(user_id) {

	let promise = new Promise(
		function(resolve, reject) {
			client.zrem(this.groupId, user_id, function(err, reply) {
				if (err) {
					reject(err);
				} else {
					resolve(reply);
				}
			});
		}
	); 

	return promise;
}