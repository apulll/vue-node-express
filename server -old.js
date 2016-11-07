var express = require('express');
var app     = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var RedisStore = require('connect-redis')(session);
var redis = require('redis')
var redis_client = redis.createClient('6379','192.168.1.80')
var Encryption = require('./encryption.js');
var encry = new Encryption();

var algorithm = 'bf-ecb'
var base64 = require("base64-node");

// var MCrypt = require('mcrypt').MCrypt;

var crypto = require('crypto');

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

redis_client.on("error", function (err) {
  console.log("Error " + err);
});

redis_client.on("connect", runSample);

function runSample() {
  // Set a value
  // redis_client.set("ccc", "Hello World", function (err, reply) {
  //   console.log(redis_client);
  // });
  // Get a value
  redis_client.get("laravel:accb3993561eeec14a26baadc207eb6cf85e7db4", function (err, reply) {
    console.log(reply);
  });
}

function pad(text) {
  pad_bytes = 8 - (text.length % 8)
  for (var x=1; x<=pad_bytes;x++)
    text = text + String.fromCharCode(0)
  return text;
}
function encrypt(data, key) {
  var cipher = crypto.createCipheriv(algorithm, Buffer(key), '');
  cipher.setAutoPadding(false);
  try {
    return Buffer(cipher.update(pad(data), 'utf8', 'binary') + cipher.final('binary'), 'binary').toString('base64');
  } catch (e) {
    return null;
  }
}
function decrypt(data, key) {
	var decipher = crypto.createDecipheriv(algorithm,key,'');
	console.log(decipher)
	decipher.setAutoPadding(false);
	try {
    return (decipher.update(Buffer(data, 'base64').toString('binary'), 'binary', 'utf8')+ decipher.final('utf8')).replace(/\x00+$/g, '');
  } catch (e) {
    return null;
  }
}

app.get('/update',function(req,res){
	res.send('update')
})
app.get('/',function(req,res){
	// var key = "S84C9S36yuigfdMltMCI8RB1W3pUlqLG";
	// // var text = {'access_token':'fdsfdf'};
	// var encrypted = '';
	// // console.log("Encrypted text: "+encrypted);
	// encrypted = 'eyJpdiI6IllcL0hIdzVwT0o2WWZBSE53b2FQRXp3PT0iLCJ2YWx1ZSI6Iks1aE0rVFlMWUI4MjM3ODlLcXhBMVRTREZuMHRWb3YzbitmZGRDOVRvSDBnWEREcG1rTk9FR0VvRlBiZDRrWXJicE1UVW50MFFsVml0eXBDcVlXMERRPT0iLCJtYWMiOiJiY2NlOTEzYTBjNWJhZjk1MGFhN2IzODg0NjZlNmJjMWEwODg0NjMzYTY3M2U4OWIyMjJmYWUzOGM0ZmFlMWY5In0='
	// // console.log(JSON.parse(base64.decode(encrypted)));
	// // $payload = json_decode(base64_decode($payload), true);
	// var decrypted = encry.decrypt(encrypted, key);
	// console.log("Decrypted text: "+decrypted);

	/*****/

// 	var desEcb = new MCrypt('rijndael-128', 'cbc');
// 	// desEcb.validateIvSize(false);
// 	desEcb.getIvSize()
// 	console.log(desEcb.getIvSize())
// 	desEcb.open('8RIS6YxEsy62PanMfqnqzBLCSVc4Nj5b','Lbf8TfO9n1RZpyiPLXLKBQ=='); // we are set the key
//
// var ciphertext = desEcb.decrypt(base64.decode('Mpz2KM9zKXR9ZoTZiA6O\/+BWDfXRPKE3Ho3p1QilXIxUzKm\/nBThSK+uxguo5ezHK\/0Qfg9xq0n7NzCyiVi8Lw=='));
// console.log(ciphertext.toString('binary'));
 /*****/

/***/
/**
 * 加密方法
 * @param key 加密key
 * @param iv       向量
 * @param data     需要加密的数据
 * @returns string
 */
// var encrypt = function (key, iv, data) {
//     var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
//     var crypted = cipher.update(data, 'utf8', 'binary');
//
//     crypted += cipher.final('binary');
//     crypted = new Buffer(crypted, 'binary').toString('base64');
//     return crypted;
// };

/**
 * 解密方法
 * @param key      解密的key
 * @param iv       向量
 * @param crypted  密文
 * @returns string
 */
// var decrypt = function (key, iv, crypted) {
//     crypted = new Buffer(crypted, 'base64').toString('binary');
//     var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
// 		decipher.setAutoPadding(false);
//     var decoded = decipher.update(crypted, 'binary', 'utf8');
//     decoded += decipher.final('utf8');
//     return decoded;
// };

// var key = '8RIS6YxEsy62PanMfqnqzBLCSVc4Nj5b';
// console.log('加密的key:', key.toString('hex'));
// var iv = new Buffer('r+r9FwnhtwEF+5QPJICdgg==', 'base64');
// console.log(iv.length)
// console.log('加密的iv:', iv);
// var data = "Test String";
// console.log("需要加密的数据:", data);
// var crypted = encrypt(key, iv, data);
// console.log("数据加密后:", crypted);
// var crypedddd = 'ExjOhUwv6Hxe+oQ+NZeAWeWHlnN8Th7pH2f56xUWLBuBuTv3l4wOfeJ0rOQwSUiTfOrYhvd67r3O1yWZB/kGQA==';
// var dec = decrypt(key, iv, crypedddd);
// console.log("数据解密后:", JSON.stringify(dec).replace(/\u0010+$/g, ''));

// console.log(base64.decode('2fbwW9+8vPId2/foafZq6Q=='))
/***/

 var encrypted = 'eyJpdiI6InIrcjlGd25odHdFRis1UVBKSUNkZ2c9PSIsInZhbHVlIjoiRXhqT2hVd3Y2SHhlK29RK05aZUFXZVdIbG5OOFRoN3BIMmY1NnhVV0xCdUJ1VHYzbDR3T2ZlSjByT1F3U1VpVGZPcllodmQ2N3IzTzF5V1pCXC9rR1FBPT0iLCJtYWMiOiI0ODQwMWJhZjEyMDlhNTg2ZTFiMTEzMzkwYjU5NGE0YWEzZjNiZWJlYTBlODU1NzcyNDA2NDlkNDMxNzJlMjk5In0=';

 var decrypted = encry.decrypt(encrypted, key);

	res.send(JSON.stringify(decrypted, null, '  '));
	// res.send('hello world')
})


app.listen(3000,function(){
	console.log('node watch port 3000')
})
