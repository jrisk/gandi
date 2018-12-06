var express = require('express');
var path = require('path');
var session = require('express-session');
var server_user_session = {};

/*var user_global = {
  email: user_res.email,
  username: user_res.email,
  first: user_res.first_name, 
  last: user_res.last_name,
  id: user_res.id,
  phone: user_res.phone,
  profession: user_res.profession
};*/

var bodyParser = require('body-parser');

//dev db, all dbs?
var mysql = require('mysql');

var fs = require('fs');

//const bcrypt = require('bcrypt');
//const saltRounds = 7;

const bcrypt = require('bcrypt-nodejs');

var app = express();

//MEMORY STORE

//npm install memorystore, express-session extension
//or use express-mysql-session
//Gandi may not allow in memory store
//req.session.key=req.body.email;
//client.set('c_key', req.session.key);

//var redis = require('redis');

//may need to require redis-server, test this

//var redisClient = redis.createClient({host : 'localhost', port : 6379});

/*var RedisStore = require('connect-redis')(session);

var client = redis.createClient();

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('ready',function() {
 console.log("Redis is ready");
});

client.on('error',function(err) {
 console.log("Error in Redis");
 console.log(err);
})

let redis_opts = { 
  host: 'localhost', 
  port: 6379,
  client: client,
  ttl :  260
};
 
app.use(session({
    store: new RedisStore(redis_opts),
    secret: 'keyboard cat',
    saveUninitialized: false,
    resave: false
}));

*/

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

var pdub = 'password';
var socketPath = '';
var db_port = 3306;
//change this on prod somehow

if (process.env.TERM_PROGRAM != 'iTerm.app') {
  pdub = '';
  socketPath = '/srv/run/mysqld/mysqld.sock';
  db_port = '';
}

//DATABASE MYSQL

var connection = mysql.createConnection({

  host     : 'localhost',
  port     : db_port,
  user     : 'root',
  password : pdub,
  database : 'test_db',
  socketPath: socketPath

});

//USE CONNECTION POOLING INSTEAD
connection.connect();


//MAILGUN STUFF

var mailgun = require('mailgun-js');
var api_key = 'd462f4b5a10584cdddd1e6cfb9b486dd-52cbfb43-ee1e972c';
var DOMAIN = 'jarisk.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

var m_html = '<div style="padding: 5px; text-align: center; background-color: #06f;">';
m_html += '<img src="http://www.jarisk.com/public/img/skoolia_logo.png" style="width: 163px; height: 32px;">';
m_html += '</div>';
m_html += '<div style="padding: 10px;">';
m_html += 'Hi'; ////$this->get_dict(110, '', '', $lang;
m_html += ',<br><br>';
m_html += 'We\'ve received a request to reset your password. If you didn\'t make the request, just ignore this email. Otherwise, you can reset your password using this link';//$this->get_dict(111, '', '', $lang);
m_html += '<br><br>';
//reset link code
m_html += '<a href="http://jarisk.com/reset/key" style="margin:0;font-family:"Helvetica Neue","Helvetica",Helvetica,Arial,sans-serif;border:1px solid;display:block;padding:10px 16px;text-decoration:none;border-radius:2px;text-align:center;vertical-align:middle;font-weight:bold;white-space:nowrap;background:white;border-color:#ff5a5f;background-color:#ff5a5f;color:white;border-top-width:1px;">';// . $this->get_dict(112, '', '', $lang) . '</a><br><br>';
m_html += 'Click here to reset your password</a><br><br>';
m_html += 'Regards';//$this->get_dict(113, '', '', $lang);
m_html += ',<br><br>';
m_html += 'The Skoolia Team';//$this->get_dict(114, '', '', $lang);

var m_data = {
  from: 'Skoolia <admin@jarisk.com>',
  to: 'joeyrsk@gmail.com',
  subject: 'Password Reset',
  text: 'Testing out Mailgun',
  html: m_html
};

var MailComposer = require('nodemailer/lib/mail-composer');

var mail = new MailComposer(m_data);

app.get('/testmailreset', function(req,res) {

  mail.compile().build( function(err, msg) {

    if (err) {
      console.log(err);
      throw err;
    }

    var data_send = {
      to: 'joeyrsk@gmail.com',
      message: msg.toString('ascii')
    }

    mailgun.messages().sendMime(data_send, function (error, body) {
      if (error) {
        console.log(error);
        throw error;
      }
      console.log(body);
    });

  });

  res.sendStatus(200);
})

app.use('/public', express.static(path.join(__dirname, './public')));

app.use('/dist', express.static(path.join(__dirname, './dist')));


app.use('/favicon.ico', function(req,res) {
  res.sendFile(__dirname + '/public/img/favicon.ico');
});

app.use('/chat', function(req,res) {
  res.sendFile(__dirname + '/views/chat.html');
});

app.use('/secure', function(req,res) {
  res.sendStatus(200);
});

app.post('/skoolia', function(req,res) {
  res.send('edit profile page');
});

app.get('/api/user-sess', function(req,res) {

  if (req.session.user) {
    res.send(req.session.user);
  }
  else {
    /*
    test_user = {
      id: 1,
      email: 'serveremail@example.com',
      password: 'pass',
      username: 'username',
      first_name: 'server first',
      last_name: 'server last',
      phone: '',
      profession: '',
      send_email: 0,
      teach: 0,
      learn: 0,
      about_me: 'hello this is about text'
    };
    */
    req.session.user = server_user_session;

    res.send(req.session.user);
  }
});

app.get('/profile-login', function(req,res) {
  if (req.session.user) {
    console.log('user already in sesh');
    res.redirect('/profile')
  }
  else {
    req.session.reset();
    res.send('howdy there reset');
  }
});

app.get('/logout', function(req,res) {
  req.session.user = {};
  res.sendStatus(200);
});

app.post('/profile-login', function(req,res) {
  if (req.body) {
    var query = 'SELECT * FROM usr_test WHERE email = "' + req.body.username + '"'; //AND password = "' + req.body.password + '" LIMIT 1';
      
    connection.query(query, function(error, results, fields) {
      if (error) {
        console.log('mysql error in server.js');
        throw error;
      }

      if (results.length == 0) {
        res.send({ email: 0 });
      }
      else {
          var user_res = results[0];
          var check = bcrypt.compareSync(req.body.password, user_res.password);
          
          console.log(check);
          if (!check) {
            res.send({ email: 0});
          }
          else {
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

          res.send(server_user_session);
          }
        }

      }); //end connect query
    }
});

app.post('/profile-create', function(req,res) {

  var email = req.body.email;
  var pass = req.body.password;
  var username = req.body.email;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var phone = '';//req.body.phone;
  var profession = '';//req.body.profession;
  var send = 0;//req.body.send_emails;
  var teach = 0;//req.body.teach;
  var learn = 0;//req.body.learn;
  //var both = req.body.teach_learn;
  var about_me = '';//req.body.about_me;

  /*if (both == '1') {
    teach = 1;
    learn = 1;
  }

  if (send == 'true') {
    send = 1;
  }*/

  //ER_DUP_ENTRY: Duplicate entry 'test@testy.com' for key 'email'
  var query = 'SELECT * FROM usr_test WHERE email = "' + email + '" ';
  connection.query(query, function(error, results, fields) {
    if (error) {
      throw error;
    }

    if (results.length != 0) {
      res.send('no');
      //stop, make them pick a unique email
    }

    else {

      var hash = bcrypt.hashSync(pass);

      var query = 'INSERT INTO usr_test (email, password, username, first_name, last_name, phone, profession, send_email, teach, learn, about_me) VALUES ( "' + email + '", "' + hash + '", "' + username + '", "' + first_name + '", "' + last_name + '", "' + phone + '", "' + profession + '", ' + send + ', ' + teach + ', ' + learn + ', "' + about_me + '" )';
      //(type, first_nm,last_nm,eml_addr,pwrd,img_url,img_top,img_left,gender,date_of_birth,location_region,location_city,location_county,location_state,location_country,location_latitude,location_longitude,location_display,native_language,native_country,skype_username,gmail_username,created_on_dt,modified_on_dt, desc, learn, teach, currency, charge, lang_exch, profile_img, sparrow_customer_token, braintree_customer_id, tz_set, tz_last_used, currency_last_used)'
      connection.query(query, function(error, results, fields) {
      if (error) {
        throw error;
      }
      console.log(results.insertId);
      //make this a method
          var user_global = {
            email: email,
            username: email,
            first: first_name, 
            last: last_name,
            id: results.insertId,
            phone: phone,
            profession: profession
          };

          req.session.user = user_global;
          server_user_session = user_global;

      res.send('Ok');
      });
    }

  });

  console.log('user saved');
});

app.use('/weather', function(req,res) {
  res.sendFile(__dirname + '/views/weatherapp.html');
});

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
