const { MongoClient } = require('mongodb');

module.exports = class MongoDBDatabaseClient {
  #port = 27017;
  #databaseName;
  #collectionName;
  #database;

  constructor(port, databaseName, collectionName) {
    const url = `mongodb://mongo:${this.#port}`;
    this.client = new MongoClient(url, {
      auth: {
        username: '',
        password: '',
      }
    });

    this.#databaseName = databaseName;
    this.#collectionName = collectionName;
  }

  async init() {
    try {
      // Connect to the MongoDB server
      await this.client.connect();

      // Access a specific database
      this.#database = this.client.db(this.#databaseName);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  async findAll() {
    return this.#database.collection(this.#collectionName).find({}).toArray();
  }

  async findById(id) {
    const result = await this.#database.collection(this.#collectionName).find({ id}).toArray();
    return result.length > 0 ? result[0] : null;
  }

  async save(record) {
    const existingRecord = await this.findById(record.id);

    if (existingRecord) {
      return this.#database.collection(this.#collectionName).updateOne({
        id: record.id,
      }, {
        $set: record,
      });
    }

    this.#database.collection(this.#collectionName).insertOne(record);
  }

  async count() {
    return this.#database.collection(this.#collectionName).countDocuments({});
  }
};
