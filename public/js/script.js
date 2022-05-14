/* eslint-disable max-classes-per-file */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
$(document).ready(() => {
    // if deployed to a site supporting SSL, use wss://
    const protocol = document.location.protocol.startsWith('https') ? 'wss://' : 'ws://';
    const webSocket = new WebSocket(protocol + location.host);
  
    webSocket.onmessage = function onMessage(message) {
      try {

        connectionState = document.getElementById('deviceStatus')
        connectionState.style.backgroundColor = 'green'
        connectionState.innerText = 'DeviceConnected'
        const messageData = JSON.parse(message.data);
        console.log(messageData)

        //document.querySelector('.table').removeChild(document.querySelector('.table').lastChild)
        //document.querySelector('.table').replaceWith(makeTable(messageData.IotData))
        document.querySelector('.table').innerHTML= '';
        document.querySelector('.table').appendChild(makeTable(messageData.IotData))

  
        
      } catch (err) {
        
        console.error(err);

      }
    };
  });

window.onload = function() {

writeButton = document.getElementById('writeregisterbutton')

writeButton.addEventListener('click', function() {

  console.log("Write Butonuna basıldı")

  webSocketSendWriteRegisterData();

})

var webSocketSendWriteRegisterData = function () {
 
  const protocol = document.location.protocol.startsWith('https') ? 'wss://' : 'ws://';
  const webSocket2 = new WebSocket(protocol + location.host)

  registerId = document.getElementById('')

  data = JSON.stringify( {
    method : 'connection',
    payload : "connection payload"
  })

  webSocket2.onopen = function() {

    webSocket2.send(data);

    }
 
  console.log(webSocket2)
}

}


//////     MAKE TABLE FUNCTIONS ////////

var sample_json = [{"IpAdress": "192.168.1.200", "RegisterId": 1, "RegisterValue": [0] },
  {
      "IpAdress": "192.168.1.200",
      "RegisterId": 2,
      "RegisterValue": [
          0
      ]
  },
  {
      "IpAdress": "192.168.1.200",
      "RegisterId": 3,
      "RegisterValue": [
          0
      ]
  },
  {
      "IpAdress": "192.168.1.200",
      "RegisterId": 4,
      "RegisterValue": [
          0
      ]
  },
  {
      "IpAdress": "192.168.1.200",
      "RegisterId": 5,
      "RegisterValue": [
          0
      ]
  }
]

window.onload = function () {

  document.querySelector('.table').appendChild(makeTable(sample_json))

}

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

      console.log(dropdownitemlist.includes(object['RegisterId']))

      let registerDropdown = document.getElementById('dropdownWRegisters')

      let registerButton = document.createElement('button');

      registerButton.className = "dropdown-item";
      registerButton.type = 'button'
      registerButton.value = object['RegisterId'] 

      registerButton.innerHTML = object['RegisterId']

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



        let registerValueInput = document.createElement('input')
        registerValueInput.className = "inputTableRegister";
        registerValueInput.id = object['RegisterId']                // register id   *!*

        td.textContent = object[key];

        td.appendChild(registerValueInput);

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
