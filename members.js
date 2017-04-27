
var log = require('fancy-log');

module.exports = members = function(vk, client, groupId) {
	this.vk = vk;
	this.client = client;
	this.groupId = groupId;
}

members.prototype.loadAll = function () {

	// let vk = this.vk;
	// let client = this.client;
	// let groupId = this.groupId;

	return new Promise(
		(resolve, reject) => {
			this.vk.collect.groups.getMembers({
				group_id: groupId
			})
			.then( (members) => {
				this.client.zadd( 'members_' + this.groupId, members, (err, reply) => {
					if (err) {
						log.error('Error by getAllMembers function:\n'+err);
						reject(err);
					} else {
						log('Got members');
					}
					resolve(members);
				});
			})
			.catch(function(error) {
				reject(error);
			});
		}
	);


}

members.prototype.isMember = function (userId) {	

	//let client = this.client;
	//let groupId = this.groupId;

	return new Promise(
		(resolve, reject) => {
			this.client.zscore( 'members_' + this.groupId, userId, (err, reply) => {

				if (err) {
					log.error('Problem with finding id{'+userId+'}\n'+err);
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
		function(resolve, reject) {
			client.zadd( 'members_' + this.groupId, 1, userId, (err, reply) => {
				if (err) {
					log.error('Problem with addind id{'+userId+'}\n'+err);
					reject(err);
				} else {
					log('Member id{'+userId+'} added')
					resolve(reply);
				}
			});
		}
	);

}







members.prototype.remove = function (userId) {

	return new Promise(
		function (resolve, reject) {
			client.zrem( 'members_' + this.groupId, userId, function (err, reply) {
				if (err) {
					log.error('Problem with deleting id{'+userId+'}\n'+err);
					reject(err);
				} else {
					log('Member id{'+userId+'} deleted');
					resolve(reply);
				}
			});
		}
	); 

}