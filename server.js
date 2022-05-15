const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const EventHubReader = require('./scripts/event-hub-reader.js');

const iotHubConnectionString = "HostName=modbus-tcp-iot.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=5ZCPyIUC7prmgWfQueBajDqSGtMUe6YZvwiiwYovB3A=";
if (!iotHubConnectionString) {
  console.error(`Environment variable IotHubConnectionString must be specified.`);
  
}
console.log(`Using IoT Hub connection string [${iotHubConnectionString}]`);

const eventHubConsumerGroup = "consumergroup1";

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


const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  ws.on('message', message => {
    // console.log("Client Message : " + message)

    if (JSON.parse(message).method == 'writeRegister') {
      console.log("WRITE REGISTER METHOD WORKING")

      console.log("Coming data is" + JSON.parse(message).sendRegisterId, JSON.parse(message).sendRegisterValue)

      sendRegisterId =  String(JSON.parse(message).sendRegisterId)
      sendRegisterValue = String(JSON.parse(message).sendRegisterValue)

      var Client = require('azure-iothub').Client;
      var Message = require('azure-iot-common').Message;

      var connectionString = "HostName=modbus-tcp-iot.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=5ZCPyIUC7prmgWfQueBajDqSGtMUe6YZvwiiwYovB3A=";
      var targetDevice = 'mypi';

      var serviceClient = Client.fromConnectionString(connectionString);

      serviceClient.open(function (err) {
        if (err) {
          console.error('Could not connect: ' + err.message);
        } else {
          console.log('Service client connected');
          var message = new Message(sendRegisterId+"," +sendRegisterValue);
          console.log('Sending message: ' + message.getData());
          serviceClient.send(targetDevice, message);
          console.log("Buraya geldi")
        }
      });


    }

  })
})


wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        console.log(`Broadcasting data ${data}`);
        client.send(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
};

server.listen(process.env.PORT || '3000', () => {
  console.log('Listening on %d.', server.address().port);
});

const eventHubReader = new EventHubReader(iotHubConnectionString, eventHubConsumerGroup);

(async () => {
  await eventHubReader.startReadMessage((message, date, deviceId) => {
    try {
      const payload = {
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


