import { GameOfLife } from './game.js'

const game = new GameOfLife(25, 25);
game.animateGame();

console.log(game.grid);
