import {assert} from 'chai';
import {Board} from '../board';

let board:Board = new Board();
const result = board.newGame('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
describe('newGame() - initiation of Board members', function () {
    it('should have correct en passant value', function () {
        assert.equal(result.enPassantSq, 'c6');
    });
    it('should have set who to play next correctly', function () {
        assert.equal(result.whiteMoveNext, true);
    });
});