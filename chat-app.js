var randomNames = require('./names');
var Remoji = require('random-emoji');
var emoji = require('emoji');

var clients = {};

module.exports = SocketSkoolia; //make this use real id/etc

function SocketSkoolia(io, mysql) {

	//var nsp = io.of('/'+namespace);

	io.on('connect', function(socket) {

		var sid = socket.handshake.session.id;

		socket.handshake.session.userdata = socket.id;
		socket.handshake.session.save();

		var user_id = '';
		var user_name = '';
		var img_src = '/public/img/profile_default.png';

		var usr_obj = socket.handshake.session.user;

		if (typeof usr_obj != 'undefined' && usr_obj.hasOwnProperty('email')) {

			user_name = usr_obj.email;
			img_src = usr_obj.img_url;
			user_id = usr_obj.id;

			if (usr_obj.email == 'joeyrsk@gmail.com') {
				console.log('admin room');
			}
			else {
				console.log('user room');
			}
		}
		else {
			user_name = 'guest'+(sid.slice(0,4));
			user_id = 0;
		}

		var room = user_id+'.'+user_id;

		socket.on('login', function(data) {
			console.log('user id on login: ' + data);
			var first_room = data+'.'+data;

			room = first_room;
			
			console.log('first joining room: ' + room);
			socket.join(room);
			var to_id = data;
			io.to(room).emit('login_client', {user_name: user_name, user_id: user_id, to_id: to_id, room: first_room});
		});

		socket.on('direct_msg', function(data) {
			console.log('dm server socket call');
			var dm_room = user_id < data.to_id ? user_id + '.' + data.to_id : data.to_id + '.' + user_id;
			room = dm_room;
			socket.join(room);
			io.to(room).emit('direct_msg', {user_id: user_id, from_id: data.from_id, to_id: data.to_id, room: room });
		});

		socket.on('contact_list', function(data) {
			var query = `SELECT m.id, room, from_id, to_id, dt, txt, img_url, first_name FROM msg m JOIN usr_test u ON m.to_id = u.id WHERE from_id = ` + user_id + ` OR to_id = ` + user_id + ` UNION SELECT m.id, room, from_id, to_id, dt, txt, img_url, first_name FROM msg m JOIN usr_test u ON m.from_id = u.id WHERE to_id = ` + user_id + ` OR from_id = ` + user_id;

			mysql.query(query, function(error, results, fields) {
				if (error) {
					console.log('chat save error');
					throw error;
				}

				if (results.length == 0) {
					console.log('empty results');
				}
				else {
					var contacts = [];
					var rooms = [];
					var contact_list = [];
					var dupe_shit = [];
					var fug = [];

						for (result in results) {
							var res = results[result];

							//uggo hack for bad mysql join
							if (!contact_list.includes(res.img_url)) {
								var contact = { to_id: res.to_id, name: res.first_name, from_id: res.from_id, room: res.room, avatar: res.img_url }
								contacts.push(contact);
								var help = {};
								console.log(res.to_id);
								//its always going to save the img url from the first from_id

								help.id = res.to_id;
								help.img = res.img_url;
								fug.push(help);
								contact_list.push(res.img_url);
							}

							if (!dupe_shit.includes(res.id)) {

								var chat_room = res.room;

								var avatar = img_src;

								if (res.from_id == user_id) {
								}
								else {
									for (var i = fug.length - 1; i >= 0; i--) {
										if (fug[i].id == res.from_id) {
											avatar = fug[i].img;
										}
									}
								}

								var room_obj = { id: chat_room, value: {msg: res.txt, msg_id: res.id, from_id: res.from_id, to_id: res.to_id, user_id: res.from_id, first_name: res.first_name, avatar: avatar, time: res.dt} };

								rooms.push(room_obj);

								dupe_shit.push(res.id);

							}

						}

					console.log('contact_list called, now loading history');

					socket.join(room);
					io.to(room).emit('load_history', { rooms: rooms, contacts: contacts } );
				}
			})
		});

		socket.on('chat_message', function(msg_obj) {

			var time = new Date();
			var hours = ('0' + time.getHours()).slice(-2);
			var minutes = ('0' + time.getMinutes()).slice(-2);
			var seconds = ('0' + time.getSeconds()).slice(-2);
			var timeNow = hours + ':' + minutes + ':' + seconds;

			var from_id = msg_obj.from_id;
			var to_id = msg_obj.to_id;
			var to_room = msg_obj.room;
			//room = from_id < to_id ? from_id + '.' + to_id : to_id + '.' + from_id;
			console.log('to the room id on chat msg: ' + to_room + ' from: ' + from_id + ' to:' + to_id);
			var msg = msg_obj.msg;

			//save chat in redis, then send when view mounted?

			var query = `INSERT INTO msg (from_id, to_id, dt, txt, room) VALUES (` + from_id + `, ` + to_id + `, NOW(), '` + msg + `','` + to_room + `')`;
			mysql.query(query, function(error, results, fields) {
				if (error) {
					console.log('chat save error');
					throw error;
				}

				if (results.length == 0) {
					console.log('empty results');
				}
				else {
					console.log(results);
				}

				socket.join(to_room);
				io.to(to_room).emit('chat_message', { msg: msg_obj.msg, time: timeNow, user_id: user_id, avatar: img_src, room: to_room, from_id: from_id, to_id: to_id });
			});
		});

		socket.on('logout', function(data) {
			console.log('logout socket');
			console.log(usr_obj);
			//socket.disconnect();
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