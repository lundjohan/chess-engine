import {Board} from './board';
//to remove, it is olnly used as a complement for testing, here I can use debugging with checkpoints.
console.log("Johan ska tuffa till sig lite");

console.log("intiate board");
const b = Board.newGame('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
console.log('move white pawn 2 steps forward');
b.moveFEN('a2a3');
console.log('move black pawn 2 steps forward');
b.moveFEN('a7a5');
console.log('now a6 should be en passant');
console.log ('b.enPassantSq: ', b.enPassantSq);
