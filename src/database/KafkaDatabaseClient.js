const { Kafka } = require('kafkajs');

//@TODO Incomplete implementation
module.exports = class KafkaDatabaseClient {
  #client;
  #entities = new Map();

  constructor() {
    this.#client = new Kafka({
      clientId: 'my-app',
      brokers: ['kafka-server:9092']
    });
  }

  async init() {
    const consumer = this.#client.consumer();
    await consumer.connect();

    // pre-load all existing records into this.#entities, using te consumer.
    // Consumer would also keep listening for future updates in the topic and add to local instance's #entities
  }

  async findAll() {
    return Array.from(this.#entities.values());
  }

  async findById(id) {
    return this.#entities.get(id);
  }

  async count() {
    return Array.from(this.#entities.values()).length;
  }

  async save(record) {
    const producer = this.#client.producer();
    await producer.connect();

    // @TODO will publish in the topic using the producer
  }
}
