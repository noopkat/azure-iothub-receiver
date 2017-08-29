require('dotenv').config();
const through = require('through2');
const Receiver = require('../azure-iothub-receiver');

const receiver = new Receiver({
  connectionString: process.env.IOT_CONN_STRING
});

//Example of action every time there's something in the stream
receiver.on('data', function(message) {  
  console.log('successfully read from stream:', message.annotations);
});

receiver.on('error', function(error) {
  console.error(error);
});

/*
//Calling 'message' is deprecated- please use Streams
receiver.on('message', function(message) {
  console.log(message.annotations);
  console.log(message.body);
});
*/
