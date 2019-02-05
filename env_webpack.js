const env = process.env;

const isProduction = env.production === true

  var HOST = 'http://jarisk.com'
  var PORT = 80;
  var ENV = 'prod'

  console.log(isProduction);

  if (!isProduction) {
    HOST = 'http://localhost'
    PORT = 8080
    ENV = 'local'
  }

  return {HOST,PORT,ENV}
}