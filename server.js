var config = require('./config/config_basic.js');
var unserialize = require('locutus/php/var/unserialize');
var express = require('express');
var app     = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var RedisStore = require('connect-redis')(session);
var redis = require('redis')
var redis_client = redis.createClient(config.REDIS_PORT,config.REDIS_HOST)
var Encryption = require('./encryption.js');
var encry = new Encryption();
var base64 = require("base64-node");


app.use(express.static(__dirname));
app.use(cookieParser())
app.use(session({
	saveUninitialized: false,
	resave: true,
	cookie: {
		secure: false,
		httpOnly: false,
		domain: 'http://127.0.0.1:6379/',
		maxAge:30 * (24 * 60 * 60 * 1000)
	},
	name: 'testCookie',
	secret: 'someHugeSecret'
}))


function connectRedis(req,res,mila_session,callback) {
	console.log(mila_session,'mila_session')
		// console.log(value)
		// var value = "laravel:";
		// value += getDecrypted(mila_session);

	  redis_client.get('mykey', function (err, reply) {
			if(err) {
          // if there is error, stop right away.
          // This will stop the async code execution and goes to last function.
				callback(null);
			} else {

				// res.cookies.login_info = reply
				callback(reply);
			}
	    // return unserialize(unserialize(reply))
	  });
		// console.log(mila_session,'mila_session')
}
// redis_client.on("error", function (err) {
//   console.log("Error " + err);
// });
//
// redis_client.on("connect", runSample);

function runSample() {
  // Set a value
  // redis_client.set("ccc", "Hello World", function (err, reply) {
  //   console.log(redis_client);
  // });
  // Get a value
	var value = "laravel:";
	value += getDecrypted();
  redis_client.get(value, function (err, reply) {
    return unserialize(unserialize(reply))
  });
}

function getDecrypted(mila_session) {
		var encrypted = mila_session;
	  var decrypted = encry.decrypt(encrypted, config.KEY);
		console.log('fdaf',unserialize(decrypted))
		return unserialize(decrypted)
}



app.get('/update',function(req,res){
	console.log(req.session)
	res.send(app.locals)
})
app.get('/',function(req,res){
	var mila_session = req.cookies.mila_session;
  	connectRedis(req,res,mila_session,function(response){
  		app.locals.login_info = response
  		// req.session.login_info = response
  		res.send(req.session);
  	})
	// res.send('hello world')
})


app.listen(config.PORT,function(){
	console.log('node watch port 3000')
})
