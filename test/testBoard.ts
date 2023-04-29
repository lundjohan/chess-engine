import { assert } from 'chai';
import { Board } from '../board';
import { Square } from '../enums';

//You can see above notation here: https://www.chessprogramming.org/Forsyth-Edwards_Notation
describe('newGame() - initiation of Board members', function () {
    const result = Board.newGame('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
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
        assert.equal(result.enPassantSq, Square.c6);
    });
    it('should have correct halfmove clock', function () {
        assert.equal(result.halfMoveClock, '0');
    });
    it('should have correct fullmove number', function () {
        assert.equal(result.fullMoveNumber, '2');
    });
});
describe('moveFEN() - moving pieces', function () {
    const b = Board.newGame('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
    it('should move a pawn one step forward', function () {
        b.moveFEN('a2a3');
        assert.equal(b.getPieceAt(Square.a3), 'P');
        assert.equal(b.getPieceAt(Square.a2), undefined);
    });
    it('should after move change turn from white to black', function () {
        //it should now be black's turn
        assert.equal(b.whiteMoveNext, false);
    });
});
describe('moveFEN() - en passant added when moving pawn 2 steps', function () {
    const c = Board.newGame('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
    it('should move a pawn two step forward', function () {
        c.moveFEN('a2a4');
        assert.equal(c.getPieceAt(Square.a4), 'P');
        assert.equal(c.getPieceAt(Square.a2), undefined);
    });
    it('should after move have created correct en passant value on board', function () {
        assert.equal(c.enPassantSq, Square.a3);
    });
});
describe('moveFEN() - en passant added when moving black', function () {
    const c = Board.newGame('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
    console.log ("c.enPassantSq before white move", c.enPassantSq);
    //move white, to get to black
    c.moveFEN('a2a3');


    console.log("c.enPassantSq after white move", c.enPassantSq);
    //now move black
    c.moveFEN('a7a5');
    console.log("c.enPassantSq after black move", c.enPassantSq);
    it('should move pawn two steps forward', function () {
        
        assert.equal(c.getPieceAt(Square.a5), 'p');
        assert.equal(c.getPieceAt(Square.a7), undefined);
    });
    it('should have created correct en passant value on board', function () {
        assert.equal(c.enPassantSq, Square.a6);
    });
});