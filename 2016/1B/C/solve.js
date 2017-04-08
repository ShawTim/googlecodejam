var fs = require("fs");
var args = process.argv;

if (args.length < 3) {
	return console.error("Usage: nodejs <SCRIPT> <INPUT>");
}

var process_logic = function(lines) {
	// logic here...
	var output = "";

	var T = lines[0]-0;
	var num = 1;
	for (var i=0; i<T; i++) {
		var N = lines[num]-0;
		var topics = [];
		var tmp = [];
		for (var j=0; j<N; j++) {
			tmp.push(lines[num+j+1]);
		}
		tmp.sort();
		for (var j=0; j<tmp.length; j++) {
			var obj = { words: tmp[j].split(" "), fake: true };
			topics.push(obj);
		}
		num += N+1;

		var wordCount = topics[0].words.length;
		for (var j=0; j<wordCount; j++) {
			var unique = {};
			for (var k=0; k<topics.length; k++) {
				if (unique[topics[k].words[j]]) unique[topics[k].words[j]]++;
				else unique[topics[k].words[j]] = 1;
			}
			for (var k=0; k<topics.length; k++) {
				if (unique[topics[k].words[j]] == 1) {
					topics[k].fake = false;
				}
			}
		}
		
		var ans = 0;
		for (var j=0; j<topics.length; j++) {
			if (topics[j].fake) {
				for (var k=j+1; k<topics.length; k++) {
					if (topics[j].words[0] != topics[k].words[0]) {
						if (k>j+1) topics[k-1].fake = false;
						break;
					}
					if (!topics[k].fake) break;
					if (k == topics.length-1) topics[k].fake = false;
				}
				ans++;
			}
		}

		if (output) output += "\n";
		output += "Case #" + (i+1) + ": " + ans;
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
