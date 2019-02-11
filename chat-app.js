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

		socket.on('get-session', function(data) {
			socket.join(room);
			console.log('socket get-session called, joined room ' + room + ' with user_id ' + user_id);
			io.to(room).emit('getSocketSession', {user_id: user_id, room: room, avatar: img_src});
		});

		socket.on('direct_msg', function(data) {
			console.log('dm server socket call');
			var dm_room = user_id < data.to_id ? user_id + '.' + data.to_id : data.to_id + '.' + user_id;
			room = dm_room;
			socket.join(room);
			io.to(room).emit('direct_msg', {user_id: user_id, from_id: data.from_id, to_id: data.to_id, room: room });
		});

		socket.on('contact_list', function(data) {
			var query = `SELECT m.id, room, from_id, to_id, dt, txt, img_url, first_name FROM msg m LEFT JOIN usr_test u ON m.to_id = u.id WHERE from_id = ` + user_id + ` UNION SELECT m.id, room, from_id, to_id, dt, txt, img_url, first_name FROM msg m LEFT JOIN usr_test u ON m.from_id = u.id WHERE to_id = ` + user_id + ` ORDER BY id DESC`;

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

					const monthNames = ["January", "February", "March", "April", "May", "June",
  				"July", "August", "September", "October", "November", "December"
					];

						for (result in results) {
							var res = results[result];

							//hack for bad join on img
							var avatar = res.img_url;
							var chat_room = res.room;

							if (res.from_id == user_id && res.img_url != img_src) {
								avatar = img_src;
							}

							if (!contact_list.includes(chat_room)) {

								var contact = { to_id: res.to_id, name: res.first_name, from_id: res.from_id, room: chat_room, avatar: res.img_url };
								contact_list.push(chat_room);
								contacts.push(contact);
							}

							var h_time = new Date(res.dt);

							var week_day = '';
							var day = h_time.getDate();

							switch (h_time.getDay()) {
								case 0:
								week_day = 'Sunday';
								break;
								case 1:
								week_day = 'Monday';
								break;
								case 2:
								week_day = 'Tuesday';
								break;
								case 3:
								week_day = 'Wednesday';
								break;
								case 4:
								week_day = 'Thursday';
								break;
								case 5:
								week_day = 'Friday';
								break;
								case 6:
								week_day = 'Saturday';
								break;
							}

							var month = monthNames[h_time.getMonth()];

							var hours = ('0' + h_time.getHours()).slice(-2);
							var minutes = ('0' + h_time.getMinutes()).slice(-2);
							var seconds = ('0' + h_time.getSeconds()).slice(-2);
							
							var f_time = week_day + ', ' + month + ' ' + day + ', ' + hours + ':' + minutes + ':' + seconds;

							var room_obj = { id: chat_room, value: {msg: res.txt, msg_id: res.id, from_id: res.from_id, to_id: res.to_id, user_id: user_id, first_name: res.first_name, avatar: avatar, time: f_time } };

							rooms.push(room_obj);

						}

					//picture from to_id if to_id != from_id and from_id == user_id
					socket.join(room);
					console.log('joined room ' + room + ' from contact_list method');
					io.to(room).emit('initial_data', { rooms: rooms, contacts: contacts } );
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