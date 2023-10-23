const express = require('express');
const Database = require('./src/database/db');

const app = express();
const port = 8080;
const dbPort = 27017;
const dbName = 'logs';
const collectionName = 'logs';

// Get all logs
app.get('/logs', async (req, res) => {
	try {
		const dbClient = new Database(dbPort, dbName);
		const db = await dbClient.connectToDB();

		const data = await db.collection(collectionName).find({}).toArray();
		return res.json(data);
	} catch (error) {
		console.log(error);
		throw error;
	}
});

// Get the count of logs
app.get('/logs/count', async (req, res) => {
	try {
		const dbClient = new Database(dbPort, dbName);
		const db = await dbClient.connectToDB();

		const data =  await db.collection(collectionName).countDocuments({});
		return res.json(data);
	} catch (error) {
		console.log(error);
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
