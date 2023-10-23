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
}
