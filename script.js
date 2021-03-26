var imgOn = "assets/table-on.png";
var imgOff = "assets/table-off.png";

var startTime = "";

function toggle(id, source) {
	var timerBool = (source.endsWith(imgOff) ? true : false);
	document.getElementById(id).src = (source.endsWith(imgOff) ? imgOn : imgOff);
	if(timerBool) {
		var start = new Date() + "";
		startTime = start.substr((start.indexOf(":") - 2), 8);
		var startId = "start-" + id.substr(id.length - 1);
		document.getElementById(startId).innerHTML = "Hora inicial: " + startTime;
	} else {
		var elapsed = new Date() + "";
		var elapsedTime = elapsed.substr((elapsed.indexOf(":") - 2), 8);
		var hours = timeDiff(startTime, elapsedTime);
		var endId = "end-" + id.substr(id.length - 1);
		document.getElementById(endId).innerHTML = "Hora final: " + elapsedTime;
		var totalId = "total-" + id.substr(id.length - 1);
		document.getElementById(totalId).innerHTML = "Total: $" + (hours*50.00);
	}
}

setInterval(refresh, 60000);

function refresh() {

}

function timeDiff(start, end) {
	alert(start + " " + end);
	var startHr = parseInt(start.substr(0, 2));
	var startMin = parseInt(start.substr(4, 2));
	var startSec = parseInt(start.substr(7, 2));
	var startTotal = startHr*60*60 + startMin*60 + startSec;
	var endHr = parseInt(start.substr(0, 2));
	var endMin = parseInt(end.substr(4, 2));
	var endSec = parseInt(end.substr(7, 2));	
	var endTotal = endHr*60*60 + endMin*60 + endSec;
	if(endTotal < startTotal) {
		endTotal += 1440;
	}
	let hours = Math.floor((endTotal - startTotal) / 3600) + 1;
	return hours;
}