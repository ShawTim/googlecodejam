var fs = require("fs");
var args = process.argv;

if (args.length < 3) {
	return console.error("Usage: nodejs <SCRIPT> <INPUT>");
}

var process_logic = function(lines) {
	// logic here...
	var output = "";

	var seen = 0; // it's actually 0000000000 in binary, treat it as array[10]

	var T = lines[0]-0;
	for (var i=1; i<=T; i++) {
		var line = lines[i];
		var N = line-0;

		if (N == 0) {
			if (!!output) output += "\n";
			output += "Case #" + i + ": INSOMNIA";
			continue;
		}

		var current = N;
		while (seen != 1023) {
			var c = current;
			while (c >= 1) {
				seen |= 1 << (c % 10);
				c = Math.floor(c/10);
			}
			current += N;
		} ;

		if (!!output) output += "\n";
		output += "Case #" + i + ": " + (current-N) + "";
		seen = 0;
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
