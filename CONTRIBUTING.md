# Contributing to azure-iothub-receiver

This project was created to supplement projects that connect to Azure IoT Hub 
using Node.js. If you have any feature requests or bugs, please feel free to
open an issue. If applicable, please have your Pull Requests reference the 
open issues it fixes. 

## I don't have a physical device

This project expects users to have physical devices they're connecting to 
Azure IoT Hub. If you are a contributor who wants to use a simulated device,
refer to the steps [here.](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-node-node-getstarted#create-a-simulated-device-app) 
It's useful to read through the full guide as it steps through setting up a full
project, including setting up an Azure IoT Hub. You may notice that the step
that has you create **ReadDeviceToCloudMessages.js** serves a similar function
to this module. 

## Useful Resources

- More on [Azure IoT Hub](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-what-is-azure-iot)
- [Useful blog post explaining Node Streams](https://blog.yld.io/2016/01/13/using-streams/#.WaBQ21GGPZt)

## Examples

This project includes multiple examples of reading from the receiver stream using different methods.

### event-example.js

The event example prints our message annotations to the console every time there's readable data in our stream. This example is event driven- meaning code will execute on the `'data'` event. 
**Note:** While the `'message'` event is still included, it is currently deprecated. Please use the `'data'` event. 

```javascript
//Example of action every time there's something in the stream
receiver.on('data', function(message) {  
  console.log('successfully read from stream:', message.annotations);
});

receiver.on('error', function(error) {
  console.error(error);
});
```

### interval-read-example.js

This example reads from our receiver stream at a regular interval of 2000ms (2 seconds). If there is a message in the stream, it will print it to the console. 

```javascript
//Example of regularly reading from receiver stream
setInterval(function(){ 
  var message = receiver.read();
  if(message) console.log(message.body);
 }, 2000);

receiver.on('error', function(error) {
  console.error(error);
});
```

### pipe-example.js

This example takes the data in our receiver stream, and pipes it to stdout after performing a transform on each message annotation chunk with JSON.stringify(). 

```javascript
//Example of using receiever stream throug piping to stdout
receiver.pipe(through.obj(function (chunk, enc, callback) {
  this.push(JSON.stringify(chunk.annotations));
})).pipe(process.stdout);

receiver.on('error', function(error) {
  console.error(error);
});
```