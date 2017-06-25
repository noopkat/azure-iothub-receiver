# azure-iothub-receiver

This package provides a succinct NodeJS API for receiving device-to-cloud messages from an Azure IoT Hub instance without a lot of boilerplate. It's fast to get up and running, but configurable where it counts if needed.

It will combine receivers on all partitions (or a filtered set of partition IDs that you specify) within a consumer group, and supplies a single message event to attach a handler to.

## Installation

1. Install [NodeJS version 4.2 or higher](http://nodejs.org)
2. Run `npm install --save azure-iothub-receiver` in your project folder


## Example usage

The following example will get you up and running with the basics. You'll need a connection string for your Azure IoT Hub instance. You can find this under the 'Shared Access Policies' link when viewing the IoT Hub within your Azure Portal.

```javascript
const Receiver = require('azure-iothub-receiver');

const options = {
  connectionString: '<your Azure IoT Hub connection string>' 
};

const receiver = new Receiver(options);

receiver.on('message', (message) => {
  console.log('annotations:', message.annotations);
  console.log('body:', message.body);
});

receiver.on('error', (error) => {
  console.error(error);
});

```

## Extended options

The options object passed in on Receiver instantiation accepts the following properties:

|Property            |Required?   |Default        |
|--------------------|------------|---------------|
|`connectionString`  |Yes         |               |
|`consumerGroup`     |No          | `'$default'`  |
|`startTime`         |No          | `Date.now()`  |
|`partitionFilter`   |No          |`[]`           |

## License

MIT


