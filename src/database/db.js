const { MongoClient } = require('mongodb');

module.exports = class Database {
	constructor(port, databaseName) {
		const url = `mongodb://mongo:${port}`;
		this.client = new MongoClient(url, {
			auth: {
				username: '',
				password: '',
			}
		});
		this.databaseName = databaseName;
		this.database = null;
	}

	async connectToDB() {
		try {
			// Connect to the MongoDB server
			await this.client.connect();

			// Access a specific database
			return this.client.db(this.databaseName); // Replace with your database name
		} catch (error) {
			console.error('Error connecting to MongoDB:', error);
			throw error;
		}
	}
};
