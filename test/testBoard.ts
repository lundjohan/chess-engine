import { assert } from 'chai';
import { Board } from '../board';
import { Square } from '../enums';

const result = Board.newGame('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
describe('newGame() - initiation of Board members', function () {
    it('should have pieces at correct places', function () {
        assert.equal(result.getPieceAt(Square.c8), 'b');
        assert.equal(result.getPieceAt(Square.h2), 'P');
        assert.equal(result.getPieceAt(Square.a3), undefined);

    });

    it('should have set who to play next correctly', function () {
        assert.equal(result.whiteMoveNext, true);
    });
    it('should show the castlings availabilites', function () {
        assert.equal(result.castlingRights, 'KQkq');
    });
    it('should have correct en passant value', function () {
        assert.equal(result.enPassantSq, 'c6');
    });
    it('should have correct halfmove clock', function () {
        assert.equal(result.halfMoveClock, '0');
    });
    it('should have correct fullmove number', function () {
        assert.equal(result.fullMoveNumber, '2');
    });
});
const b = Board.newGame('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
describe('moveFEN() - moving pieces', function () {
    it('should move a pawn one step forward', function () {
        b.moveFEN('a2a3');
        assert.equal(b.getPieceAt(Square.a3), 'P');
        assert.equal(b.getPieceAt(Square.a2), undefined);
    });
});