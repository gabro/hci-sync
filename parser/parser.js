var sessions = require("./sessions.json");

function tapAverage (sessions, gameMode) {
	var sum = 0;
	var count = 0;

	for (var s in sessions) {
		var partSum = 0;
		var prev = 0;
		if (sessions[s].gameMode == gameMode) {
			for (t in sessions[s].taps) {
				partSum += sessions[s].taps[t].time - prev;
				prev = sessions[s].taps[t].time;
			}
			// console.log("average: " + partSum / sessions[s].taps.length);
			count++;
			sum += partSum / sessions[s].taps.length;
		}
	}
	return sum / count;
}

console.log("Balloon Tapper. Average interval between taps: " + tapAverage(sessions, 0));
console.log("Balloon Inflater. Average interval between taps: " + tapAverage(sessions, 1));
