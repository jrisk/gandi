var express = require('express');
var path = require('path');
var session = require('express-session');

var bodyParser = require('body-parser');

var mysql = require('mysql');

var fs = require('fs');

//const bcrypt = require('bcrypt');
//const saltRounds = 7;

const bcrypt = require('bcrypt-nodejs');
const uuid4 = require('uuid/v4');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/tmp/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) //path.extname(file.originalname)
  }
});

var upload = multer({ storage: storage });

var app = express();

var http = require('http');
var httpServer = http.Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', 1) // trust first proxy

var enviro = require('dotenv').config();

var pdub,socketPath,db_port,mailgun_key = '';

if (process.env.TERM_PROGRAM != 'iTerm.app') {
  socketPath = '/srv/run/mysqld/mysqld.sock';
  mailgun_key = enviro.parsed.MAILGUN_KEY;
}

else {
  pdub = process.env.DB_PASS;
  socketPath = '';
  db_port = process.env.DB_PORT;
  mailgun_key = process.env.MAILGUN_KEY;
}

var mysql_store = require('express-mysql-session')(session);

var port = process.env.PORT || 8080;

var connection = mysql.createConnection({

  host     : 'localhost',
  port     : db_port,
  user     : 'root',
  password : pdub,
  database : 'test_db',
  socketPath: socketPath

});

var session_store = new mysql_store({}, connection);

var sessionMiddleware = session({
  secret: 'its a secret',
  store: session_store,
  resave: false,
  saveUninitialized: true
  //,
  //cookie: { secure: true }
})

//USE CONNECTION POOLING INSTEAD
connection.connect();

app.use(sessionMiddleware);

var io = require('socket.io')(httpServer, { pingTimeout: 60000 });

var shared_session = require("express-socket.io-session");

io.use(shared_session(sessionMiddleware, {
    autoSave:true
}));

var chatApp = require('./chat-app');

chatApp(io, connection);

//MAILGUN STUFF

var mailgun = require('mailgun-js');
var DOMAIN = 'mg.jarisk.com';

var mailgun = require('mailgun-js')({apiKey: mailgun_key, domain: DOMAIN});

var mailsend = require('./MailSender');

var pass_reset = require('./forgot_password_template');

app.post('/send-reset', function(req,res) {
  console.log(req.body.email);
  var u_email = req.body.email;
  var safe_params = [];
  safe_params.push(u_email);
  
  var query = 'SELECT `id` FROM `usr_test` WHERE `email` = ?';

  connection.query(query, safe_params, function(error, results, fields) {
    if (error) {
      console.log('mysql error in server.js');
      throw error;
    }

    if (results.length == 0) {
      console.log('empty results');
      res.send('e');
    }
    else {
      var usr_id = results[0].id;
      var rand_id = uuid4();
      var safe = [];
      var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
      safe.push(rand_id, usr_id, date);
      var sql = 'INSERT INTO `reset_link` (`key`, `usr_id`, `created_on_dt`) values (?,?,?)';

      connection.query(sql, safe, function(error, results, fields) { 
        if (error) {
          console.log('mysql error in server.js');
          throw error;
        }

        if (results.length == 0) {
          console.log('miss');
        }

        else {
          console.log(results);
          var html = pass_reset(rand_id);
          mailsend(mailgun, html, u_email);
        }

      });

      res.send('Ok');
    }
  });
});

app.get('/confirm-password/:reskey', function(req,res) {
  var reset_key = req.params.reskey;

  console.log(reset_key);
  res.send(req.params.reskey);
  //send to new password screen
  //check if expired
  //check if last entry in DB
  //var sql = `UPDATE usr INNER JOIN reset_link ON usr.id = reset_link.usr_id SET usr.pwrd = PASSWORD(:pwrd) WHERE reset_link.key = :key AND usr.eml_addr = :eml_addr`;
});

app.post('/pass-reset', function(req,res) {
  var reset_id = req.body.id;
  var pass = req.body.password;

  var hash = bcrypt.hashSync(pass);

  var sql = `UPDATE usr_test INNER JOIN reset_link ON usr_test.id = reset_link.usr_id SET usr_test.password = '` + hash + `' WHERE reset_link.key = '` + reset_id + `'`;

  connection.query(sql, function(error, results, fields) { 
  if (error) {
    console.log('mysql error in server.js');
    throw error;
  }

  if (results.length == 0) {
    console.log('miss');
  }

  else {
    console.log(results);
  }

});

  res.sendStatus(200);
});

/*app.get('/testmailreset', function(req,res) {

  var html = pass_reset('longstring');

  var addr = 'joeyrsk@gmail.com';//req.body.email;

  mailsend(mailgun, html, addr);

  res.sendStatus(200);
});*/

app.use('/public', express.static(path.join(__dirname, './public')));

app.use('/dist', express.static(path.join(__dirname, './dist')));

app.use('/favicon.ico', function(req,res) {
  res.sendFile(__dirname + '/public/img/favicon.ico');
});

app.use('/chat-old', function(req,res) {
  res.sendFile(__dirname + '/views/chat.html');
});

app.use('/secure', function(req,res) {
  res.sendStatus(200);
});

app.post('/skoolia', function(req,res) {
  res.send('edit profile page');
});

app.post('/save-edit', upload.single('myfile'), function(req,res) {

  var user = req.body;

  var img = typeof req.file == 'undefined' ? req.body.myfile : '/'+req.file.path;

  var usr_email = user.orig_email;
  var file_path = img;
  var new_email = user.email;
  var about_me = user.about_me;
  var first_name = user.first_name;
  var last_name = user.last_name;
  var phone = '';
  var profession = user.profession_raw;//user.profession;
  var lang = user.lang_teach;
  //lang is null bug
  if (isNaN(lang)) {
    lang = 0;
  }
  console.log(lang);
  
  var safe_params = [];
  safe_params.push(new_email,new_email,file_path,first_name,last_name,profession,about_me,lang,usr_email);

  var sql = `UPDATE usr_test SET email=?, username=?, img_url=?, first_name=?, last_name=?, profession=?, about_me=?, lang_teach=? WHERE email=?`;

  connection.query(sql, safe_params, function(error, results, fields) { 
    if (error) {
      console.log('mysql error in server.js');
      throw error;
    }

    if (results.length == 0) {
      console.log('miss');
      res.sendStatus(404);
    }

    else {

      var lang_file = JSON.parse(fs.readFileSync(__dirname + '/public/tmp/langs.json', 'utf-8'));

      var lang_str = '';
      lang_file.forEach( function(obj) {
        if (obj.id == lang) {
           lang_str = obj.name
        }
      })

        if (profession == 0) {
          pro_str = 'Teacher';
        }
        else if (profession == 1) {
          pro_str = 'Learner';
        }
        else { //2=both
          pro_str = '';
        }
      
      var user_global = {
        email: new_email,
        username: new_email,
        first_name: first_name, 
        last_name: last_name,
        img_url: img,
        about_me: about_me,
        id: req.session.user.id,
        phone: phone,
        profession_raw: profession,
        profession: pro_str,
        lang: lang_str,
        lang_teach: lang
      };

      req.session.user = user_global;

      res.sendStatus(200);
    }
  
  });
});

app.post('/file-upload', upload.single('myfile'), function(req,res) {
  console.log(req.file.path);

  var usr_email = req.body.user;
  var file_path = '/'+req.file.path;

  res.send(file_path);
});

app.get('/testsql', function(req,res) {
  //var user_id = req.params.id;
  //var query = `SELECT * from usr_test WHERE id='`+user_id+`'`;
  
  var query = `SELECT u.id, u.first_name, u.last_name, u.profession, u.img_url, u.about_me, l.lang_id ON usr_test u LEFT JOIN lang_teach l ON u.id = l.usr_id`;

  connection.query(query, function(error, results, fields) {

    if (error) {
      throw error;
    }

    console.log(results);
    console.log(fields);
  });
});

function get_langs(callback) {

    var query = `SELECT * from languages`;
    var lang_arr = [];
    
    connection.query(query, function(error, results, fields) {
      if (error) {
        console.log('mysql error in server.js lang query');
        throw error;
      }

      if (results.length == 0) {
        console.log('lang return err');
      }

      else {

        //should be none val in table
        lang_zero = {};
        lang_zero.id = 0;
        lang_zero.name = "";
        lang_arr.push(lang_zero);

        for (let result of results) {
          lang_obj = {};
          lang_obj.id = result.id;
          lang_obj.name = result.name;

          lang_arr.push(lang_obj);
        }

        callback(lang_arr);
      }
    })
}

function session_raw(data) {

  var about_me = data.about_me;

  var about_me_fix = about_me.replace("\\\'", "'");

  var user_global = {
    id: data.id,
    email: data.email,
    username: data.username,
    first_name: data.first_name, 
    last_name: data.last_name,
    img_url: data.img_url,
    about_me: about_me_fix,
    phone: data.phone,
    profession: data.profession,
    lang: data.lang_teach
  }
  return user_global;
}

function session_global(data) {
  var prof = data.profession;

  var pro_str = '';

  if (prof == 0) {
    pro_str = 'Teacher';
  }
  else if (prof == 1) {
    pro_str = 'Learner';
  }
  else { //2=both
    pro_str = '';
  }

  var about_me = data.about_me;

  var about_me_fix = about_me.replace(/\\'/g, "'");

  var lang = data.lang_teach;

  var lang_file = JSON.parse(fs.readFileSync(__dirname + '/public/tmp/langs.json', 'utf-8'));

  var lang_str = '';

  lang_file.forEach( function(obj) {
    if (obj.id == lang) {
       lang_str = obj.name
    }
  });

  var user_global = {
    id: data.id,
    email: data.email,
    username: data.username,
    first_name: data.first_name, 
    last_name: data.last_name,
    img_url: data.img_url,
    about_me: about_me_fix,
    phone: data.phone,
    profession: pro_str,
    profession_raw: prof,
    lang: lang_str,
    lang_teach: lang
  }
  return user_global;
}

function get_lang(data, callback) {

  console.log(data);

    var query = `SELECT * from languages where id='`+ data + `'`;
    var lang_arr = [];
    
    connection.query(query, function(error, results, fields) {
      if (error) {
        console.log('mysql error in server.js lang query');
        throw error;
      }

      if (results.length == 0) {
        console.log('lang return err');
      }

      else {
        var lang_obj;

        lang_obj.id = results[0].id;
        lang_obj.name = results[0].name;

        callback(lang_obj);
      }
    })
}

/*get_langs(function(cb) {
  fs.writeFileSync(__dirname + '/public/tmp/langs.json', JSON.stringify(cb));
});*/

/*
app.get('/lang-test/:id', function(req,res) {
  var data = req.params.id;
  get_lang(data, function(callbacker) {
    res.send(callbacker);
  });
});
*/

app.get('/api/users/:id', function(req,res) {

    var user_id = req.params.id;
    console.log(typeof user_id);
    var query = `SELECT * from usr_test WHERE id='`+user_id+`'`;
    
    connection.query(query, function(error, results, fields) {
      if (error) {
        console.log('mysql error in server.js');
        throw error;
        res.sendStatus(500);
      }

      if (results.length == 0) {
        res.send({ email: 0 });
      }

      else {

        var user = session_global(results[0]);
        res.send(user);
      }
    })

});

app.get('/api/users', function(req,res) {

  //filter by student and teacher

    var query = `SELECT * from usr_test ORDER BY id`;
    
    connection.query(query, function(error, results, fields) {
      if (error) {
        console.log('mysql error in server.js');
        throw error;
        res.sendStatus(500);
      }

      if (results.length == 0) {
        res.send({ email: 0 });
      }

      else {
        users = [];

        for (let result of results) {
          var user = {};
          user.value = result.id;
          user.label = result.first_name;
          user.last_name = result.last_name;
          user.img_url = result.img_url;
          user.profession = result.profession;
          user.lang = result.lang_teach;
          users.push(user);
        }
        res.send(users);
      }
    })
});

app.get('/api/user-sess', function(req,res) {

  if (req.session.user) {
    res.send(req.session.user);
  }
  else {
    res.send({id: null});
  }

});

app.get('/profile-login', function(req,res) {
  if (req.session.user) {
    console.log('user already in sesh');
    res.redirect('/profile')
  }
  else {
    req.session.reset();
    res.send('login reset');
  }
});

app.get('/logout', function(req,res) {
  //not callable til logged in
  console.log('server js logout');
  
  if (typeof req.session.user == 'undefined') {
    console.log('dumb logout');
  }
  else {
    console.log(req.session.user.email);
  }

  req.session.user = {};
  res.sendStatus(200);
});

//where session is set first

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

          var user_global = session_global(user_res);
          req.session.user = user_global;
          
          res.send(req.session.user);

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
  var profession = req.body.teach_learn;
  var lang = req.body.lang_teach;
  var send = req.body.send_emails;
  var privacy = 0;//req.body.teach;
  //teach now privacy
  var learn = 0;//req.body.learn;
  //var both = req.body.teach_learn;
  var about_me = '';//req.body.about_me;
  var img_url = '/public/img/profile_default.png';

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

      var query = 'INSERT INTO usr_test (email, password, username, first_name, last_name, img_url, phone, profession, lang_teach, send_email, teach, learn, about_me) VALUES ( "' + email + '", "' + hash + '", "' + username + '", "' + first_name + '", "' + last_name + '", "' + img_url  + '", "' + phone + '", "' + profession + '", ' + lang + ', ' + send + ', ' + privacy + ', ' + learn + ', "' + about_me + '" )';
      //(type, first_nm,last_nm,eml_addr,pwrd,img_url,img_top,img_left,gender,date_of_birth,location_region,location_city,location_county,location_state,location_country,location_latitude,location_longitude,location_display,native_language,native_country,skype_username,gmail_username,created_on_dt,modified_on_dt, desc, learn, teach, currency, charge, lang_exch, profile_img, sparrow_customer_token, braintree_customer_id, tz_set, tz_last_used, currency_last_used)'
      connection.query(query, function(error, results, fields) {
      if (error) {
        throw error;
      }
      console.log(results.insertId);
      //make this a method
          var prof = profession;
          var profess = '';
          if (prof == 0) {
            profess = 'Teacher';
          }
          else if (prof == 1) {
            profess = 'Learner';
          }
          else {
            profess = 'Skoolia';
          }

          var lang_file = JSON.parse(fs.readFileSync(__dirname + '/public/tmp/langs.json', 'utf-8'));

          var lang_str = '';
          lang_file.forEach( function(obj) {
            if (obj.id == lang) {
               lang_str = obj.name
            }
          });

          var user_global = {
            email: email,
            username: email,
            first_name: first_name, 
            last_name: last_name,
            img_url: img_url,
            about_me: about_me,
            id: results.insertId,
            phone: phone,
            profession: profess,
            profession_raw: profession,
            lang: lang_str,
            lang_teach: lang
          };

          req.session.user = user_global;

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
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"/>
      <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-vue@2.0.0-rc.11/dist/bootstrap-vue.min.css"/>
      <link rel="shortcut icon" type="image/png" href="./dist/favicon.png"/>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
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
