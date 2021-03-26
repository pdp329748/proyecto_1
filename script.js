var imgOn = "assets/table-on.png";
var imgOff = "assets/table-off.png";

var startTime = "";

function Set(start, end, total) {
	this.startX = start;
	this.endX = end;
	this.totalX = total;
}

var dataSet = new Array(6);

for (var i = 0; i <= 6; i++) {
	dataSet[i] = new Set("", "", "");
}

function toggle(id, source) {
	var timerBool = (source.endsWith(imgOff) ? true : false);
	document.getElementById(id).src = (source.endsWith(imgOff) ? imgOn : imgOff);
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
		var elapsed = new Date() + "";
		var elapsedTime = elapsed.substr((elapsed.indexOf(":") - 2), 8);
		var hours = timeDiff(startTime, elapsedTime);
		var endId = "end-" + id.substr(id.length - 1);
		dataSet[(id.substr(id.length - 1) - 1)].endX = elapsedTime;
		document.getElementById(endId).innerHTML = elapsedTime;
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
}

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

function testTable(id, start, end) {
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

//testTable("table-2", "12:00:00", "11:00:00");

// 24*60*60 = 86400
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

//timeDiffTest();

function timeDiff(start, end) {
	var startHr = parseInt(start.substr(0, 2));
	var startMin = parseInt(start.substr(4, 2));
	var startSec = parseInt(start.substr(7, 2));
	var startTotal = startHr*60*60 + startMin*60 + startSec;
	var endHr = parseInt(end.substr(0, 2));
	var endMin = parseInt(end.substr(4, 2));
	var endSec = parseInt(end.substr(7, 2));	
	var endTotal = endHr*60*60 + endMin*60 + endSec;
	if(endTotal <= startTotal) {
		endTotal += 24*60*60;
	}
	let hours = Math.floor((endTotal - startTotal) / 3600) + 1;
	return hours;
}