var colorSet = [
	'#901848',
	'#90187f',
	'#5e1890',
	'#2c1890',
	'#186290',
	'#189087',
	'#18903f',
	'#000000',
];

(function () {
	start();
})();

function start() {

	var target = document.getElementById('testDiv');
	var checkArrayIndex = 0;

	setInterval(function() {
		if(checkArrayIndex > colorSet.length - 1){
			checkArrayIndex = 0;
		}

		target.style.color = colorSet[checkArrayIndex];
		target.innerText = colorSet[checkArrayIndex];
		checkArrayIndex++;
    }, 500);
	return;
}
