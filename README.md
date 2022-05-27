# Modbus Web App

This is an app for managing devices with modbus tcp/ip communication

## Device Manager

Device manager works in raspberry pi for managing devices which connected to shared network

![Device Manager](devicemanager.jpg)

This app directly connected to azure iot hub, thanks to this method we can get that register values and register addresses almost every second (it depends which clock you choosed). 

This program is a structure built on the following codes

**Sending messages to azure iot hub**
```python
def sendDatatoAzure(registerNumber, distance):

    clientAzure = IoTHubDeviceClient.create_from_connection_string(CONNECTION_STRING)

    client = ModbusClient(host="192.168.1.200", port = 502)

    client.open()

    data = client.read_holding_registers(registerNumber, distance)

    message = Message(data)

    clientAzure.send_message(str(message))
```
**Reading messages comes from azure iot hub**
```python
 def message_handler(message):

    a = str(message)

    list = a.split(",")

    newlist = []

    for i in list:

        newlist.append(int(re.search(r'\d+', i).group()))
    
    print(newlist)

    client = ModbusClient(host="192.168.1.200", port = 502)

    client.open()

    client.write_multiple_registers(newlist[0], [newlist[1]])
  
def getDatafromAzure():
    print ("Starting the Python IoT Hub C2D Messaging device sample...")

    # Instantiate the client
    clientAzure = IoTHubDeviceClient.create_from_connection_string(CONNECTION_STRING)

    print ("Waiting for C2D messages, press Ctrl-C to exit")
    try:
        # Attach the handler to the client
        clientAzure.on_message_received = message_handler

        while True:
            time.sleep(1000)
    except KeyboardInterrupt:
        print("IoT Hub C2D Messaging device sample stopped")
    finally:
        # Graceful exit
        print("Shutting down IoT Hub Client")
        clientAzure.shutdown()
 ```

### What purpose does device manager serve?
Device manager provide us to send the memory we want and its values ​​to the azure iot hub, we can do both read and write operations with this program. 


## Web Application
