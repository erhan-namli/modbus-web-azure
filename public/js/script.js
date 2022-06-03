
$(document).ready(() => {

    // if deployed to a site supporting SSL, use wss://
    const protocol = document.location.protocol.startsWith('https') ? 'wss://' : 'ws://';
    const webSocket = new WebSocket(protocol + location.host);

    webSocket.onmessage = function onMessage(message) {

      try {

        connectionState = document.getElementById('deviceStatus')
        tcpipStatus = document.getElementById('tcpipStatus')

        const messageData = JSON.parse(message.data);

        console.log(messageData)

        console.log(messageData.Type)

        if(messageData.Type == "error"){

            connectionState.style.backgroundColor = 'green'
            connectionState.innerText = 'Device Connected'
        
            tcpipStatus.style.backgroundColor = "white"
            tcpipStatus.innerText = "TCP/IP Communication is not Provided"

            window.alert("Please check your device's IP!");

            console.log("TCP COMMUNICATION HATASI")

        }else if (messageData.Type == 'iotdata'){

            tcpipStatus.innerText = "TCP/IP Communication is provided"
            tcpipStatus.style.backgroundColor = "green"
 

            document.querySelector('.table').innerHTML= '';
            document.querySelector('.table').appendChild(makeTable(messageData.IotData))

        }

        connectionState.style.backgroundColor = 'green'
        connectionState.innerText = 'IoT Hub to Device Communication is provided'
    
        let dropwdownWRegisterButtons = document.querySelectorAll(".dropdown-item")

        dropwdownWRegisterButtons.forEach( button => {

          button.addEventListener('click', function(event) {
            
                let readOnlyInput = document.querySelector('#readOnlyInput')

                readOnlyInput.value = this.value
          })
        
        })
        
      } catch (err) {
        
        console.error(err);

      }
    };
  });


window.onload = function () {

  document.querySelector('.table').appendChild(makeTable(sample_json)) // Table maker function calling

  writeButton =  document.querySelector('#writeregisterbutton')

  connectButton = document.querySelector('#changeDeviceIp')

  connectButton.addEventListener('click', function() {

    console.log("Connect butonuna basılıd")

    webSocketSendDeviceIp()

  })


  writeButton.addEventListener('click', function() {

    console.log("Write Butonuna Basıldı")

    webSocketSendWriteRegisterData()

  })
  
}

var webSocketSendDeviceIp = function() {

    const protocol = document.location.protocol.startsWith('https') ? 'wss://' : 'ws://';
    const webSocket3 = new WebSocket(protocol + location.host)


    deviceIp = document.querySelector('#inputIpAdress').value

    console.log(deviceIp.toString())

    data = JSON.stringify( {
        method : 'changeDeviceIp',
        deviceIp : deviceIp
    })

    webSocket3.onopen = function() {

        webSocket3.send(data)

    }
    
}


var webSocketSendWriteRegisterData = function () {
 
  const protocol = document.location.protocol.startsWith('https') ? 'wss://' : 'ws://';
  const webSocket2 = new WebSocket(protocol + location.host)

  sendRegisterValue = document.querySelector('#writeRegisterValue').value

  sendRegisterId = document.querySelector("#readOnlyInput").value

  console.log("Veriler " + sendRegisterValue, sendRegisterId)

  data = JSON.stringify( {
    method : 'writeRegister',
    sendRegisterValue : sendRegisterValue,
    sendRegisterId : sendRegisterId
  })

  webSocket2.onopen = function() {

    webSocket2.send(data);

    }
 
  console.log(webSocket2)
}

function setRegisterIdtoReadOnlyInput(data){

  let readOnlyInput = document.querySelector('#readOnlyInput')

  readOnlyInput.innerHTML = data

}


//////     MAKE TABLE FUNCTIONS ////////

var sample_json = [
  {
      "Description": "Output frequency",
      "ParameterNo": "M1.1",
      "RegisterFunction": "Readable",
      "RegisterId": "1",
      "RegisterValue": null
  },
  {
      "Description": "Frequency reference",
      "ParameterNo": "M1.2",
      "RegisterFunction": "Readable",
      "RegisterId": "24",
      "RegisterValue": null
  },
  {
      "Description": "Motor speed",
      "ParameterNo": "M1.3",
      "RegisterFunction": "Readable",
      "RegisterId": "2",
      "RegisterValue": null
  },
  {
      "Description": "Motor current",
      "ParameterNo": "M1.4",
      "RegisterFunction": "Readable",
      "RegisterId": "3",
      "RegisterValue": null
  },
  {
      "Description": "Motor torque",
      "ParameterNo": "M1.5",
      "RegisterFunction": "Readable",
      "RegisterId": "4",
      "RegisterValue": null
  },
  {
      "Description": "Motor power",
      "ParameterNo": "M1.6",
      "RegisterFunction": "Readable",
      "RegisterId": "5",
      "RegisterValue": null
  },
  {
      "Description": "Motor voltage",
      "ParameterNo": "M1.7",
      "RegisterFunction": "Readable",
      "RegisterId": "6",
      "RegisterValue": null
  },
  {
      "Description": "DC-link voltage",
      "ParameterNo": "M1.8",
      "RegisterFunction": "Readable",
      "RegisterId": "7",
      "RegisterValue": null
  },
  {
      "Description": "Unit temperature",
      "ParameterNo": "M1.9",
      "RegisterFunction": "Readable",
      "RegisterId": "8",
      "RegisterValue": null
  },
  {
      "Description": "Motor temperature",
      "ParameterNo": "M1.10",
      "RegisterFunction": "Readable",
      "RegisterId": "9",
      "RegisterValue": null
  },
  {
      "Description": "Latest fault code",
      "ParameterNo": "M1.11",
      "RegisterFunction": "Readable",
      "RegisterId": "28",
      "RegisterValue": null
  },
  {
      "Description": "Instant motor power",
      "ParameterNo": "M1.12",
      "RegisterFunction": "Readable",
      "RegisterId": "1686",
      "RegisterValue": null
  },
  {
      "Description": "Analog input 1",
      "ParameterNo": "M2.1",
      "RegisterFunction": "Readable",
      "RegisterId": "10",
      "RegisterValue": null
  },
  {
      "Description": "Keypad pot voltage",
      "ParameterNo": "M2.2",
      "RegisterFunction": "Readable",
      "RegisterId": "1858",
      "RegisterValue": null
  },
  {
      "Description": "Analog output",
      "ParameterNo": "M2.3",
      "RegisterFunction": "Readable",
      "RegisterId": "25",
      "RegisterValue": null
  },
  {
      "Description": "DI1, DI2, DI3",
      "ParameterNo": "M2.4",
      "RegisterFunction": "Readable",
      "RegisterId": "12",
      "RegisterValue": null
  },
  {
      "Description": "DI4",
      "ParameterNo": "M2.5",
      "RegisterFunction": "Readable",
      "RegisterId": "13",
      "RegisterValue": null
  },
  {
      "Description": "RO1, RO2",
      "ParameterNo": "M2.8",
      "RegisterFunction": "Readable",
      "RegisterId": "557",
      "RegisterValue": null
  },
  {
      "Description": "Multi-monitoring",
      "ParameterNo": "M9.1",
      "RegisterFunction": "Readable",
      "RegisterId": "30",
      "RegisterValue": null
  },
  {
      "Description": "Keypad reference",
      "ParameterNo": "R11",
      "RegisterFunction": "Writable",
      "RegisterId": "141",
      "RegisterValue": null
  },
  {
      "Description": "Minimum frequency",
      "ParameterNo": "P1.1",
      "RegisterFunction": "Writable",
      "RegisterId": "101",
      "RegisterValue": null
  },
  {
      "Description": "Maximum frequency",
      "ParameterNo": "P1.2",
      "RegisterFunction": "Writable",
      "RegisterId": "102",
      "RegisterValue": null
  },
  {
      "Description": "Acceleration time 1",
      "ParameterNo": "P1.3",
      "RegisterFunction": "Writable",
      "RegisterId": "103",
      "RegisterValue": null
  },
  {
      "Description": "Deceleration time 1",
      "ParameterNo": "P1.4",
      "RegisterFunction": "Writable",
      "RegisterId": "104",
      "RegisterValue": null
  },
  {
      "Description": "Motor nominal current",
      "ParameterNo": "P1.6",
      "RegisterFunction": "Writable",
      "RegisterId": "486",
      "RegisterValue": null
  },
  {
      "Description": "Motor nominal speed",
      "ParameterNo": "P1.7",
      "RegisterFunction": "Writable",
      "RegisterId": "489",
      "RegisterValue": null
  },
  {
      "Description": "Motor power factor",
      "ParameterNo": "P1.8",
      "RegisterFunction": "Writable",
      "RegisterId": "490",
      "RegisterValue": null
  },
  {
      "Description": "Motor nominal voltage",
      "ParameterNo": "P1.9",
      "RegisterFunction": "Writable",
      "RegisterId": "487",
      "RegisterValue": null
  },
  {
      "Description": "Motor nominal frequency",
      "ParameterNo": "P1.10",
      "RegisterFunction": "Writable",
      "RegisterId": "488",
      "RegisterValue": null
  },
  {
      "Description": "Remote control place",
      "ParameterNo": "P1.13",
      "RegisterFunction": "Writable",
      "RegisterId": "135",
      "RegisterValue": null
  },
  {
      "Description": "Remote reference",
      "ParameterNo": "P1.14",
      "RegisterFunction": "Writable",
      "RegisterId": "137",
      "RegisterValue": null
  },
  {
      "Description": "Local control place",
      "ParameterNo": "P1.11",
      "RegisterFunction": "Writable",
      "RegisterId": "1695",
      "RegisterValue": null
  },
  {
      "Description": "Local reference",
      "ParameterNo": "P1.12",
      "RegisterFunction": "Writable",
      "RegisterId": "136",
      "RegisterValue": null
  },
  {
      "Description": "Serial communication",
      "ParameterNo": "P11.1.1",
      "RegisterFunction": "Writable",
      "RegisterId": "586",
      "RegisterValue": null
  },
  {
      "Description": "Slave address",
      "ParameterNo": "P11.2.1",
      "RegisterFunction": "Writable",
      "RegisterId": "587",
      "RegisterValue": null
  },
  {
      "Description": "Baud rate",
      "ParameterNo": "P11.2.2",
      "RegisterFunction": "Writable",
      "RegisterId": "584",
      "RegisterValue": null
  },
  {
      "Description": "Parity type",
      "ParameterNo": "P11.2.3",
      "RegisterFunction": "Writable",
      "RegisterId": "585",
      "RegisterValue": null
  },
  {
      "Description": "Modbus RTU protocol status",
      "ParameterNo": "P11.2.4",
      "RegisterFunction": "Writable",
      "RegisterId": "588",
      "RegisterValue": null
  },
  {
      "Description": "Communication timeout modbus RTU",
      "ParameterNo": "P11.2.5",
      "RegisterFunction": "Writable",
      "RegisterId": "593",
      "RegisterValue": null
  },
  {
      "Description": "Modbus RTU fault response",
      "ParameterNo": "P11.2.6",
      "RegisterFunction": "Writable",
      "RegisterId": "2516",
      "RegisterValue": null
  },
  {
      "Description": "Bluetooth enabled",
      "ParameterNo": "P11.6.1",
      "RegisterFunction": "Writable",
      "RegisterId": "1895",
      "RegisterValue": null
  },
  {
      "Description": "Bluetooth broadcast mode",
      "ParameterNo": "P11.6.2",
      "RegisterFunction": "Writable",
      "RegisterId": "2920",
      "RegisterValue": null
  },
  {
      "Description": "Bluetooth pairing reset",
      "ParameterNo": "P11.6.3",
      "RegisterFunction": "Writable",
      "RegisterId": "2935",
      "RegisterValue": null
  },
  {
      "Description": "IP address mode",
      "ParameterNo": "P12.1.1",
      "RegisterFunction": "Writable",
      "RegisterId": "1500",
      "RegisterValue": null
  },
  {
      "Description": "Active IP address",
      "ParameterNo": "P12.1.2",
      "RegisterFunction": "Writable",
      "RegisterId": "1507",
      "RegisterValue": null
  },
  {
      "Description": "Active subnet mask",
      "ParameterNo": "P12.1.3",
      "RegisterFunction": "Writable",
      "RegisterId": "1509",
      "RegisterValue": null
  },
  {
      "Description": "Active default gateway",
      "ParameterNo": "P12.1.4",
      "RegisterFunction": "Writable",
      "RegisterId": "1511",
      "RegisterValue": null
  },
  {
      "Description": "MAC address",
      "ParameterNo": "P12.1.5",
      "RegisterFunction": "Writable",
      "RegisterId": "1513",
      "RegisterValue": null
  },
  {
      "Description": "Static IP address",
      "ParameterNo": "P12.1.6",
      "RegisterFunction": "Writable",
      "RegisterId": "1501",
      "RegisterValue": null
  },
  {
      "Description": "Static subnet mask",
      "ParameterNo": "P12.1.7",
      "RegisterFunction": "Writable",
      "RegisterId": "1503",
      "RegisterValue": null
  },
  {
      "Description": "Static default gateway",
      "ParameterNo": "P12.1.8",
      "RegisterFunction": "Writable",
      "RegisterId": "1505",
      "RegisterValue": null
  },
  {
      "Description": "Ethernet communication timeout",
      "ParameterNo": "P12.1.9",
      "RegisterFunction": "Writable",
      "RegisterId": "611",
      "RegisterValue": null
  },
  {
      "Description": "Trusted IP white list",
      "ParameterNo": "P12.2.1",
      "RegisterFunction": "Writable",
      "RegisterId": "68",
      "RegisterValue": null
  },
  {
      "Description": "Trusted IP filter enable",
      "ParameterNo": "P12.2.2",
      "RegisterFunction": "Writable",
      "RegisterId": "76",
      "RegisterValue": null
  },
  {
      "Description": "Modbus TCP enable",
      "ParameterNo": "P12.3.1",
      "RegisterFunction": "Writable",
      "RegisterId": "1942",
      "RegisterValue": null
  },
  {
      "Description": "Modbus TCP connection limit",
      "ParameterNo": "P12.3.2",
      "RegisterFunction": "Writable",
      "RegisterId": "609",
      "RegisterValue": null
  },
  {
      "Description": "Modbus TCP unit identifier number",
      "ParameterNo": "P12.3.3",
      "RegisterFunction": "Writable",
      "RegisterId": "610",
      "RegisterValue": null
  },
  {
      "Description": "Modbus TCP protocol status",
      "ParameterNo": "P12.3.4",
      "RegisterFunction": "Writable",
      "RegisterId": "612",
      "RegisterValue": null
  },
  {
      "Description": "Modbus TCP fault response",
      "ParameterNo": "P12.3.5",
      "RegisterFunction": "Writable",
      "RegisterId": "2517",
      "RegisterValue": null
  },
  {
      "Description": "Web UI protocol status",
      "ParameterNo": "P12.6.1",
      "RegisterFunction": "Writable",
      "RegisterId": "2915",
      "RegisterValue": null
  },
  {
      "Description": "Web UI fault response",
      "ParameterNo": "P12.6.2",
      "RegisterFunction": "Writable",
      "RegisterId": "2916",
      "RegisterValue": null
  },
  {
      "Description": "Web UI communication timeout",
      "ParameterNo": "P12.6.3",
      "RegisterFunction": "Writable",
      "RegisterId": "2919",
      "RegisterValue": null
  },
  {
      "Description": "Web UI enable",
      "ParameterNo": "P12.6.4",
      "RegisterFunction": "Writable",
      "RegisterId": "2921",
      "RegisterValue": null
  },
  {
      "Description": "Language",
      "ParameterNo": "P13.1.1",
      "RegisterFunction": "Writable",
      "RegisterId": "340",
      "RegisterValue": null
  },
  {
      "Description": "Application",
      "ParameterNo": "P13.1.2",
      "RegisterFunction": "Writable",
      "RegisterId": "142",
      "RegisterValue": null
  },
  {
      "Description": "Parameter sets",
      "ParameterNo": "P13.1.3",
      "RegisterFunction": "Writable",
      "RegisterId": "619",
      "RegisterValue": null
  },
  {
      "Description": "Up to keypad (for remote keypad only)",
      "ParameterNo": "P13.1.4",
      "RegisterFunction": "Writable",
      "RegisterId": "620",
      "RegisterValue": null
  },
  {
      "Description": "Down from keypad (for remote keypad only)",
      "ParameterNo": "P13.1.5",
      "RegisterFunction": "Writable",
      "RegisterId": "621",
      "RegisterValue": null
  },
  {
      "Description": "Parameter comparison (for remote keypad only)",
      "ParameterNo": "P13.1.6",
      "RegisterFunction": "Writable",
      "RegisterId": "623",
      "RegisterValue": null
  },
  {
      "Description": "Fan control",
      "ParameterNo": "P13.2.7",
      "RegisterFunction": "Writable",
      "RegisterId": "632",
      "RegisterValue": null
  },
  {
      "Description": "Keypad software version",
      "ParameterNo": "P13.4.1",
      "RegisterFunction": "Readable",
      "RegisterId": "640",
      "RegisterValue": null
  },
  {
      "Description": "Motor control software version",
      "ParameterNo": "P13.4.2",
      "RegisterFunction": "Readable",
      "RegisterId": "642",
      "RegisterValue": null
  },
  {
      "Description": "Application software version",
      "ParameterNo": "P13.4.3",
      "RegisterFunction": "Readable",
      "RegisterId": "644",
      "RegisterValue": null
  },
  {
      "Description": "Software bundle version",
      "ParameterNo": "P13.4.4",
      "RegisterFunction": "Readable",
      "RegisterId": "1714",
      "RegisterValue": null
  },
  {
      "Description": "Serial number",
      "ParameterNo": "P13.5.1",
      "RegisterFunction": "Readable",
      "RegisterId": "648",
      "RegisterValue": null
  },
  {
      "Description": "Multi-monitor set (for remote keypad only)",
      "ParameterNo": "P13.5.2",
      "RegisterFunction": "Writable",
      "RegisterId": "627",
      "RegisterValue": null
  },
  {
      "Description": "Drive application name",
      "ParameterNo": "P13.5.4",
      "RegisterFunction": "Readable",
      "RegisterId": "2922",
      "RegisterValue": null
  }
]


function makeNewRegisterValues(json_objects_arr) {

  var newTd = document.createElement('td');
  newTd.id = "tdRegValue";

}

// return html table element from array of objects
function makeTable(json_objects_arr) {
  var table = document.createElement('table');
  table.id = "dynamicTable";                        // table id   *!*
  var keys = getKeysFromArray(sample_json);
  table.appendChild(makeTHEAD(keys));
  table.appendChild(makeTBODY(json_objects_arr, keys));
  return table;
}

// make header row from array of keys
function makeTHEAD(keys) {
  var thead = document.createElement('thead');
  var tr = document.createElement('tr');
  keys.forEach(function (key) {
    var th = document.createElement('th');
    th.textContent = key;
    tr.appendChild(th)
  });
  thead.appendChild(tr);
  return thead;
}


// make rows from key values in json
function makeTBODY(json, keys) {

  var tbody = document.createElement('tbody');

  json.forEach(function (object) {

    let tr = document.createElement('tr');

    const dropdownitemlist = []

    let writableRegistersDropdown = document.getElementById('dropdownWRegisters')

    if (  object['RegisterFunction'] =='Writable' ){

      let registerDropdown = document.getElementById('dropdownWRegisters')

      let registerButton = document.createElement('button');

      registerButton.className = "dropdown-item";
      registerButton.type = 'button'
      registerButton.value = object['RegisterId'] 

      registerButton.onClick = setRegisterIdtoReadOnlyInput(object['RegisterId'])

      registerButton.innerHTML = object['ParameterNo']

      writableRegistersDropdown.childNodes.forEach( function (obj) {

        dropdownitemlist.push(obj.value)
  
      })

      if(dropdownitemlist.includes(registerButton.value) != true){

      registerDropdown.appendChild(registerButton);}

    }

    keys.forEach(function (key) {

      let td = document.createElement('td');

      if (key == 'RegisterValue'){

        td = document.createElement('td');

        
        td.id = 'tdRegValue' + object['RegisterId']
      }
      

      if (key == 'RegisterValue' && object['RegisterFunction'] =='Writable') {



        // let registerValueInput = document.createElement('input')
        // registerValueInput.className = "inputTableRegister";
        // registerValueInput.id = object['RegisterId']                // register id   *!*

        td.textContent = object[key];

        // td.appendChild(registerValueInput);

        tr.appendChild(td);

      } else {

        td.textContent = object[key];
        tr.appendChild(td);
      }
    });

    tbody.appendChild(tr);

  });

  return tbody;
}

// return alphabetized array of keys from all objects in an array
function getKeysFromArray(json_objects_arr) {
  var array_of_keys = [];
  json_objects_arr.forEach(function (obj) {
    Object.keys(obj).forEach(function (key) {
      if (!(array_of_keys.includes(key))) {
        array_of_keys.push(key);
      }
    });
  });
  return array_of_keys.sort();
}
