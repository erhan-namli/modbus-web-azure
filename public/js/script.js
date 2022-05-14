/* eslint-disable max-classes-per-file */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
$(document).ready(() => {
    // if deployed to a site supporting SSL, use wss://
    const protocol = document.location.protocol.startsWith('https') ? 'wss://' : 'ws://';
    const webSocket = new WebSocket(protocol + location.host);
  
    webSocket.onmessage = function onMessage(message) {
      try {
        const messageData = JSON.parse(message.data);
        console.log(messageData);
        
      } catch (err) {
        console.error(err);
      }
    };
  });

window.onload = function() {



writeButton = document.getElementById('writeregisterbutton')

writeButton.addEventListener('click', function() {

  webSocketSendData();

})

var webSocketSendData = function () {

  const protocol = document.location.protocol.startsWith('https') ? 'wss://' : 'ws://';
  const webSocket2 = new WebSocket(protocol + location.host + '/erhan' )

  webSocket2.onopen = function() {

    webSocket2.send("Hi, from the client.");

    }
 
  console.log(webSocket2)
}


}


