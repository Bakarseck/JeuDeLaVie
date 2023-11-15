// index.js

// Variables pour définir la taille du tableau
const rows = 30;
const cols = 30;

// Création du tableau pour représenter le jeu
let grid;

// Fonction pour initialiser le tableau avec des cellules aléatoires vivantes
function initializeGrid() {
    grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            grid[i][j] = Math.random() > 0.7 ? 1 : 0; // 30% de chances d'être vivant
        }
    }
}

// Fonction pour afficher le jeu dans le conteneur HTML
function displayGrid() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = "";
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell", grid[i][j] ? "alive" : "dead");
            cell.style.background = grid[i][j] ? 'red' : 'green'
            cell.addEventListener("click", () => toggleCell(i, j));
            gameContainer.appendChild(cell);
        }
    }
}

// Fonction pour faire évoluer le jeu d'une génération
function evolve() {
    const newGrid = new Array(rows);
    for (let i = 0; i < rows; i++) {
        newGrid[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            const neighbors = countNeighbors(i, j);
            if (grid[i][j] === 1) {
                newGrid[i][j] = neighbors === 2 || neighbors === 3 ? 1 : 0;
            } else {
                newGrid[i][j] = neighbors === 3 ? 1 : 0;
            }
        }
    }
    grid = newGrid;
}

// Fonction pour compter le nombre de voisins vivants d'une cellule
function countNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                count += grid[newRow][newCol];
            }
        }
    }
    count -= grid[row][col]; // Soustraire la cellule centrale
    return count;
}

function toggleCell(row, col) {
    grid[row][col] = 1 - grid[row][col];
    displayGrid();
}

// Fonction pour démarrer le jeu
function startGame() {
    setInterval(() => {
        evolve();
        displayGrid();
    }, 1000); // Mettez à jour toutes les secondes (ajustez selon vos préférences)
}

// Fonction pour effacer le jeu
function clearGame() {
    grid = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
    displayGrid();
}

// Initialisation du jeu lors du chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    initializeGrid();
    displayGrid();
});
