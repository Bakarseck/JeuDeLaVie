/* The `GameOfLife` class represents the Game of Life and provides methods for creating and updating
the grid, counting neighbors, and animating the game. */
export class GameOfLife {
    /**
     * The constructor function initializes a grid with a specified number of rows and columns and
     * creates an initial grid with all cells set to false.
     * @param rows - The "rows" parameter represents the number of rows in the grid. It determines how
     * many horizontal lines or rows will be present in the grid.
     * @param cols - The `cols` parameter represents the number of columns in the grid. It determines
     * the width of the grid.
     */
    constructor(rows, cols) {
        this.game = document.querySelector(".grid");
        this.generation = document.querySelector('.generation')
        this.rows = rows;
        this.cols = cols;
        this.step = 0;
        this.grid = new Array(this.rows * this.cols).fill(false);
        this.createInitialGrid();
    }

    /**
     * The function "createInitialGrid" sets specific cells in a grid to be true.
     */
    createInitialGrid() {
        this.grid[this.getIndex(5, 4)] = true;
        this.grid[this.getIndex(5, 5)] = true;
        this.grid[this.getIndex(6, 3)] = true;
        this.grid[this.getIndex(6, 4)] = true;
        this.grid[this.getIndex(7, 4)] = true;
    }

    /**
     * The `renderGrid` function generates an HTML string representing a grid of cells with alternating
     * background colors.
     */
    renderGrid() {
        const htmlString = this.grid
            .map((cell, index) => `<div class="cell" style="background-color: ${cell ? '#333' : '#fff'}"></div>${(index + 1) % this.cols === 0 ? '<br>' : ''}`)
            .join('');

        this.game.innerHTML = htmlString;
        this.generation.textContent = `${this.step}`
        this.step++
    }

    /**
     * The function updates the grid based on the rules of the Game of Life.
     */
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

        this.grid = newGrid;
    }

    /**
     * The function counts the number of neighboring cells that are populated in a grid.
     * @param row - The row parameter represents the current row index in a grid or matrix. It is used
     * to calculate the neighboring cells in the grid.
     * @param col - The `col` parameter represents the column index of a cell in a grid.
     * @returns The count of neighbors for the given row and column.
     */
    countNeighbors(row, col) {
        let count = 0;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;

                if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols && !(i === 0 && j === 0)) {
                    count += this.grid[this.getIndex(newRow, newCol)] ? 1 : 0;
                }
            }
        }

        return count;
    }

    /**
     * The function returns the index of a cell in a two-dimensional grid given its row and column.
     * @param row - The row parameter represents the row number in a two-dimensional grid or matrix. It
     * is used to calculate the index of an element in the grid.
     * @param col - The column index of the element in a 2D array.
     * @returns the index of a specific element in a two-dimensional array. The index is calculated by
     * multiplying the row number by the number of columns and adding the column number.
     */
    getIndex(row, col) {
        return row * this.cols + col;
    }

    /**
     * The `animateGame` function continuously renders and updates the grid using the `renderGrid` and
     * `updateGrid` functions, respectively.
     */
    animateGame() {
        setInterval(() => {
            this.renderGrid();
            this.updateGrid();
        }, 100);
    }
}
