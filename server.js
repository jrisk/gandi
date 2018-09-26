var express = require('express');
var path = require('path');

var fs = require('fs');

var app = express();

var http = require('http');
var httpServer = http.Server(app);

var io = require('socket.io')(httpServer);

var chatApp = require('./chat-app');

chatApp(io);

var port = process.env.PORT || 8080;

var projects = [
	{ 'name': 'Node With Express and Angular', 'img': '/node.png','link': '#' },
	{ 'name': 'Chat in Real-Time with Socket.io', 'img': '/socket.png','link': '/chat' },
	{ 'name': 'Linux Installs and Scripting', 'img': '/tux.png','link': '#' }
];

app.set('views', __dirname + '/views');

app.use('/dist', express.static(path.join(__dirname, './dist')));

app.use('/favicon.ico', function(req,res) {
	res.sendFile(__dirname + '/img/favicon.ico');
});

app.use('/test', function(req,res) {
	res.send('see if this updates');
});

app.use('/chat', function(req,res) {
	res.sendFile(__dirname + '/views/chat.html');
});

app.get('/projects', function(req,res) {
	var proj = JSON.stringify(projects);
	console.log(proj);
	res.send(proj);
});

app.get('/status', function(req,res) {
	res.sendStatus(200);
});

app.use('/gallop', function(req,res) {
	res.send('wip');
})

/*WEATHER JQUERY SUBMODULE

app.use('/weatherapp/weatherapp.css', function(req,res) {
	res.sendFile(__dirname + '/weatherapp/weatherapp.css');
});

app.use('/weatherapp/weatherjquery.js', function(req,res) {
	res.sendFile(__dirname + '/weatherapp/weatherjquery.js');
});

app.use('/weather', function(req,res) {
	res.sendFile(__dirname + '/weatherapp/weatherapp.html');
});

*/

const bundle = require('./dist/server.bundle.js');

const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./index.html', 'utf-8')
});

app.get('*', (req, res) => { 
    
  bundle.default({ url: req.url }).then((app) => {

    const context = {
      title: 'Vue JS Project',
      meta: `
      <meta description="vue javascript meta">
      <link rel="stylesheet" type="text/css" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css"/>
      <link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.css"/>
      <link rel="shortcut icon" type="image/png" href="./dist/favicon.png"/>
      `
    };

    renderer.renderToString(app, context, function (err, html) {   
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page not found');
        } else {
          res.status(500).end('Internal Server Error');
        }
      } else {
        res.end(html);
      }
    });        
  }, (err) => {
    console.log(err);
  });  
}); 

httpServer.listen(port, function () {
	console.log("listening on port: " + port);
}).on('error', function (err) {
	console.log(err.code);
	process.exit();
})
