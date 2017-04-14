const fs = require("fs");
const args = process.argv;

if (args.length < 3) {
	return console.error("Usage: nodejs <SCRIPT> <INPUT>");
}

const process_logic = (lines) => {
	// logic here...
	let output = "";

  const T = lines.shift()-0;
  let num = 0;
  for (let i=0; i<T; i++) {
    const N = lines[num++]-0;
    const rows = [];
    for (let j=0; j<2*N-1; j++) {
      rows.push(lines[num++].split(' ').map((h) => h-0));
    }

    const heights = {};
    rows.forEach((row) => row.forEach((height) => {
      heights[height] = heights[height] ? heights[height]+1 : 1;
    }));

    const missing = [];
    Object.keys(heights).forEach((height) => {
      if (heights[height] & 1) {
        missing.push(height-0);
      }
    });
    missing.sort((a, b) => a-b);

    output += `Case #${i+1}: ${missing.join(' ')}`;

    if (i < T-1) {
      output += '\n';
    }
  }

	return output;
};

const input_file = args[2];
fs.readFile(input_file, "utf8", (err, raw) => {
	if (err) {
		return console.error(err);
	}
	const data = raw.split("\n");
	console.log(process_logic(data));	
});
