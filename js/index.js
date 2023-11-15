const game = document.querySelector(".grid");
const rows = 20;
const cols = 20;

const grid = new Array(rows).fill(null).map(() => new Array(cols).fill(false));

function initGrid() {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = Math.random() < 0.5;
      }
    }
}

function renderGrid() {
    game.innerHTML = '';

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.style.backgroundColor = grid[i][j] ? '#333' : '#fff';
        game.appendChild(cellDiv)
      }
      game.appendChild(document.createElement('br'));
    }
}

function updateGrid() {
    const newGrid = new Array(rows).fill(null).map(() => new Array(cols).fill(false));

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const neighbors = countNeighbors(i, j);
        if (grid[i][j]) {
          newGrid[i][j] = neighbors === 2 || neighbors === 3;
        } else {
          newGrid[i][j] = neighbors === 3;
        }
      }
    }

    grid.splice(0, grid.length, ...newGrid);
}

function countNeighbors(row, col) {
    let count = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;

        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && !(i === 0 && j === 0)) {
          count += grid[newRow][newCol] ? 1 : 0;
        }
      }
    }

    return count;
}

function animateGame() {
    initGrid();
    setInterval(() => {
      renderGrid();
      updateGrid();
    }, 500);
}

animateGame();

console.log(grid);
