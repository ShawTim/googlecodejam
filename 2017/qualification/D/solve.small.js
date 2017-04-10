const fs = require("fs");
const args = process.argv;

if (args.length < 3) {
	return console.error("Usage: nodejs <SCRIPT> <INPUT>");
}

const process_logic = (lines) => {
	// logic here...
	let output = "";

  const m = {
    '.': 0,
    '+': 1,
    'x': 2,
    'o': 3,
  };
  const mm = [ '.', '+', 'x', 'o' ];

  const initGrid = (N) => {
    const grid = [];
    for (let i=0; i<N; i++) {
      const row = [];
      for (let j=0; j<N; j++) {
        row.push(0);
      }
      grid.push(row);
    }
    return grid;
  };

  const printGrid = (grid) => {
    let output = '';
    grid.forEach((row) => {
      row.forEach((cell) => output += mm[cell]);
      output += '\n';
    });
    console.log(output);
  };

  const putModel = (grid, models, model, r, c) => {
    grid[r][c] = m[model];
    models[`${r} ${c}`] = m[model];
  };
  const newModel = (grid, newModels, models, model, r, c) => {
    putModel(grid, newModels, model, r, c);
    putModel(grid, models, model, r, c);
  };
  const getPoints = (models) => {
    let point = 0;
    Object.keys(models).forEach((key) => {
      const model = models[key];
      point += (model == 3) ? 2 : 1;
    });
    return point;
  };

  const findModel = (models, model) => Object.keys(models).filter((key) => models[key] == m[model]);
  const findTrendy = (models) => findModel(models, 'o');
  const findCross = (models) => findModel(models, 'x');

  const isLegal = (grid, models) => {
    const N = grid.length;
    const legal = !Object.keys(models).some((key) => {
      const [r, c] = key.split(' ').map((k) => k-0);
      const model = models[key];
      let countR = 0;
      let countC = 0;
      let countD1 = 0;
      let countD2 = 0;
      const rcdiff = Math.abs(r-c);
      const rcsum = r+c;
      for (let i=0; i<N; i++) {
        // check row legal
        if (grid[r][i] & 2) countR++;
        // check column legal
        if (grid[i][c] & 2) countC++;
        // check diagonals legal
        if (i+rcdiff < N && (grid[i+rcdiff][i] & 1)) countD1++;
        if (rcsum-i >= 0 && rcsum-i < N && (grid[rcsum-i][i] & 1)) countD2++;
      }
      const legal = (countR <= 1) && (countC <= 1) && (countD1 <= 1) && (countD2 <= 1);
      return !legal;
    });
    return legal;
  };

  const T = lines.shift()-0;
  let num = 0;
  for (let i=0; i<T; i++) {
    const line = lines[num++];
    const [N, M] = line.split(' ').map((c) => c-0);
    const grid = initGrid(N);
    const models = {};
    const newModels = {};
    for (let j=0; j<M; j++) {
      const [model, r, c] = lines[num++].split(' ');
      putModel(grid, models, model, r-1, c-1);
    }
    
    // small size R = 1 for models, i.e. at most only 1 'o' or 'x'
    const trendys = findTrendy(models);
    const crosses = findCross(models);

    if (trendys.length == 0 && crosses.length == 0) {
      // upgrade 'o'
      newModel(grid, newModels, models, 'o', 0, 0);
      // fill all '+' on R1
      for (let j=0; j<N; j++) {
        if (!grid[0][j]) newModel(grid, newModels, models, '+', 0, j);
      }
      // fill '+' on RN
      for (let j=1; j<N-1; j++) {
        if (!grid[N-1][j]) newModel(grid, newModels, models, '+', N-1, j);
      }
      // fill 'x'
      for (let j=1; j<N; j++) {
        if (!grid[j][j]) newModel(grid, newModels, models, 'x', j, j);
      }
    } else if (trendys.length > 0) {
      const [trendyR, trendyC] = trendys[0].split(' ').map((c) => c-0);
      // fill all '+' on R1
      for (let j=0; j<N; j++) {
        if (!grid[0][j]) newModel(grid, newModels, models, '+', 0, j);
      }
      // fill '+' on RN
      for (let j=1; j<N-1; j++) {
        if (!grid[N-1][j]) newModel(grid, newModels, models, '+', N-1, j);
      }
      // fill 'x'
      for (let j=1; j<N; j++) {
        if (!grid[j][(trendyC+j)%N]) newModel(grid, newModels, models, 'x', j, (trendyC+j)%N);
        else newModel(grid, newModels, models, 'o', j, (trendyC+j)%N);
      }
    } else if (crosses.length > 0) {
      const [crossR, crossC] = crosses[0].split(' ').map((c) => c-0);
      // upgrade 'o'
      newModel(grid, newModels, models, 'o', crossR, crossC);
      // fill all '+' on R1
      for (let j=0; j<N; j++) {
        if (!grid[0][j]) newModel(grid, newModels, models, '+', 0, j);
      }
      // fill '+' on RN
      for (let j=1; j<N-1; j++) {
        if (!grid[N-1][j]) newModel(grid, newModels, models, '+', N-1, j);
      }
      // fill 'x'
      for (let j=1; j<N; j++) {
        if (!grid[j][(crossC+j)%N]) newModel(grid, newModels, models, 'x', j, (crossC+j)%N);
        else newModel(grid, newModels, models, 'o', j, (crossC+j)%N);
      }
    } else {
      // ?????
    }

//console.log('legal?', isLegal(grid, models));
//printGrid(grid);

    const points = getPoints(models);
    const newCount = Object.keys(newModels).length;
    output += `Case #${i+1}: ${points} ${newCount}`;
    Object.keys(newModels).forEach((key, index) => {
      const model = newModels[key];
      const [r, c] = key.split(' ').map((c) => c-0);
      output += `\n${mm[model]} ${r+1} ${c+1}`;
    });

    if (i < T-1) {
      output += '\n';
    }
  }

	//return '';
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
