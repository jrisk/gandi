var randomNames = require('./names');
var Remoji = require('random-emoji');
var emoji = require('emoji');

var clients = {};

module.exports = SocketSkoolia; //make this use real id/etc

function SocketSkoolia(io) {

	//var nsp = io.of('/'+namespace);

	io.on('connect', function(socket) {

		console.log('socket connected');

		var sid = socket.handshake.session.id;
		console.log('handshake session id: ' + sid);

		socket.handshake.session.userdata = socket.id;
		socket.handshake.session.save();

		var user_name = '';
		var img_src = '/public/img/profile_default.png';

		var usr_obj = socket.handshake.session.user;
		console.log(usr_obj);

		if (typeof usr_obj != 'undefined' && usr_obj.hasOwnProperty('email')) {

			user_name = usr_obj.email;
			img_src = usr_obj.img_url;

			if (usr_obj.email == 'joeyrsk@gmail.com') {
				socket.join('admin');
				console.log('admin room');
			}
			else {
				socket.join('user');
				console.log('user room');
			}
		}
		else {
			var user_name = 'guest'+(sid.slice(0,4));
		}

		var room = user_name;
		socket.join(room);

		console.log('joining room ' + room);

		socket.on('join', function(string) {
			console.log('got the socket msg from comp');
			console.log(string);
			io.to(room).emit('join_message', {user: user_name});
		});

		socket.on('direct_msg', function(data) {
			console.log('dm server socket call');
			console.log(data);
			//var dm_room = user + current_room;
			//socket.join(string + current_room);
			//io.to(dm_room).emit('now chatting with ' + user2)
			//add user1 and user2 together to make same room
		});

		socket.on('login', function(data) {
			console.log(data);
			user_name = data;
			io.to(room).emit('login_client', {user: user_name});
		});

		socket.on('logout', function(data) {
			console.log('logout socket');
			console.log(usr_obj);
			//socket.disconnect();
		});

		socket.on('chat_message', function(msg) {

			var time = new Date();
			var hours = ('0' + time.getHours()).slice(-2);
			var minutes = ('0' + time.getMinutes()).slice(-2);
			var seconds = ('0' + time.getSeconds()).slice(-2);
			var timeNow = hours + ':' + minutes + ':' + seconds;

			//save chat

			io.to(room).emit('chat_message', { msg: msg, time: timeNow, user: user_name, avatar: img_src });
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