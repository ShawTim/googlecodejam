const fs = require("fs");
const bigint = require("big-integer");
const args = process.argv;

if (args.length < 3) {
	return console.error("Usage: nodejs <SCRIPT> <INPUT>");
}

const process_logic = (lines) => {
	// logic here...
	let output = "";

  const calculate = (N, K) => {
    let left = bigint.zero;
    let right = bigint.zero;
    while (K.greater(0) && N.greater(0)) {
      const pickMax = K.isEven();
      left = N.isEven() ? N.minus(2).divide(2) : N.minus(1).divide(2);
      right = N.isEven() ? N.divide(2) : N.minus(1).divide(2);
      K = K.divide(2);
      N = pickMax ? right : left;
    }

    return { left, right };
  };

  const T = lines.shift()-0;
  for (let i=0; i<T; i++) {
    const line = lines[i];
    const [N, K] = line.split(' ').map((c) => bigint(c));

    const { left, right } = calculate(N, K);

    output += `Case #${i+1}: ${right.toString()} ${left.toString()}`;

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
