var wifi = require("Wifi");
var nav;

function browser(myAps){
	var obj = {}, i=-1;
	obj.myAps = myAps;
	obj.scannedAps = [];
	obj.next = function(){
		for(++i; i<obj.scannedAps.length; i++){
			for(var j=0; j<obj.myAps.length; j++){
				if(obj.scannedAps[i].ssid === obj.myAps[j].ssid){
					console.log('Network [' + obj.myAps[j].ssid + '] in range');
					return obj.myAps[j];
				}
			}
		}
		return null;
	};
	return obj;
}

function connectToAp(selAp, callback){
	if(!selAp) {
		var error = 'I could\'nt find any paired Ap :(';
		console.log(error);
		return callback(error)
	}
	console.log('Trying to connect in [' + selAp.ssid + ']...');
	wifi.stopAP();
	wifi.connect(selAp.ssid, {password:selAp.pwd}, function(err){
		if(err){
			console.log('Error while connecting:\n'+err);
			return connectToAp(nav.next());
		}
		console.log('We got connected to [' + selAp.ssid + ']! \o/');
		console.log('Ip: ' + wifi.getIP().ip);
		callback(null, selAp);
	});
}
/**
 * myAps - Obj array { ssid : 'ssid', pwd : 'pwd' }
 * callback - fn to be called at the end of finding WiFi (or error)
 */
module.exports = function init(myAps, callback){
  nav = browser(myAps);
  wifi.scan(function(aps){
    console.log('Searching paired networks...');
    nav.scannedAps = aps;
    connectToAp(nav.next(), callback);
  });
}