// Use Noble package
var noble = require('noble'); 

//Start scanning
noble.on('stateChange', scan);

function scan(state){
  if (state === 'poweredOn') {
    noble.startScanning([], true);
    console.log("Started scanning");
  } else {
    noble.stopScanning();
    console.log("Not Powered On");
  }
}

// for every peripheral we discover, run this callback function
noble.on('discover', foundPeripheral);

function foundPeripheral(peripheral) {

  // If it is not the Mac Address of my device, return  
  if (peripheral.uuid != '582d34103845') return

  var serviceData = peripheral.advertisement.serviceData;
  if (serviceData && serviceData.length) {
    for (var i in serviceData) {
        /* All the information is in this Property called "FDCD" on the advertising data.
           The HEX string is as follows:
           "0807453810342d580104f500da02020145" (quotes included)
           To which:
           0807 or 0801: Ignore, but useful to identify relevant data
           453810342d58: MAC address, INVERTED (58:2d:34:10:38:45)
           0104f500da02: Data for Temperature and Humidity, broken as follows
             - 01: Indicates the Temperature and Humidity events
             - 04: Event data length (4, 2 bytes for Temperature, 2 bytes for Humidity)
             - f500: Temperature data inverted (00f5), which translates to 245, equivalent to 24.5C
             - da02: Humitity data inverted (02da), which translates to 730, equivalent to 73.0%
           020145: Data for Battery, bronek as follows
             - 02: Indicates the Battery events
             - 01: Event data length (1 byte)
             - 45: Battery data, which translates to 69, equivalent to 69%
        */
        if (JSON.stringify(serviceData[i].uuid).includes('fdcd')){
            stringAdvertise = JSON.stringify(serviceData[i].data.toString('hex'))
            temp = parseInt(stringAdvertise.substring(23, 25) + stringAdvertise.substring(21, 23), 16)
            console.log('Temp: ' + temp/10 + 'ºC')
            humidity = parseInt(stringAdvertise.substring(27, 29) + stringAdvertise.substring(25, 27), 16)
            console.log('Humidity: ' + humidity/10 + '%')
            battery = parseInt(stringAdvertise.substring(33, 35), 16)
            console.log('Battery: ' + battery + '%')
            console.log('')
        }
    }
  }
};