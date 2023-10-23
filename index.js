const httpServer = require('./src/root')

const port = 8080;

module.exports = (async () => {
  await httpServer.databaseClient.init();
  await httpServer.start(port);
})();


