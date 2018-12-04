var port = process.env.NODE_PORT;
var host = process.env.NODE_HOST;
var url = '/api/user-sess';

var url_env = host;

if (port == 8080) {
  url_env = host + ':' + port;
}

var test_url = url_env + url;