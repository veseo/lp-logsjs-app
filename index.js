const HTTPServer = require('./src/HTTPServer');
const MongoDBDatabaseClient = require('./src/database/MongoDBDatabaseClient');
const InMemoryDatabaseClient = require('./src/database/InMemoryDatabaseClient');

const port = 8081;
const dbPort = 27017;
const dbName = 'logs';
const collectionName = 'logs';

module.exports = (async () => {
  const databaseClient = process.env.NODE_ENV === 'testing' ?
    new InMemoryDatabaseClient() :
    new MongoDBDatabaseClient(dbPort, dbName, collectionName)
  ;
  await databaseClient.init();
  const httpServer = new HTTPServer({ databaseClient });
  await httpServer.start(port);

  // console.log(typeof httpServer.expressApp);

  return httpServer.expressApp;
})();


