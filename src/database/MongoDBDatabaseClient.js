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

  async count() {
    return this.#database.collection(this.#collectionName).countDocuments({})
  }
};
