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

function de(decoding) {
	var keyValue = _keyStr;
	var keyValueParse = '';
	var tempNumMergeStr = "";
	var tempNumSumStr = '';
	var tempNum1 = '';
	var tempNum2 = '';
	var tempNum3 = '';
	var tempParseIndex1 = '';
	var tempParseIndex2 = '';
	var tempParseIndex3 = '';
	var tempParseIndex4 = '';
	var encIndex = 0;
	var lastTempNum = 0;
	var keyParseNum = parseInt(decoding.substr(decoding.length - 2), 16)-150;

	var decodingTarget = decoding.substring(0, decoding.length - 2);
	decodingTarget = decodingTarget.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	if (decodingTarget.length%4 > 0){
		decodingTarget+= Array((decodingTarget.length%4)+1).join('=');
	}

	while (encIndex < decodingTarget.length) {
		keyValue = _snipString(keyValue,keyParseNum);
		keyValueParse = keyValue + "+/=";

		tempNumSumStr = decodingTarget.charAt(encIndex++) + decodingTarget.charAt(encIndex++) + decodingTarget.charAt(encIndex++) + decodingTarget.charAt(encIndex++);

		lastTempNum++;

		if (tempNumSumStr[2] != '=' && tempNumSumStr[3] != '='){
			tempNumSumStr = _snipString(tempNumSumStr, 4-(lastTempNum%4));
		}


		tempParseIndex1 = keyValueParse.indexOf(tempNumSumStr[0]);
		tempParseIndex2 = keyValueParse.indexOf(tempNumSumStr[1]);
		tempParseIndex3 = keyValueParse.indexOf(tempNumSumStr[2]);
		tempParseIndex4 = keyValueParse.indexOf(tempNumSumStr[3]);

		tempNum1 = tempParseIndex1 << 2 | tempParseIndex2 >> 4;
		tempNum2 = (tempParseIndex2 & 15) << 4 | tempParseIndex3 >> 2;
		tempNum3 = (tempParseIndex3 & 3) << 6 | tempParseIndex4;
		tempNumMergeStr = tempNumMergeStr + CC(tempNum1);

		if (tempParseIndex3 != 64) {
			tempNumMergeStr = tempNumMergeStr + CC(tempNum2)
		}

		if (tempParseIndex4 != 64) {
			tempNumMergeStr = tempNumMergeStr + CC(tempNum3)
		}
	}

	return _utf8_decode(tempNumMergeStr);
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
