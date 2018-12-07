var _keyStr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

(function () {

	var testCase = [
		'abcdefg',
		1234567,
		1,
		{'name' : 'myTest'},
	];

	for(var ii = 0; ii < testCase.length; ii++){

		var check = false;
		var resultEn = en(testCase[ii]);
		var resultDe = de(resultEn);

		if(testCase[ii] == resultDe){
			check = true;
		}

		console.log(check);
	}
	return;
})();

function en(encTarget) {

	let keyValue = _keyStr;
	let keyRandomNum = Math.floor(Math.random() * 60)+1;
	let encIndex = 0;
	let lastTempNum = 0;
	let encryption = _utf8Encode(encTarget);
	let tempNumMergeStr = '';

	while (encIndex < encryption.length) {

		keyValue = _snipString(keyValue,keyRandomNum);

		let lastSwitch = 0;
		let keyValueParse = keyValue + "+/";
		let firstRandomUniCode = encryption.charCodeAt(encIndex++);
		let midRandomUniCode = encryption.charCodeAt(encIndex++);
		let lastRandomUniCode = encryption.charCodeAt(encIndex++);
		let tempNum1 = firstRandomUniCode >> 2;
		let tempNum2 = (firstRandomUniCode & 3) << 4 | midRandomUniCode >> 4;
		let tempNum3 = (midRandomUniCode & 15) << 2 | lastRandomUniCode >> 6;
		let tempNum4 = lastRandomUniCode & 63;

		if (isNaN(midRandomUniCode)) {
			tempNum3 = 64;
			tempNum4 = 64;
		} else if (isNaN(lastRandomUniCode)) {
			tempNum4 = 64
		} else {
			lastSwitch=1;
		}

		let tempNumSumStr = keyValueParse.charAt(tempNum1) + keyValueParse.charAt(tempNum2) + keyValueParse.charAt(tempNum3) + keyValueParse.charAt(tempNum4);

		lastTempNum++;

		if (lastSwitch){
			tempNumSumStr = _snipString(tempNumSumStr, (lastTempNum%4));
		}

		tempNumMergeStr = tempNumMergeStr + tempNumSumStr;
	}
	return tempNumMergeStr + (keyRandomNum+150).toString(16);
};

function de(e) {
	var kt = _keyStr, ks,
		t = "",
		g, n, r, i, s, o, u, a, f = 0,h=0,
		kr = parseInt(e.substr(e.length - 2), 16)-150;
	e = e.substring(0, e.length - 2);
	e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	var l = e.length;
	if (l%4 > 0) e+= Array((l%4)+1).join('=');
	//kt = SS(kt,kr);
	while (f < l) {
		kt = _snipString(kt,kr);
		ks = kt + "+/=";
		g = e.charAt(f++) + e.charAt(f++) + e.charAt(f++) + e.charAt(f++);
		h++;
		if (g[2] != '=' && g[3] != '=') g = _snipString(g, 4-(h%4));
		s = ks.indexOf(g[0]);
		o = ks.indexOf(g[1]);
		u = ks.indexOf(g[2]);
		a = ks.indexOf(g[3]);
		n = s << 2 | o >> 4;
		r = (o & 15) << 4 | u >> 2;
		i = (u & 3) << 6 | a;
		t = t + CC(n);
		if (u != 64) {
			t = t + CC(r)
		}
		if (a != 64) {
			t = t + CC(i)
		}
	}
	t = _utf8_decode(t);
	return t
};

function _utf8Encode(e) {
	e = e.toString().replace(/\r\n/g, "\n");
	var t = "";
	for (var n = 0; n < e.length; n++) {
		var r = e.charCodeAt(n);
		if (r < 128) {
			t += CC(r)
		} else if (r > 127 && r < 2048) {
			t += CC(r >> 6 | 192);
			t += CC(r & 63 | 128)
		} else {
			t += CC(r >> 12 | 224);
			t += CC(r >> 6 & 63 | 128);
			t += CC(r & 63 | 128)
		}
	}
	return t
};

function _utf8_decode (e) {
	var t = "";
	var n = 0;
	var r;
	while (n < e.length) {
		r = e.charCodeAt(n);
		if (r < 128) {
			t += CC(r);
			n++
		} else if (r > 191 && r < 224) {
			var c2 = e.charCodeAt(n + 1);
			t += CC((r & 31) << 6 | c2 & 63);
			n += 2
		} else {
			var c2 = e.charCodeAt(n + 1);
			var c3 = e.charCodeAt(n + 2);
			t += CC((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
			n += 3
		}
	}
	return t
};

function CC(e) {
	return String.fromCharCode(e)
};

function _snipString(str, num) {
	return str.substr(num) + str.substring(0, num);
};
