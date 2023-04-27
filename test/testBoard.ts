import {assert} from 'chai';
import {Board} from '../board';

let board:Board = new Board();
const result = board.newGame('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
describe('newGame', function () {
    it('result should contain a board with an en passant as c6', function () {
        assert.equal(result.enPassantSq, 'c6');
    });
});