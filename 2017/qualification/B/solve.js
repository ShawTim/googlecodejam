const fs = require("fs");
const args = process.argv;

if (args.length < 3) {
	return console.error("Usage: nodejs <SCRIPT> <INPUT>");
}

const process_logic = (lines) => {
	// logic here...
	let output = "";

  const findNotTidy = (digits) => digits.reduce((acc, val, index) => (acc>=0)?((val >= acc)?val:0-index):acc, 0);
  const isTidy = (digits) => (findNotTidy(digits) < 0);

  const nextTidy = (digits) => {
    let index = findNotTidy(digits);

    if (index >= 0) return digits;

    index = 0-index;
    const newDigits = digits.map((digit, i) => {
      if (i == index-1) return digit-1;
      if (i < index) return digit;
      return 9;
    });
    return nextTidy(newDigits);
  };

  const T = lines.shift()-0;
  for (let i=0; i<T; i++) {
    const line = lines[i];
    const N = line.split('').map((c) => c-0);

    const tidy = nextTidy(N).join('').replace(/^0*/g, '');
    output += `Case #${i+1}: ${tidy}`;

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
