var crypto = require('crypto');
var algorithm = "aes-256-cbc";
var base64 = require("base64-node");

function pad(text) {
  pad_bytes = 8 - (text.length % 8)
  for (var x=1; x<=pad_bytes;x++)
    text = text + String.fromCharCode(0)
  return text;
}

function Encryption() {
  self = this;
  self.encrypt = function(data, key) {
    var cipher = {};
    var playloader = {};
    playloader = JSON.parse(base64.decode(data));
    console.log(playloader)
    cipher.iv = new Buffer(playloader.iv, 'base64');
    cipher.value = new Buffer(playloader.value, 'base64').toString('binary');



    var cipher = crypto.createCipheriv(algorithm, key, iv);
    var crypted = cipher.update(data, 'utf8', 'binary');

    crypted += cipher.final('binary');
    crypted = new Buffer(crypted, 'binary').toString('base64');
    return crypted;
  }

  self.decrypt = function(data, key) {
    //解密函数
    var cipher = {};
    var playloader = {};
    playloader = JSON.parse(base64.decode(data));
    console.log(playloader)
    cipher.iv = new Buffer(playloader.iv, 'base64');
    cipher.value = new Buffer(playloader.value, 'base64').toString('binary');

    var decipher = crypto.createDecipheriv(algorithm, key, cipher.iv);
		decipher.setAutoPadding(false);
    var decoded = decipher.update(cipher.value, 'binary', 'utf8');
    decoded += decipher.final('utf8');
    // return decoded.replace(/\u0010+$/g, '');

    try {
      return decoded.replace(/\u0010+$/g, '');
    }catch (e) {

      return null;
    }
    // var decipher = crypto.createDecipheriv(algorithm, key, cipher.iv);
		// decipher.setAutoPadding(false);
    // try {
    //
    //   return (decipher.update(Buffer(cipher.value, 'base64').toString('binary'), 'binary', 'utf8')+ decipher.final('utf8')).replace(/\x00+$/g, '');
    // } catch (e) {
    //   return null;
    // }
    // var cipher = {};
    // cipher.key = '8RIS6YxEsy62PanMfqnqzBLCSVc4Nj5b';
    // cipher.cipher = 'rijndael-128';
    // cipher.iv = 'Lbf8TfO9n1RZpyiPLXLKBQ==';
    // cipher.mode = "cbc",
    // cipher.ivSize= 16;
    // cipher.message = 'Mpz2KM9zKXR9ZoTZiA6O\/+BWDfXRPKE3Ho3p1QilXIxUzKm\/nBThSK+uxguo5ezHK\/0Qfg9xq0n7NzCyiVi8Lw==';

    //  var key = [].slice.call(base64.toByteArray(cipher.key));


    //  var iv = [].slice.call(base64.toByteArray(cipher.iv));
    //  var message = [].slice.call(base64.toByteArray(cipher.message));
    //  var clearText = String.fromCharCode.apply(this, mcrypt.decrypt(message, iv, cipher.key, cipher.cipher, cipher.mode));
    //  console.log(clearText)
     //
     //
    //  clearByteArray = mcrypt.decrypt('encryptedMessage', iv, key,cipher.cipher, cipher.mode);
     //
    //  var addText = String.fromCharCode.apply(this, clearByteArray);
    //  console.log(base64node.decode(base64node.encode(addText)))

    // var payload1 = JSON.parse(base64.decode(data));
    // var iv = payload1.iv;

    // var key = key;
    // var iv = base64.decode(payload1.iv);
    // var message = base64.decode(payload1.value);
    // var clearText = mcrypt.decrypt(message, iv, key, 'rijndael-128','cbc');
    // console.log(clearText)
    // var payload1 = JSON.parse(base64.decode(data));
    // var iv = payload1.iv;
    // var payload = data
    // var rijndael = new rijndael(key, {
    //     mode: rijndael.MCRYPT_MODE_CBC,
    //     encoding: 'hex', // shared_key encoding
    //     iv: iv
    //   });
    //   payload = rijndael.decrypt(payload);
    //   payload = payload.replace(/\0+$/, '');
    //   console.log(payload)
    // var plaintext = rijndael.decrypt(data, key, iv)
    // var payload = JSON.parse(base64.decode(data));
    // console.log(Buffer(base64.decode(payload.iv)))
    // var iv = new Buffer(payload.iv, 'base64');
    // var shared_key_b = new Buffer(key);
    // var decipher = crypto.createDecipheriv(algorithm, base64node.decode(cipher.key, base64node.decode(cipher.iv));
    // console.log(decipher)
    // decipher.update(Buffer(data, 'base64').toString('binary'), 'binary', 'utf8')+ decipher.final('utf8')).replace(/\x00+$/g, '')
    // decipher.setAutoPadding(false);
    // console.log(decipher)
    // try {
    //   decoded = Buffer.concat([
    //   decipher.update(payload, 'base64'),
    //   decipher.final()
    // ]);
    //   // return (decipher.update(Buffer(data, 'base64').toString('binary'), 'binary', 'utf8')+ decipher.final('utf8')).replace(/\x00+$/g, '');
    //   return decoded;
    // } catch (e) {
    //   return null;
    // }
  }

  self.decode = function(s) {
			s = s.replace(/\s|=/g, '');
			var cur,
				prev,
				mod,
				i = 0,
				result = [];

			while (i < s.length) {
				cur = base64hash.indexOf(s.charAt(i));
				mod = i % 4;

				switch (mod) {
					case 0:
						//TODO
						break;
					case 1:
						result.push(String.fromCharCode(prev << 2 | cur >> 4));
						break;
					case 2:
						result.push(String.fromCharCode((prev & 0x0f) << 4 | cur >> 2));
						break;
					case 3:
						result.push(String.fromCharCode((prev & 3) << 6 | cur));
						break;

				}

				prev = cur;
				i ++;
			}

			return result.join('');
  }
}

module.exports = Encryption;
