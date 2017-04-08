var BigInt = require("big-integer");
var fs = require("fs");
var args = process.argv;

if (args.length < 3) {
	return console.error("Usage: nodejs <SCRIPT> <INPUT>");
}

var process_logic = function(lines) {
	// logic here...
	var output = "Case #1:";

	var N_J = lines[1].split(" ");
	var N = N_J[0];
	var J = N_J[1];

	var current = BigInt(10).pow(N-1).add(1).toString();

	var nextNum = function(numStr) {
		return (parseInt(numStr, 2)+2 >>> 0).toString(2);
	};
	var getNonTrivialDivisor = function(bigint) {
		for (var i=2; bigint.gt(i) && i<100; i++) {
			if (bigint.mod(i) == 0) return i;
		}
		return false;
	};
	var getJamcoinDivisors = function(numStr) {
		var divisors = [];

		for (var p=2; p<=10; p++) {
			var num = BigInt(numStr, p);
			var d = getNonTrivialDivisor(num);

			if (!d) return false;

			divisors.push(d);
		}

		return divisors;
	};

	for (var i=0; i<J; i++) {
		var divisors = false;
		while (!divisors) {
			current = nextNum(current);
			divisors = getJamcoinDivisors(current);
		}
		output += "\n" + current + " " + divisors.join(" ");
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
