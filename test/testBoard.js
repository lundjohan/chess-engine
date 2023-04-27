var chai_1 = require('chai');
var board_1 = require('../board');
let board = new board_1.Board();
const result = board.newGame('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
describe('newGame', function () {
    it('result should contain a board with an en passant as c6', function () {
        chai_1.assert.equal(result.enPassantSq, 'c6');
    });
});
