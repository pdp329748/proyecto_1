// Created variables with images' names to toggle easily between them.
var imgOn = "assets/table-on.png";
var imgOff = "assets/table-off.png";

var startTime = "";

// Created object "Set" to keep the data of each table.
function Set(start, end, total) {
	this.startX = start;
	this.endX = end;
	this.totalX = total;
}

// An array with 6 objects such as the one above is created.
var dataSet = new Array(6);

// Each attribute is set to "".
for (var i = 0; i <= 6; i++) {
	dataSet[i] = new Set("", "", "");
}

// Onclick function for the pool tables.
function toggle(id, source) {
	// Conditional to toggle image source.
	var timerBool = (source.endsWith(imgOff) ? true : false);
	document.getElementById(id).src = (source.endsWith(imgOff) ? imgOn : imgOff);
	// Start time is set.
	if(timerBool) {
		var totalId = "total-" + id.substr(id.length - 1);
		if(document.getElementById(totalId).value != "") {
			var startId = "start-" + id.substr(id.length - 1);
			var endId = "end-" + id.substr(id.length - 1);
			document.getElementById(startId).innerHTML = "";
			document.getElementById(endId).innerHTML = "";
			document.getElementById(totalId).innerHTML = "";
		}
		var start = new Date() + "";
		startTime = start.substr((start.indexOf(":") - 2), 8);
		var startId = "start-" + id.substr(id.length - 1);
		dataSet[(id.substr(id.length - 1) - 1)].startX = startTime;
		document.getElementById(startId).innerHTML = startTime;
	} else {
		// Final time is set. Total price is set.
		var elapsed = new Date() + "";
		var elapsedTime = elapsed.substr((elapsed.indexOf(":") - 2), 8);
		var hours = timeDiff(startTime, elapsedTime);
		var endId = "end-" + id.substr(id.length - 1);
		dataSet[(id.substr(id.length - 1) - 1)].endX = elapsedTime;
		document.getElementById(endId).innerHTML = elapsedTime;
		var i = (id.substr(id.length - 1) - 1);
		// If you play pool for 24 hours straight, you probably need some help.
		if(hours == 24) {
			alert("Váyase de aquí, viejo mugroso.");
			// The array's attributes at i index are set to "".
			dataSet[i].startX = "";
			dataSet[i].endX = "";
			dataSet[i].totalX = "";
		}
		dataSet[i].totalX = hours*50.00;
		var totalId = "total-" + (i + 1);
		document.getElementById(totalId).innerHTML = "$" + dataSet[i].totalX.toFixed(2);
	}
}

// Every minute the total is updated.
// The total is also updated when a table stops being used.
window.setInterval(function() {
	for(var i = 0; i < 6; i++) {
		if(document.getElementById("table-" + (i + 1)).src.endsWith(imgOn)) {
			var elapsed = new Date() + "";
			var elapsedTime = elapsed.substr((elapsed.indexOf(":") - 2), 8);
			dataSet[i].endX = elapsedTime;
			let hours = timeDiff(dataSet[i].startX, dataSet[i].endX);
			if(hours == 24) {
				alert("Váyase de aquí, viejo mugroso.");
				dataSet[i].startX = "";
				dataSet[i].endX = "";
				dataSet[i].totalX = "";
			}
			dataSet[i].totalX = hours*50.00;
			var totalId = "total-" + (i + 1);
			document.getElementById(totalId).innerHTML = "$" + dataSet[i].totalX.toFixed(2);
		}
	}
}, 60*1000)

var ix;
var jx;
var kx;

// Using the provided inputs, the user can test the amount charged between any two times.
function testTable(id, start, end) {
	document.getElementById(id).src = imgOn;
	// The image is set to imgOn. After one second, it is set to imgOff.
	setTimeout( function() {
		document.getElementById(id).src = imgOff;
    }, 1000);
	var totalId = "total-" + id.substr(id.length - 1);
	if(document.getElementById(totalId).value != "") {
		var startId = "start-" + id.substr(id.length - 1);
		var endId = "end-" + id.substr(id.length - 1);
		document.getElementById(startId).innerHTML = "";
		document.getElementById(endId).innerHTML = "";
		document.getElementById(totalId).innerHTML = "";
	}
	var startId = "start-" + id.substr(id.length - 1);
	dataSet[(id.substr(id.length - 1) - 1)].startX = start;
	document.getElementById(startId).innerHTML = start;
	var hours = timeDiff(start, end);
	var endId = "end-" + id.substr(id.length - 1);
	dataSet[(id.substr(id.length - 1) - 1)].endX = end;
	document.getElementById(endId).innerHTML = end;
	var i = (id.substr(id.length - 1) - 1);
	if(hours == 24) {
		alert("Váyase de aquí, viejo mugroso.");
		dataSet[i].startX = "";
		dataSet[i].endX = "";
		dataSet[i].totalX = "";
	}
	dataSet[i].totalX = hours*50.00;
	var totalId = "total-" + (i + 1);
	document.getElementById(totalId).innerHTML = "$" + dataSet[i].totalX.toFixed(2);
}

// Driver code for the function above.
function testTableDriver() {
	var idTemp = document.getElementById("tableX").value;
	var hrTemp = document.getElementById("hoursX").value;
	var minTemp = document.getElementById("minutesX").value;
	var secTemp = document.getElementById("secondsX").value;
	var startTemp = hrTemp + ":" + minTemp + ":" + secTemp;
	var hrTemp = document.getElementById("hoursY").value;
	var minTemp = document.getElementById("minutesY").value;
	var secTemp = document.getElementById("secondsY").value;
	var endTemp = hrTemp + ":" + minTemp + ":" + secTemp;
	testTable(idTemp, startTemp, endTemp);
}

// Calculates the time difference between start-time and end-time.
// Format 'hh:mm:ss'
function timeDiff(start, end) {
	var startHr = parseInt(start.substr(0, 2));
	var startMin = parseInt(start.substr(3, 2));
	var startSec = parseInt(start.substr(6, 2));
	var endHr = parseInt(end.substr(0, 2));
	var endMin = parseInt(end.substr(3, 2));
	var endSec = parseInt(end.substr(6, 2));
	if(start == end) {
		return 1;
	}
	var startTotal = startHr*60*60 + startMin*60 + startSec;
	var endTotal = endHr*60*60 + endMin*60 + endSec;
	// If end-time is before start-time, end-time is 1 day after start-time.
	if(endTotal <= startTotal) {
		endTotal += 24*60*60;
	}
	// Get number of hours in (endTotal - startTotal) seconds.
	let hours = Math.floor((endTotal - startTotal) / 3600) + 1;
	return hours;
}

// Values under 10 are padded with a leading zero.
function zero(input) {
	if(!isNaN(input.value) && input.value.length === 1) {
		input.value = '0' + input.value;
	}
}

// 24*60*60 = 86400
// A function that returns the number of hours between 00:00:00 and all possible times.
// Each number should appear exactly 3600 times (once for each second).
function timeDiffTest() {
	for(var i = 0; i < 24; i++) {
		for(var j = 0; j < 60; j++) {
			for(var k = 0; k < 60; k++) {
				if(i < 10) {
					var ix = "0" + i;
				} else {
					var ix = "" + i;
				}
				if(j < 10) {
					var jx = "0" + j;
				} else {
					var jx = "" + j;
				}
				if(k < 10) {
					var kx = "0" + k;
				} else {
					var kx = "" + k;
				}
				console.log(timeDiff("00:00:00", (ix + ":" + jx + ":" + kx)));
			}
		}
	}
}
// Remove the comment on the next line to test timeDiff() function.
// timeDiffTest();