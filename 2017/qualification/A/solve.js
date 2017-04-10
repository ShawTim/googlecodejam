const fs = require("fs");
const args = process.argv;

if (args.length < 3) {
	return console.error("Usage: nodejs <SCRIPT> <INPUT>");
}

const process_logic = (lines) => {
	// logic here...
	let output = "";

  const T = lines.shift()-0;
  for (let i=0; i<T; i++) {
    const line = lines[i];
    const [S, K1] = line.split(' ');
    const K = K1-0;
    const s = S.split('').map((c) => c == '+');
    let count = 0;

    for (let j=0; j<s.length-K+1; j++) {
      if (!s[j]) {
        for (let k=0; k<K; k++) {
          s[j+k] = !s[j+k];
        }
        count++;
      }
    }

    const possible = s.reduce((acc, val) => acc && val, true);
    output += `Case #${i+1}: ${possible?count:'IMPOSSIBLE'}`;

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
