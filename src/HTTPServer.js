const express = require("express");
const ValidationError = require('./ValidationError');
const Log = require('./domain/Log');

module.exports = class HTTPServer {
  expressApp;
  databaseClient;

  constructor(props) {
    this.expressApp = express();
    this.databaseClient = props.databaseClient;
  }

  async start(port) {
    this.expressApp.use(express.json());
    this.attachListeners();
    this.expressApp.listen(port);
  }

  //@TODO split outside of HTTP server into router(s)
  attachListeners() {
    this.expressApp.get('/logs', async (req, res) => {
      try {
        const data = await this.databaseClient.findAll();
        return res.json(data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    });

    this.expressApp.get('/logs/:id', async (req, res) => {
      try {
        const existingRecord = await this.databaseClient.findById(req.params.id);
        if (!existingRecord) {
          return ValidationError.sendError(res, `Record with that id does not exist`);
        }

        return res.json(existingRecord);
      } catch (error) {
        console.log(error);
        throw error;
      }
    });

    this.expressApp.post('/logs', async (req, res) => {
      const validationError = this.extractValidationError(req.body);

      if (validationError) {
        return ValidationError.sendError(res, validationError);
      }

      const existingRecord = await this.databaseClient.findById(req.body.id);
      if (existingRecord) {
        return ValidationError.sendError(res, `Record with that id already exists!`);
      }

      try {
        const log = new Log({
          id: req.body.id,
          message: req.body.message,
        })
        await this.databaseClient.save(log);
        return res.json({});
      } catch (error) {
        console.log(error);
        throw error;
      }
    });

    this.expressApp.patch('/logs/:id', async (req, res) => {
      const input = {
        id: req.params.id,
        message: req.body.message,
      }
      const validationError = this.extractValidationError(input);

      if (validationError) {
        return ValidationError.sendError(res, validationError);
      }

      const existingRecord = await this.databaseClient.findById(input.id);
      if (!existingRecord) {
        return ValidationError.sendError(res, `Record with that id does not exist`);
      }

      try {
        existingRecord.message = input.message;
        await this.databaseClient.save(existingRecord);
        return res.json({});
      } catch (error) {
        console.log(error);
        throw error;
      }
    });

    // Get the count of logs
    this.expressApp.get('/logs/count', async (req, res) => {
      try {
        const data =  await this.databaseClient.count();
        return res.json(data);
      } catch (error) {
        console.log(error);
      }
    });
  }

  extractValidationError(input) {
    if ([undefined, null].includes(input.id)) {
      return 'Id is not a valid value';
    }

    if ([undefined, null].includes(input.message)) {
      return 'Message is not a valid value';
    }

    return false;
  }
}
