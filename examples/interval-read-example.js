require('dotenv').config();
const through = require('through2');
const Receiver = require('../azure-iothub-receiver');

const receiver = new Receiver({
  connectionString: process.env.IOT_CONN_STRING
});

//Example of regularly reading from receiver stream
setInterval(function(){ 
  var message = receiver.read();
  if(message) console.log(message.body);
 }, 2000);

receiver.on('error', function(error) {
  console.error(error);
});