var express = require('express');
var path = require('path');
var session = require('express-session');
var server_user_session;

var bodyParser = require('body-parser');

//dev db, all dbs?
var mysql = require('mysql');

var fs = require('fs');

var app = express();

//insert as module

var connection = mysql.createConnection({

  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '',
  database : 'test_db',
  socketPath: '/srv/run/mysqld/mysqld.sock'

});

var http = require('http');
var httpServer = http.Server(app);

var io = require('socket.io')(httpServer);

var chatApp = require('./chat-app');

chatApp(io);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', 1) // trust first proxy

app.use(session({
  secret: 'le shiggy diggy',
  resave: false,
  saveUninitialized: true
  //,
  //cookie: { secure: true }
}));

var port = process.env.PORT || 8080;

var projects = [
  { 'name': 'Node With Express and Angular', 'img': '/node.png','link': '#' },
  { 'name': 'Chat in Real-Time with Socket.io', 'img': '/socket.png','link': '/chat' },
  { 'name': 'Linux Installs and Scripting', 'img': '/tux.png','link': '#' }
];

app.use('/public', express.static(path.join(__dirname, './public')));

app.use('/dist', express.static(path.join(__dirname, './dist')));

app.use('/favicon.ico', function(req,res) {
  res.sendFile(__dirname + '/public/img/favicon.ico');
});

app.use('/chat', function(req,res) {
  res.sendFile(__dirname + '/views/chat.html');
});

app.post('/skoolia', function(req,res) {
  console.log(req);
  res.send('edit profile page');
});

app.get('/api/user-sess', function(req,res) {
  console.log(req.session.user);
  if (req.session.user) {
    res.send(req.session.user);
  }
  else {
    user = {};
    req.session.user = user;
    res.sendStatus(200);
  }
});

app.get('/profile-login', function(req,res) {
  if (req.session.user) {
    console.log('user already in sesh');
    console.log(req.session.user);
    res.redirect('/profile')
  }
  else {
    req.session.reset();
    res.send('howdy there reset');
  }
})

app.post('/profile-login', function(req,res) {
  if (req.body) {
    var query = 'SELECT * FROM usr_test WHERE email = "' + req.body.username + '" AND password = "' + req.body.password + '" LIMIT 1';
      
    connection.query(query, function(error, results, fields) {
      if (error) {
        console.log('mysql error in server.js');
        throw error;
      }

      if (results.length == 0) {   
      }
      else {
          console.log(results);
          var user_res = results[0];

          console.log(user_res);

          //if (user_res === NULL)

          var user_global = {
            email: user_res.email,
            username: user_res.email,
            first: user_res.first_name, 
            last: user_res.last_name,
            id: user_res.id,
            phone: user_res.phone,
            profession: user_res.profession
          };

          req.session.user = user_global;
          server_user_session = user_global;
      }

      res.send(server_user_session);
      }); //end connect query
    }
});

app.post('/profile_create', function(req,res) {

  var email = req.body.email;
  var pass = req.body.password;
  //var first
  var send = req.body.send_emails;
  var teach = req.body.teach;
  var learn = req.body.learn;
  var both = req.body.teach_learn;

  if (both == '1') {
    teach = 1;
    learn = 1;
  }

  if (send == 'true') {
    console.log(typeof send);
    send = 1;
  }
  
  connection.connect();

  var query = 'INSERT INTO usr_test (email, password, send_email, teach, learn) VALUES ( "' + email + '", "' + pass + '", ' + send + ', ' + teach + ', ' + learn + ' )';
  //(type, first_nm,last_nm,eml_addr,pwrd,img_url,img_top,img_left,gender,date_of_birth,location_region,location_city,location_county,location_state,location_country,location_latitude,location_longitude,location_display,native_language,native_country,skype_username,gmail_username,created_on_dt,modified_on_dt, desc, learn, teach, currency, charge, lang_exch, profile_img, sparrow_customer_token, braintree_customer_id, tz_set, tz_last_used, currency_last_used)'
  connection.query(query, function(error, results, fields) {
    if (error) throw error;
  });

  console.log('user saved');

  res.sendStatus(200);
});

app.get('/projects', function(req,res) {
  var proj = JSON.stringify(projects);
  console.log(proj);
  res.send(proj);
});

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
      <meta description="vue javascript bootstrap skoolia">
      <meta name="viewport" content="width=device-width, initial-scale=1">
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
