require('dotenv').config();
const through = require('through2');
const Receiver = require('../azure-iothub-receiver');

const receiver = new Receiver({
  connectionString: process.env.IOT_CONN_STRING
});

//Example of using receiver stream through piping to stdout
receiver.pipe(through.obj(function (chunk, enc, callback) {
  this.push(JSON.stringify(chunk.annotations));
})).pipe(process.stdout);

receiver.on('error', function(error) {
  console.error(error);
});
