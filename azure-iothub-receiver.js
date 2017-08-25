const EventHubsClient = require('azure-event-hubs').Client;
const EventEmitter = require('events').EventEmitter;
const util = require('util');
const Readable = require('stream').Readable;

const Receiver = function(options) {
  this.consumerGroup = options.consumerGroup || '$Default';
  this.startTime =  options.startTime || Date.now();
  this.partitionFilter = options.partitionIds || [];
  options.objectMode = true;

  const connectionString = options.connectionString;
  this.ehClient = EventHubsClient.fromConnectionString(connectionString);

  EventEmitter.call(this);
  Readable.call(this, options);
  this.initialise();
};

util.inherits(Receiver, EventEmitter);
util.inherits(Receiver, Readable);

Receiver.prototype.initialise = function() {
  this.ehClient
    .open()
    .then(this.ehClient.getPartitionIds.bind(this.ehClient))
    .then((partitionIds) => this.generateReceivers(partitionIds))
    .catch((error) => console.error('Failed on event client setup: ', error.message));
};

Receiver.prototype.generateReceivers = function(partitionIds) {
  partitionIds
    .filter((partitionId) => !this.partitionFilter.length || this.partitionFilter.includes(partitionId))
    .forEach((partitionId) => {
      this.ehClient.createReceiver(this.consumerGroup, partitionId, {'startAfterTime' : this.startTime})
        .then(this.setUpEvents.bind(this))
        .catch((error) => console.error('Failed on receiver setup for partitionId ' + partitionId + ': ', error.message));
    });
};

/*Note: message we receive is an object, which will then be parsed as a string on client side.*/
Receiver.prototype.setUpEvents = function(receiver) {
  receiver.on('message', (message) => {
    const streamMessage = { annotations: message.annotations, body: message.body }; 
    this.emit('message', streamMessage);
    this.push(streamMessage);
});
  receiver.on('errorReceived', (error) => this.emit('error', error));
};

module.exports = Receiver;
