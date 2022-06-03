const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const EventHubReader = require('./scripts/event-hub-reader.js');

const iotHubConnectionString = "HostName=modbus-web-iot-hub.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=JHSImIa3wXsTRGSh9gg+URLhWRLR/HBhU9xebSVcSHo=";
if (!iotHubConnectionString) {
  console.error(`Environment variable IotHubConnectionString must be specified.`);
  
}
console.log(`Using IoT Hub connection string [${iotHubConnectionString}]`);

const eventHubConsumerGroup = "consumergroup2";

console.log(eventHubConsumerGroup);
if (!eventHubConsumerGroup) {
  console.error(`Environment variable EventHubConsumerGroup must be specified.`);
}
console.log(`Using event hub consumer group [${eventHubConsumerGroup}]`);

// Redirect requests to the public subdirectory to the root
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res /* , next */) => {
  res.redirect('/');
});

let server = http.createServer(app);
let wss = new WebSocket.Server({ server });

const eventHubReader = new EventHubReader(iotHubConnectionString, eventHubConsumerGroup);

(async () => {
  await eventHubReader.startReadMessage((message, date, deviceId) => {
    try {
      const payload = {
        Type : message[0].type,
        IotData: message,
        MessageDate: date || Date.now().toISOString(),
        DeviceId: deviceId,
      };

      wss.broadcast(JSON.stringify(payload));
    } catch (err) {
      console.error('Error broadcasting: [%s] from [%s].', err, message);
    }
  });
})().catch();


wss.on('connection', ws => {
  ws.on('message', message => {
    console.log("Client Message : " + message)

    if ( JSON.parse(message).method == 'changeDeviceIp' ) {

      var Client2 = require('azure-iothub').Client;
      var Message2 = require('azure-iot-common').Message;

      var connectionString = "HostName=modbus-web-iot-hub.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=JHSImIa3wXsTRGSh9gg+URLhWRLR/HBhU9xebSVcSHo=";
      var targetDevice = 'myPi';

      var serviceClient2 = Client2.fromConnectionString(connectionString);

      serviceClient2.open(function (err) {
        if (err) {
          console.error('Could not connect: ' + err.message);
        } else {
          console.log('Service client connected');
          let deviceIpComesFromClient = String(JSON.parse(message).deviceIp)
          var message2 = new Message2("changeDeviceIp" + "," + deviceIpComesFromClient)
          console.log('Sending message: ' + message2.getData());
          serviceClient2.send(targetDevice, message2);
          console.log("Buraya geldi writeRegister")
        }
      });

      console.log("Buraya geldi changeDeviceIp")

    }

    if (JSON.parse(message).method == 'writeRegister' ) {
      console.log("WRITE REGISTER METHOD WORKING")

      console.log("Coming data is" + JSON.parse(message).sendRegisterId, JSON.parse(message).sendRegisterValue)

      sendRegisterId =  String(JSON.parse(message).sendRegisterId)
      sendRegisterValue = String(JSON.parse(message).sendRegisterValue)

      var Client = require('azure-iothub').Client;
      var Message = require('azure-iot-common').Message;

      var connectionString = "HostName=modbus-web-iot-hub.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=JHSImIa3wXsTRGSh9gg+URLhWRLR/HBhU9xebSVcSHo=";
      var targetDevice = 'myPi';

      var serviceClient = Client.fromConnectionString(connectionString);

      serviceClient.open(function (err) {
        if (err) {
          console.error('Could not connect: ' + err.message);
        } else {
          console.log('Service client connected');
          var message = new Message("changeRegisterValue"+","+sendRegisterId+"," +sendRegisterValue);
          console.log('Sending message: ' + message.getData());
          serviceClient.send(targetDevice, message);
          console.log("Buraya geldi writeRegister")
        }
      });

    }

    // if(JSON.parse(message).method == 'stopCommunication') {

    //   console.log("Stop Methodu")


    //   // eventHubReader.stopReadMessage()

    // }

  })
})


wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        //console.log(`Broadcasting data ${data}`);
        client.send(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
};

server.listen(process.env.PORT || '3030', () => {
  console.log('Listening on %d.', server.address().port);
});




