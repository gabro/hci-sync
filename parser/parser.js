var sessions = require("./sessions.json");
var fs = require('fs');
var tapAverage = function (session) {
	var sum = 0;
	var prev = 0;
	for (t in session.taps) {
		sum += session.taps[t].time - prev;
		prev = session.taps[t].time;
	}
	return sum / session.taps.length;
}
var tapError = function (session, average) {
	var taps = session.taps;
	var prev = 0;
	var sseSum = 0;
	var count = 0;
	for (var i = 0; i < taps.length; i++) {
		count++;
		sseSum += Math.pow(average - (taps[i].time - prev), 2);
		prev = taps[i].time;
		taps[i].mse = sseSum / count;
	}
	session.mse = sseSum / taps.length;
};
var sessions = sessions.map(function (s) {
	s['averageInterval'] = tapAverage(s);
	tapError(s, s.averageInterval);
	return s;
});
var data = sessions.map(function (d) {
	return d.taps.map(function(tap) {
		return d._id['$oid'] + "," + d.gameMode + "," + tap.time + "," + tap.mse;
	}).join("\n");
});

fs.writeFile('./sessions.csv', data.join('\n'), function (err) {
	if (err) {
		return console.log(err);
	}
});
