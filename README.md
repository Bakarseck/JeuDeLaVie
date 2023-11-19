# Conway's Game of Life

Conway's Game of Life is a cellular automaton devised by mathematician John Conway. It is a zero-player game, meaning that its evolution is determined by its initial state, with no further input. The game is known for its simple rules but intricate and unpredictable outcomes.

## Rules

1. **Birth**: A dead cell with exactly three live neighbors becomes a live cell.
2. **Death by isolation**: A live cell with fewer than two live neighbors dies.
3. **Death by overcrowding**: A live cell with more than three live neighbors dies.
4. **Survival**: A live cell with two or three live neighbors survives.

## Implementation

This implementation of the Game of Life is written in `HTML`, `CSS` and `JS`. The main components include:

- **Grid**: Represents the game board, where each cell can be either alive or dead.

```js
      this.game = document.querySelector(".grid");

      createInitialGrid() {
         for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                  const index = this.getIndex(i, j);
                  this.grid[index] = Math.random() < 0.5;
            }
         }
      }
```

- **Update Function**: Determines the next state of the grid based on the rules.

```js
    updateGrid() {
      const newGrid = new Array(this.rows * this.cols).fill(false);

      for (let i = 0; i < this.rows; i++) {
         for (let j = 0; j < this.cols; j++) {
               const index = this.getIndex(i, j);
               const neighbors = this.countNeighbors(i, j);

               if (this.grid[index]) {
                  newGrid[index] = neighbors === 2 || neighbors === 3;
               } else {
                  newGrid[index] = neighbors === 3;
               }
         }
      }

      if (this.compareGrids(this.grid, newGrid)) {
         this.stable = true;
      }

      this.grid = newGrid;
      }
```

- **RenderGrid**: Renders the grid in the UI, displaying black color for live cells and white color for dead cells.

```js
   renderGrid() {
      const htmlString = this.grid
         .map((cell, index) => `<div class="cell" style="background-color: ${cell ? '#333' : '#fff'}"></div>${(index + 1) % this.cols === 0 ? '<br>' : ''}`)
         .join('');

      this.game.innerHTML = htmlString;
      const text = document.querySelector('.text')
      if (!this.stable) {
         this.generation.textContent = `${this.step}`
         this.step++
      } else {
         text.remove();
         this.generation.textContent = `Stables après ${this.step} générations`;
         this.generation.style.lineHeight = 1.5;
      }
   }
```

## Getting Started

1. **Clone the Repository:**
   ```bash
      git clone https://github.com/Bakarseck/JeuDeLaVie.git
      cd JeuDeLaVie
   ```

Open the file index.html with liveserver or directly with the browser

## Author 

 * [Bakarseck](https://github.com/Bakarseck)

