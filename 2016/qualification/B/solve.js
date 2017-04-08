var fs = require("fs");
var args = process.argv;

if (args.length < 3) {
	return console.error("Usage: nodejs <SCRIPT> <INPUT>");
}

var process_logic = function(lines) {
	// logic here...
	var output = "";

	var T = lines[0]-0;
	for (var i=1; i<=T; i++) {
		var pancakes = lines[i].split("");
		var count = 0;

		for (var j=1; j<pancakes.length; j++) {
			if (pancakes[j] != pancakes[j-1]) count++;
		}
		if (pancakes[pancakes.length-1] == '-') count++;

		if (!!output) output += "\n";
		output += "Case #" + i + ": " + count;
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
