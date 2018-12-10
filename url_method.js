module.exports = url_sesh;

function url_sesh() { 
	var port = process.env.NODE_PORT;
	var host = process.env.NODE_HOST;
	var url = '/api/user-sess';

	var url_env = host;

	if (port == 8080) {
		url_env = host + ':' + port;
	}

	url_arr = [];

	url_arr['url_env'] = url_env;
	url_arr['url'] = url;

	return url_arr;
}