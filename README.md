# wifinder 

WiFinder automatically connects your Espruino to one of your predefined networks.

## Installation

### Option 1
1. Navigate to the Modules folder of your ESPRUINO WEB IDE
2. npm install wifinder
3. move the WiFinder.js to the Modules root folder

### Option 2 (recomended)
1. Enable 'Load modules from NPM' inside the ESPRUINO WEB IDE (Settings > Communications)

## Usage

```javascript
var WiFinder = require('WiFinder');
var wifis = [{ ssid : 'net1', pwd : 'netOne' },
             { ssid : 'net2', pwd : 'netTwo' }];
			 
WiFinder(wifis, function(err, theConnectedAp){
	... do something after connected or error
});
```

## Dependencies

http

## License

MIT
