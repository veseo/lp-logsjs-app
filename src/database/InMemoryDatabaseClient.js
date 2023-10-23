module.exports = class InMemoryDatabaseClient {
  #entities = [];

  async init() {
    // nothing to init
  }

  async findAll() {
    return this.#entities;
  }

  async count() {
    return this.#entities.length;
  }

  async save(record) {
    this.#entities.push(record);
  }

  // Useful for the mock implementation
  async deleteAll() {
    this.#entities = [];
  }
}
