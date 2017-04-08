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
		var S = lines[i];
		var ans = S.charAt(0);
		for (var j=1; j<S.length; j++) {
			var c = S.charAt(j);
			if (ans+c > c+ans) {
				ans += c;
			} else {
				ans = c+ans;
			}
		}
		if (output) output += "\n";
		output += "Case #" + i + ": " + ans;
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
