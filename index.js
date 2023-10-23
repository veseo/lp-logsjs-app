const httpServer = require('./src/root');
const ScheduledTask = require('./src/tasks/scheduled-task');

const port = 8080;

module.exports = (async () => {
	await httpServer.databaseClient.init();
	await httpServer.start(port);

	const scheduledTask = new ScheduledTask();
	scheduledTask.runBackgroundJob();
})();
