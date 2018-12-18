var axios = require('axios');

module.exports = axios_b;

function axios_b() { 
	var port = process.env.NODE_PORT;
	var host = process.env.NODE_HOST;

	var url_env = host;

	if (port == 8080) {
		url_env = host + ':' + port;
	}

	var instance = axios.create({baseURL: url_env })

	return instance;
}