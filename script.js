var imgOn = "assets/table-on.png";
var imgOff = "assets/table-off.png";

function toggle(id, source) {
	var timerBool = (source.endsWith(imgOn) ? true : false);
	document.getElementById(id).src = (source.endsWith(imgOff) ? imgOn : imgOff);
	if(timerBool) {
		alert(new Date());
		var start = new Date() + "";
		var startTime = start.substr((start.indexOf(":") - 2), 8);
		var startId = "start-" + id.substr(id.length - 1);
		document.getElementById(startId).innerHTML = "Hora inicial: " + startTime;
	} else {
		var elapsed = new Date() + "";
		var elapsedTime = elapsed.substr((elapsed.indexOf(":") - 2), 8);
		var hours = timeDiff(startTime, elapsedTime);
		var endId = "end-" + id.substr(id.length - 1);
		document.getElementById(endId).innerHTML = "Hora final: " + elapsedTime;
		var totalId = "total-" + id.substr(id.length - 1);
		document.getElementById(endId).innerHTML = "Total: $" + (hours*50.00);
	}
}

function timeDiff(start, end) {

}