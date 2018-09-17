var http = require('http');

module.exports = {

	getNewName: function(callback) {
		http.get({
		host: 'uinames.com',
		path: '/api/'
	}, function(res) {

		var chunk = "";

		res.on('data', function(stuff) {
			chunk += stuff;
		});
		res.on('end', function() {
			console.log('response ended');
			callback(chunk);
			});
		}
		);
	},

	finish: function(info, socket, clients) {
		console.log('finish info function');
		console.log(info);
		var newPeep = JSON.parse(info);
		var fullName = newPeep.name + ' ' + newPeep.surname;
		clients[socket.request.sessionID] = fullName;
		console.log('in the join handler, client with sessionID: ' + socket.request.sessionID +
			'\nsaved to ' + fullName);
		return fullName;
	}

}