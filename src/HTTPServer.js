const express = require("express");

module.exports = class HTTPServer {
  expressApp;
  databaseClient;

  constructor(props) {
    this.expressApp = express();
    this.databaseClient = props.databaseClient;
  }

  async start(port) {
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
}
