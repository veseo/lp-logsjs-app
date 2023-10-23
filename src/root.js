/* eslint no-undef: 0 */

const HTTPServer = require('./HTTPServer');
const MongoDBDatabaseClient = require('./database/MongoDBDatabaseClient');
const InMemoryDatabaseClient = require('./database/InMemoryDatabaseClient');

const dbPort = 27017;
const dbName = 'logs';
const collectionName = 'logs';

const databaseClient = process.env.NODE_ENV === 'testing' ?
	new InMemoryDatabaseClient() :
	new MongoDBDatabaseClient(dbPort, dbName, collectionName)
;
const httpServer = new HTTPServer({ databaseClient });

module.exports = httpServer;
