require('dotenv').config();
const Receiver = require('../azure-iothub-receiver');

const receiver = new Receiver({
  connectionString: process.env.IOT_CONN_STRING
});

receiver.on('data', function(message) {  
  console.log('successfully read from stream:', message.annotations);
});

receiver.on('error', function(error) {
  console.error(error);
});

/*
receiver.on('message', function(message) {
  console.log(message.annotations);
  console.log(message.body);
});

receiver.on('error', function(error) {
  console.error(error);
});*/
