var imgOn = "assets/table-on.png";
var imgOff = "assets/table-off.png";

function toggle(id, source) {
	document.getElementById(id).src = (source.endsWith(imgOff) ? imgOn : imgOff);
}