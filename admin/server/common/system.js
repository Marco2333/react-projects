let os = require('os');

module.exports.getClientIP = function(req) {
	return req.headers['x-forwarded-for'] ||
	req.connection.remoteAddress ||
	req.socket.remoteAddress ||
	req.connection.socket.remoteAddress;
};


module.exports.getServerIP = function() {
	let interfaces = os.networkInterfaces();  
    for(let devName in interfaces){  
          let dn = interfaces[devName];  
          for(let i=0;i < dn.length;i++){  
               let alias = dn[i];  
               if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                     return alias.address;  
               }  
          }  
    }     
}