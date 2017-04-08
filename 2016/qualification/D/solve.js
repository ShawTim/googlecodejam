var fs = require("fs");
var args = process.argv;

if (args.length < 3) {
	return console.error("Usage: nodejs <SCRIPT> <INPUT>");
}

var process_logic = function(lines) {
	// logic here...
	var output = "";

	var T = lines[0]-0;

/*
var initArt = function(k) {
	var arts = [];
	var size = Math.pow(2, k);
	for (var i=0; i<size; i++) {
		var art = (size+i+1 >>> 0).toString(2).slice(0-k);
		arts.push(art);
	}
	return arts;
};
var expand = function(origin, art, c) {
	if (c <= 1) return art;

	var newArt = "";
	for (var i=0; i<art.length; i++) {
		if (art.charAt(i) == "0") {
			newArt += origin;
		} else {
			for (var j=0; j<origin.length; j++) {
				newArt += "1";
			}
		}
	}
	return expand(origin, newArt, c-1);
};
var k = 5, c = 10;
var arts = initArt(k);
for (var a=1; a<=c; a++) {
	arts.forEach(function(art, i) {
		var newArt = expand(art, art, a);
		if (parseInt(newArt.substr(1, k-1)) == 0) {
			console.log("#"+ i, "c="+a);
		}
	});
}
*/

	for (var i=1; i<=T; i++) {
		var K_C_S = lines[i].split(" ");
		var K = K_C_S[0];
		var C = K_C_S[1];
		var S = K_C_S[2];

		if (K == 1) {
			if (!!output) output += "\n";
			output += "Case #" + i + ": 1";
		} else if (K-S <= 1) {
			if (!!output) output += "\n";
			output += "Case #" + i + ":";
			for (var j=2; j<=K; j++) {
				output += " " + j;
			}
		} else {
			if (!!output) output += "\n";
			output += "Case #" + i + ": IMPOSSIBLE";
		}
	}

	return output;
};

var input_file = args[2];
fs.readFile(input_file, "utf8", function(err, raw) {
	if (err) {
		return console.error(err);
	}
	var data = raw.split("\n");
	console.log(process_logic(data));	
});
