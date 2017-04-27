
module.exports = members = function(vk, client, group_id) {
	this.vk = vk;
	this.client = client;
	this.group_id = group_id;
}

members.prototype.getAllMembers = function(callback) {

	var vk = this.vk;
	var client = this.client;
	var group_id = this.group_id;

	var step = 1000;

	client.del(group_id, function() {
		stepGet(group_id, step, 0, callback);
	});

	
	function stepGet(group_id, step, i, callback) {
		vk.api.groups.getMembers({
	            group_id: group_id,
	            count: step,
	            offset: i
	        })
	        .then( function(members) {
	        	client.lpush(group_id, members.items);
	        	i += step;
	        	if(i<members.count) {
	        		stepGet(group_id, step, i, callback);
	        	} else {
	        		callback();
	        	}
	        })
	        .catch( function(error) {
	            console.error(error);
	    });
	}

}

members.prototype.isMember = function(user_id, callback) {	

	var client = this.client;
	var group_id = this.group_id;

	client.lrange(group_id, 0, -1, function(err, reply) {
		if(err) {callback(err)}
		reply.forEach(function(value, i) {
			if(value == user_id) {
				callback(i);
			};
		});

	});

}

members.prototype.setId = function(user_id, callback) {
	client.lpush(this.group_id, user_id, callback);
}

members.prototype.delId = function(user_id, callback) {
	client.lrem(this.group_id, 0, user_id, callback);
}