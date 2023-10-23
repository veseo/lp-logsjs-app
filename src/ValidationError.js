module.exports = class ValidationError {
  static sendError(res, message) {
    res.status(400).send(message);
  }
}
