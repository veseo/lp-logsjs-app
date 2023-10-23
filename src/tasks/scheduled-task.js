module.exports = class ScheduledTask {
	runBackgroundJob() {
		const currentDate = new Date();
		const formattedTime = this.#formatTime(currentDate);
		console.log('The time is now ' + formattedTime);

		setTimeout(() => this.runBackgroundJob(), 5 * 1000);
	}

	#formatTime(date) {
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');
		return `${hours}:${minutes}:${seconds}`;
	}
};
