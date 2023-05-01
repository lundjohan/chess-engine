import { assert } from 'chai';
import { Board } from '../board';
import { Piece, Square } from '../enums';

//You can see above notation here: https://www.chessprogramming.org/Forsyth-Edwards_Notation
describe('newGame() - initiation of Board members', function () {
    const result = Board.newGame('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
    it('should have black bishop at c8', function () {
        assert.equal(result.getPieceAt(Square.c8), 'b');
    });
    it('should have black pawn at a7', function () {
        assert.equal(result.getPieceAt(Square.a7), 'p');
    });
    it('should have white pawn at h2', function () {
        assert.equal(result.getPieceAt(Square.h2), 'P');
    });
    it('should have white king at e1', function () {
        assert.equal(result.getPieceAt(Square.e1), 'K');
    });
    //check empty squares and piece after
    it('should have empty square at a5', function () {
        assert.equal(result.getPieceAt(Square.a5), undefined);
    });
    it('should have empty square at b5', function () {
        assert.equal(result.getPieceAt(Square.b5), undefined);
    });
    it('should have black pawn at c5', function () {
        assert.equal(result.getPieceAt(Square.c5), Piece.BLACK_PAWN);
    });
    it('should show undefined for empty square a3', function () {
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
        assert.equal(result.fullMoveNumber, 2);
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
describe('moveFEN() - en passant added when moving white pawn 2 steps', function () {
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
    const d = Board.newGame('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
    //move white, to get to black
    d.moveFEN('a2a4'); 

    //now move black
    d.moveFEN('a7a5');
    it('should move pawn two steps forward', function () {
        assert.equal(d.getPieceAt(Square.a5), 'p');
        assert.equal(d.getPieceAt(Square.a7), undefined);
    });
    it('should create correct en passant value on board', function () {
        assert.equal(d.enPassantSq, Square.a6);
    });
});
describe('moveFEN() - full move number', function () {
    const e = Board.newGame('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
    it('should here be initiated to 2', function () {
        assert.equal(e.fullMoveNumber, 2);
    });
    it('should not increase after white move', function () {
        e.moveFEN('b1c3');
        assert.equal(e.fullMoveNumber, 2);
    });
    it('should increase after black move', function () {
        e.moveFEN('b8c6');
        assert.equal(e.fullMoveNumber, 3);
    }
    );
});
describe('moveFEN() - where board', function () {
    //this board is different from the above, as both kings are free to move
    const f = Board.newGame('rnbqkbnr/pp1p1ppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
    it('should have castling rights KQkq', function () {
        assert.equal(f.castlingRights, 'KQkq');
    });
    it('should remove whites castling rights after white king move', function () {
        f.moveFEN('e1e2');
        assert.equal(f.castlingRights, 'kq');
    });
    it('should also remove blacks castling rights after black king move', function (){
        f.moveFEN('e8e7');
        assert.equal(f.castlingRights, '');
    });
});
describe('moveFEN() - where board', function () {
    //all rooks are free to move in this board
    const g = Board.newGame('rnbqkbnr/1p1pppp1/8/2p5/4P3/8/1PPP1PP1/RNBQKBNR w KQkq c6 0 2');
    it('should have castling rights KQkq', function () {
        assert.equal(g.castlingRights, 'KQkq');
    });
    it('should remove whites castling rights kingside only after that rook has moved', function () {
        g.moveFEN('h1h2');
        assert.equal(g.castlingRights, 'Qkq');
    });
    it('should remove blacks castling rights kingside only after that rook has moved', function (){
        g.moveFEN('h8h7');
        assert.equal(g.castlingRights, 'Qq');
    });
    it('should remove whites castling rights queenside after that rook has moved', function (){
        g.moveFEN('a1a2');
        assert.equal(g.castlingRights, 'q');
    });
    it('should remove blacks castling rights queenside after that rook has moved', function (){
        g.moveFEN('a8a7');
        assert.equal(g.castlingRights, '');
    });
});
describe('moveFEN() - where board', function () {
    /*in this board castling can be done on all fronts, 
    (there are full castling rights, 
        no check on king or on squares between [rook can be in 'check'], 
        and no pieces between king and rooks)*/
    const b = Board.newGame('r3k2r/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/R3K2R w KQkq c6 0 2');
    it('should have full castling rights KQkq', function () {
        assert.equal(b.castlingRights, 'KQkq');
    });
    //check that there are no pieces between king and rook queenside
    it('should have no pieces queenside white between king & rook', function(){
        assert.equal(b.getPieceAt(Square.b1), undefined);
        assert.equal(b.getPieceAt(Square.c1), undefined);
        assert.equal(b.getPieceAt(Square.d1), undefined);
    });
    it('should - queenside white - have rook & king at right starting places', function(){
        assert.equal(b.getPieceAt(Square.a1), Piece.WHITE_ROOK);
        assert.equal(b.getPieceAt(Square.e1), Piece.WHITE_KING);
    });  
    it('should make a complete queen white side castling',function(){
        b.moveFEN('e1c1');
        assert.equal(b.getPieceAt(Square.c1), 'K');
        assert.equal(b.getPieceAt(Square.d1), 'R');
        assert.equal(b.getPieceAt(Square.a1), undefined);
        assert.equal(b.getPieceAt(Square.e1), undefined);
    });
});