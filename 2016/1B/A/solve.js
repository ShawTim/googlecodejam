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
		var map = {};
		for (var j=0; j<S.length; j++) {
			var c = S.charAt(j);
			if (map[c]) map[c]++;
			else map[c] = 1;
		}

		var ansMap = {};
		// ZERO
		if (map['Z']) {
			var count = map['Z'];
			ansMap['0'] = count;
			map['Z'] = 0;
			map['E'] -= count;
			map['R'] -= count;
			map['O'] -= count;
		}
		// TWO
		if (map['W']) {
			var count = map['W'];
			ansMap['2'] = count;
			map['W'] = 0;
			map['T'] -= count;
			map['O'] -= count;
		}
		// FOUR
		if (map['U']) {
			var count = map['U'];
			ansMap['4'] = count;
			map['U'] = 0;
			map['F'] -= count;
			map['O'] -= count;
			map['R'] -= count;
		}
		// SIX
		if (map['X']) {
			var count = map['X'];
			ansMap['6'] = count;
			map['X'] = 0;
			map['S'] -= count;
			map['I'] -= count;
		}
		// EIGHT
		if (map['G']) {
			var count = map['G'];
			ansMap['8'] = count;
			map['G'] = 0;
			map['E'] -= count;
			map['I'] -= count;
			map['H'] -= count;
			map['T'] -= count;
		}
		// FIVE
		if (map['F']) {
			var count = map['F'];
			ansMap['5'] = count;
			map['F'] = 0;
			map['I'] -= count;
			map['V'] -= count;
			map['E'] -= count;
		}
		// SEVEN
		if (map['V']) {
			var count = map['V'];
			ansMap['7'] = count;
			map['V'] = 0;
			map['S'] -= count;
			map['E'] -= count;
			map['E'] -= count;
			map['N'] -= count;
		}
		// ONE
		if (map['O']) {
			var count = map['O'];
			ansMap['1'] = count;
			map['O'] = 0;
			map['N'] -= count;
			map['E'] -= count;
		}
		// NINE
		if (map['I']) {
			var count = map['I'];
			ansMap['9'] = count;
			map['I'] = 0;
			map['N'] -= count;
			map['N'] -= count;
			map['E'] -= count;
		}
		// THREE
		if (map['H']) {
			var count = map['H'];
			ansMap['3'] = count;
			map['H'] = 0;
			map['T'] -= count;
			map['R'] -= count;
			map['E'] -= count;
			map['E'] -= count;
		}

		var ans = "";
		for (var j=0; j<10; j++) {
			var count = ansMap[j+""];
			for (var k=0; k<count; k++) ans += j;
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
