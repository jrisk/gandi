var randomNames = require('./names');
var Remoji = require('random-emoji');
var emoji = require('emoji');

var clients = {};

module.exports = SocketSkoolia; //make this use real id/etc

function SocketSkoolia(io) {
	io.on('connection', function(socket) {

		var new_usr = 'new user 19';

		io.emit('join', new_usr);

		socket.on('join', function(person) {
			io.emit('join message', person);
		});

		socket.on('chat_message', function(msg) {
			var time = new Date();
			var hours = ('0' + time.getHours()).slice(-2);
			var minutes = ('0' + time.getMinutes()).slice(-2);
			var seconds = ('0' + time.getSeconds()).slice(-2);
			var timeNow = hours + ':' + minutes + ':' + seconds;

			console.log(socket.id);

			//socket.request

			//var person = clients[socket.request.sessionID];

			io.emit('chat_message', { msg: msg, time: timeNow });
		});

		socket.on('disconnect', function () {
			console.log('user disconnected');
		});

		socket.on('error', function(err) {
			console.log(err);
		});
	});
}

function SocketRun(io) {
	io.on('connection', function (socket) {
		
		randomNames.getNewName(function(info) {
			io.emit('join', randomNames.finish(info, socket, clients));
			});

		socket.on('join', function(person) {
			io.emit('join message', person);
		});

		socket.on('chat message', function (msg) {
		
		var randomEmoji = Remoji.random({count: 1});
		var test = (randomEmoji[0].character, emoji.unifiedToHTML(randomEmoji[0].character));
		var personName = clients[socket.request.sessionID];
		var time = new Date();
		var timeNow = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + '';
		
		io.emit('chat message', {'msg': msg, 'user': personName, 'time': timeNow, 'emoji': test});
		});
		socket.on('disconnect', function () {
			console.log('user disconnected');
		});
		socket.on('error', function(err) {
			console.log(err);
		});
	});
}