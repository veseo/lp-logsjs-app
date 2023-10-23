const HTTPServer = require('./src/HTTPServer');
const DatabaseClient = require('./src/database/DatabaseClient');

const port = 8080;
const dbPort = 27017;
const dbName = 'logs';
const collectionName = 'logs';

(async () => {
  const databaseClient = process.env.NODE_ENV === 'testing' ?
    null :
    new DatabaseClient(dbPort, dbName, collectionName)
  ;
  await databaseClient.init();
  const httpServer = new HTTPServer({ databaseClient });
  await httpServer.start(port);

  module.exports = httpServer.expressApp;
})()


