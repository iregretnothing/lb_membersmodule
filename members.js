
const log = require('fancy-log');

module.exports = members = function(vk, client, groupId) {
	this.vk = vk;
	this.client = client;
	this.groupId = groupId;
	this.redisKey = 'members_' + this.groupId;
}

members.prototype.loadAll = function () {

	return new Promise(
		(resolve, reject) => {
			this.client.exists(this.redisKey, (err, reply) => {
				if (!reply) {
					this.vk.collect.groups.getMembers({
						group_id: this.groupId
					})
					.then((members) => {
						this.client.zadd(this.redisKey, members, (err, reply) => {
							if (err) {
								log.error('Error: ', 'Problem with loadAll function:\n'+err);
								reject(err);
							} else {
								log('Got members');
							}
							resolve(members);
						});
					})
					.catch((error) => {
						reject(error);
					});
				} else {
					log('Members list "'+this.redisKey+'" allready exist');
					resolve(members);
				}
			});
		}
	);

}

members.prototype.isMember = function (userId) {	

	return new Promise(
		(resolve, reject) => {
			this.client.zscore(this.redisKey, userId, (err, reply) => {

				if (err) {
					log.error('Error: ', 'Problem with finding id{'+userId+'}\n'+err);
					reject(err);
				} else {
				
					if (reply !== null) {
						log('Id{'+userId+'} is member of "'+this.groupId+'" group');		
					} else {
						log('Member id{'+userId+'} not found at group "'+this.groupId+'"');
					}
								
					resolve(reply);
				}
			});
		}
	);

}

members.prototype.add = function (userId) {

	return new Promise(
		(resolve, reject) => {
			this.client.zadd(this.redisKey, 1, userId, (err, reply) => {
				if (err) {
					log.error('Error: ', 'Problem with addind id{'+userId+'}\n'+err);
					reject(err);
				} else {
					log('Member id{'+userId+'} added');
					resolve(reply);
				}
			});
		}
	);

}

members.prototype.remove = function (userId) {

	return new Promise(
		(resolve, reject) => {
			this.client.zrem(this.redisKey, userId, (err, reply) => {
				if (err) {
					log.error('Error: ', 'Problem with deleting id{'+userId+'}\n'+err);
					reject(err);
				} else {
					log('Member id{'+userId+'} deleted');
					resolve(reply);
				}
			});
		}
	); 

}