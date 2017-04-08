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
		var C_J = lines[i].split(" ");
		var C = C_J[0];
		var J = C_J[1];

		var C_pos = {};
		var J_pos = {};
		var Both_pos = {};
		for (var j=0; j<C.length; j++) {
			var isC = C.charAt(j) == '?';
			var isJ = J.charAt(j) == '?';

			if (isC && isJ) {
				Both_pos[j] = 1;
			} else if (isC) {
				C_pos[j] = 1;
			} else if (isJ) {
				J_pos[j] = 1;
			}
		}

		var C_all = [C];
		var J_all = [J];

		for (var p in C_pos) {
			p = p-0;
			var C_tmp = [];
			for (var j=0; j<C_all.length; j++) {
				var c_all = C_all[j];
				C_all[j] = c_all.substr(0, p) + J.charAt(p) + c_all.substr(p+1);
				if (!C_pos[p+1]) {
					C_all[j] = c_all.substr(0, p) + J.charAt(p) + c_all.substr(p+1);
					C_tmp.push(c_all.substr(0, p) + ((J.charAt(p)-0+1)%10) + c_all.substr(p+1));
					C_tmp.push(c_all.substr(0, p) + ((J.charAt(p)-0+9)%10) + c_all.substr(p+1));
					C_tmp.push(c_all.substr(0, p) + "0" + c_all.substr(p+1));
					C_tmp.push(c_all.substr(0, p) + "9" + c_all.substr(p+1));
				}
			}
			C_all = C_all.concat(C_tmp);
		}

		for (var p in J_pos) {
			p = p-0;
			var J_tmp = [];
			for (var j=0; j<J_all.length; j++) {
				var j_all = J_all[j];
				J_all[j] = j_all.substr(0, p) + C.charAt(p) + j_all.substr(p+1);
				if (!J_pos[p+1]) {
					J_tmp.push(j_all.substr(0, p) + ((C.charAt(p)-0+1)%10-0) + j_all.substr(p+1));
					J_tmp.push(j_all.substr(0, p) + ((C.charAt(p)-0+9)%10-0) + j_all.substr(p+1));
					J_tmp.push(j_all.substr(0, p) + "0" + j_all.substr(p+1));
					J_tmp.push(j_all.substr(0, p) + "9" + j_all.substr(p+1));
				}
			}
			J_all = J_all.concat(J_tmp);
		}

		for (var p in Both_pos) {
			p = p-0;
			var C_tmp = [];
			var J_tmp = [];
			for (var j=0; j<C_all.length; j++) {
				var c_all = C_all[j];
				C_all[j] = c_all.substr(0, p) + "0" + c_all.substr(p+1);
				if (!C_pos[p+1]) {
					C_tmp.push(c_all.substr(0, p) + "1" + c_all.substr(p+1));
					C_tmp.push(c_all.substr(0, p) + "9" + c_all.substr(p+1));
				}
			}
			for (var j=0; j<J_all.length; j++) {
				var j_all = J_all[j];
				J_all[j] = j_all.substr(0, p) + "0" + j_all.substr(p+1);
				if (!J_pos[p+1]) {
					J_tmp.push(j_all.substr(0, p) + "1" + j_all.substr(p+1));
					J_tmp.push(j_all.substr(0, p) + "9" + j_all.substr(p+1));
				}
			}
			C_all = C_all.concat(C_tmp);
			J_all = J_all.concat(J_tmp);
		}

		C_all.sort();
		J_all.sort();

		var ans = "";
		var diff = Number.MAX_VALUE;
		for (var j=0; j<C_all.length; j++) {
			for (var k=0; k<J_all.length; k++) {
				if (Math.abs(C_all[j]-J_all[k]) < diff) {
					diff = Math.abs(C_all[j]-J_all[k]);
					ans = C_all[j] + " " + J_all[k];
				}
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
