var fs = require("fs");
var args = process.argv;

if (args.length < 3) {
	return console.error("Usage: nodejs <SCRIPT> <INPUT>");
}

var process_logic = function(lines) {
	// logic here...
	var output = "";

	var T = lines[0]-0;
	var lineNum = 1;
	for (var i=1; i<=T; i++) {
		var N = lines[lineNum]-0;
		var rowcolstr = [];
		var rowcol = [];
		var headMap = {};
		var tailMap = {};
		var shortest = 2501;
		var tallest = 0;
		for (var j=1; j<2*N; j++) {
			var rc = lines[lineNum+j];
			var rcs = rc.split(" ");
			for (var k=0; k<N; k++) {
				rcs[k] = rcs[k]-0;
			}
			rowcol.push(rcs);
			rowcolstr.push(rc);

			if (!headMap[rcs[0]]) headMap[rcs[0]] = [];
			headMap[rcs[0]].push({ rcs: rcs, rc: 0});
			if (!tailMap[rcs[N-1]]) tailMap[rcs[N-1]] = [];
			tailMap[rcs[N-1]].push({ rcs: rcs, rc: 0});

			if (rcs[0] < shortest) shortest = rcs[0];
			if (rcs[N-1] > tallest) tallest = rcs[N-1];
		}
		lineNum += 2*N;

		var ans = [];

		if (headMap[shortest].length < 2) {
			// miss 1st row/column
			var firstRowCol = headMap[shortest][0].rcs;
			var lastRow = tailMap[tallest][0].rcs;
			var lastColumn = tailMap[tallest][1].rcs;

			var isColumn = true;
			for (var j=0; j<N; j++) {
				var tail = tailMap[lastColumn[j]];
				if (tail.length == 1) {
					tail[0].rc = tail[0].rcs[0] == firstRowCol[0] ? 'c' : 'r';
					isColumn &= tail[0].rc == 'c';
				} else {
					tail[0].rc = tail[0].rcs[0] == firstRowCol[0] ? 'c' : 'r';
					tail[1].rc = tail[0].rc == 'c' ? 'r' : 'c';
				}
			}

			if (isColumn) {
				// 1st row is missing
				for (var j=0; j<N; j++) {
					var tail = tailMap[lastRow[j]];
					if (tail.length == 1) {
						ans.push(tail[0].rcs[0]);
					} else {
						var rcs = tail[0].rc == 'c' ? tail[0].rcs : tail[1].rcs;
						ans.push(rcs[0]);
					}
				}
			} else {
				// 1st column is missing
				for (var j=0; j<N; j++) {
					var tail = tailMap[lastColumn[j]];
					if (tail.length == 1) {
						ans.push(tail[0].rcs[0]);
					} else {
						var rcs = tail[0].rc == 'r' ? tail[0].rcs : tail[1].rcs;
						ans.push(rcs[0]);
					}
				}
			}

		} else if (tailMap[tallest].length < 2) {
			// miss last row/column
			var lastRowCol = tailMap[tallest][0].rcs;
			var firstRow = headMap[shortest][0].rcs;
			var firstColumn = headMap[shortest][1].rcs;

			var isColumn = true;
			for (var j=0; j<N; j++) {
				var head = headMap[firstColumn[j]];
				if (head.length == 1) {
					head[0].rc = head[0].rcs[N-1] == lastRowCol[N-1] ? 'c' : 'r';
					isColumn &= head[0].rc == 'c';
				} else {
					head[0].rc = head[0].rcs[N-1] == lastRowCol[N-1] ? 'c' : 'r';
					head[1].rc = head[0].rc == 'c' ? 'r' : 'c';
				}
			}

			if (isColumn) {
				// last row is missing
				for (var j=0; j<N; j++) {
					var head = headMap[firstRow[j]];
					if (head.length == 1) {
						ans.push(head[0].rcs[N-1]);
					} else {
						var rcs = head[0].rc == 'c' ? head[0].rcs : head[1].rcs;
						ans.push(rcs[N-1]);
					}
				}
			} else {
				// last column is missing
				for (var j=0; j<N; j++) {
					var head = headMap[firstColumn[j]];
					if (head.length == 1) {
						ans.push(head[0].rcs[N-1]);
					} else {
						var rcs = head[0].rc == 'r' ? head[0].rcs : head[1].rcs;
						ans.push(rcs[N-1]);
					}
				}
			}
		} else {
			var firstRow = headMap[shortest][0].rcs;
			var firstColumn = headMap[shortest][1].rcs;
			var lastRow = tailMap[tallest][(firstRow[N-1] == tailMap[tallest][0].rcs[0]) ? 0 : 1].rcs;
			var lastColumn = tailMap[tallest][(firstRow[N-1] == tailMap[tallest][0].rcs[0]) ? 1 : 0].rcs;

			var grid = new Array(N);
			for (var j=0; j<N; j++) {
				grid[j] = new Array(N);
			}

			for (var j=0; j<N; j++) {
				var head = headMap[firstColumn[j]];
				if (!head) {
					continue;
				} else if (head.length == 1) {
					head[0].rc = 'r';
				} else {
					head[0].rc = head[0].rcs[N-1] == lastColumn[N-1] ? 'r' : 'c';
					head[1].rc = head[0].rc == 'c' ? 'r' : 'c';
				}
				var tail = tailMap[lastColumn[j]];
				if (!tail) {
					continue;
				} else if (tail.length == 1) {
					tail[0].rc = 'r';
				} else {
					tail[0].rc = tail[0].rcs[0] == firstColumn[0] ? 'r' : 'c';
					tail[1].rc = tail[0].rc == 'c' ? 'r' : 'c';
				}
			}
			for (var j=0; j<N; j++) {
				var head = headMap[firstRow[j]];
				if (!head) {
					continue;
				} else if (head.length == 1) {
					head[0].rc = 'c';
				} else {
					head[0].rc = head[0].rcs[N-1] == lastRow[N-1] ? 'c' : 'r';
					head[1].rc = head[0].rc == 'c' ? 'r' : 'c';
				}
				var tail = tailMap[lastRow[j]];
				if (!tail) {
					continue;
				} else if (tail.length == 1) {
					tail[0].rc = 'c';
				} else {
					tail[0].rc = tail[0].rcs[0] == firstRow[0] ? 'c' : 'r';
					tail[1].rc = tail[0].rc == 'c' ? 'r' : 'c';
				}
			}

			for (var j=0; j<N; j++) {
				var head = headMap[firstColumn[j]];
				if (head.length == 1) {
					for (var k=0; k<N; k++) {
						grid[j][k] = head[0].rcs[k];
					}
				} else {
					var h = head[0].rc == 'r' ? head[0] : head[1];
					for (var k=0; k<N; k++) {
						grid[j][k] = h.rcs[k];
					}
				}
			}

			for (var j=0; j<N; j++) {
				var str = grid[j].join(" ");
				if (rowcolstr.indexOf(str) < 0) {
					ans = grid[j];
				}
			}

			for (var j=0; j<N; j++) {
				var a = [];
				for (var k=0; k<N; k++) {
					a.push(grid[k][j]);
				}
				var str = a.join(" ");
				if (rowcolstr.indexOf(str) < 0) {
					ans = a;
				}
			}
console.log(grid);
		}

		if (!!output) output += "\n";
		output += "Case #" + i + ": " + ans.join(" ");

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
