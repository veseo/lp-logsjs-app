module.exports = class Log {
  #id;
  #message;
  #version;
  #createdTimestamp;
  #lastUpdatedTimestamp;

  constructor(props) {
    this.#id = props.id;
    this.#message = props.message;
    this.#version = props.version ?? 1;
    this.#createdTimestamp = props.createdTimestamp ?? Date.now();
    this.#lastUpdatedTimestamp = props.lastUpdatedTimestamp ?? Date.now();
  }
}
