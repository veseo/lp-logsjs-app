module.exports = class InMemoryDatabaseClient {
  #entities = new Map();

  async init() {
    // nothing to init
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
    this.#entities.set(record.id, record);
  }

  // Useful for the mock implementation
  async deleteAll() {
    this.#entities = new Map();
  }
}
