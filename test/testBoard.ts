import { assert } from 'chai';
import { Board, toFen } from '../board';
import { Piece, Square, Direction } from '../enums';

//You can see above notation here: https://www.chessprogramming.org/Forsyth-Edwards_Notation
describe('Chess Board', function () {
    describe('toFen() - state to FEN notation', function () {
        const result = Board.newGame('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
        it('should make printBoard output correct FEN for board, castlerights etc', function () {
            let fenFromBoard = toFen(result);
            assert.equal(fenFromBoard, 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
        });
    });
    describe('newGame() - initiation of Board members', function () {
        const result = Board.newGame('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
        describe('Piece positions', function () {
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
            //check empty squares and piece after at row 5
            it('should have empty square at a5', function () {
                assert.equal(result.getPieceAt(Square.a5), undefined);
            });
            it('should have empty square at b5', function () {
                assert.equal(result.getPieceAt(Square.b5), undefined);
            });
            it('should have black pawn at c5', function () {
                assert.equal(result.getPieceAt(Square.c5), Piece.BLACK_PAWN);
            });
            it('should have empty square at d5', function () {
                assert.equal(result.getPieceAt(Square.d5), undefined);
            });
            //check empty squares and piece after at row 4
            it('should have empty square at a4', function () {
                assert.equal(result.getPieceAt(Square.a4), undefined);
            });
            it('should have empty square at b4', function () {
                assert.equal(result.getPieceAt(Square.b4), undefined);
            });
            it('should have empty square at c4', function () {
                assert.equal(result.getPieceAt(Square.c4), undefined);
            });
            it('should have empty square at d4', function () {
                assert.equal(result.getPieceAt(Square.d4), undefined);
            });
            it('should have white pawn at e4', function () {
                assert.equal(result.getPieceAt(Square.e4), Piece.WHITE_PAWN);
            });
            it('should have empty square at f4', function () {
                assert.equal(result.getPieceAt(Square.f4), undefined);
            });
            //row 2
            it('should have white pawn at a2', function () {
                assert.equal(result.getPieceAt(Square.a2), Piece.WHITE_PAWN);
            });
            it('should have white pawn at b2', function () {
                assert.equal(result.getPieceAt(Square.b2), Piece.WHITE_PAWN);
            });
            it('should have white pawn at c2', function () {
                assert.equal(result.getPieceAt(Square.c2), Piece.WHITE_PAWN);
            });
            it('should have white pawn at d2', function () {
                assert.equal(result.getPieceAt(Square.d2), Piece.WHITE_PAWN);
            });
            it('should be empty square at e2', function () {
                assert.equal(result.getPieceAt(Square.e2), undefined);
            });
            it('should have white pawn at f2', function () {
                assert.equal(result.getPieceAt(Square.f2), Piece.WHITE_PAWN);
            });
            it('should have white pawn at g2', function () {
                assert.equal(result.getPieceAt(Square.g2), Piece.WHITE_PAWN);
            });
            it('should have white pawn at h2', function () {
                assert.equal(result.getPieceAt(Square.h2), Piece.WHITE_PAWN);
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
                assert.equal(result.halfMoveClock, 0);
            });
            it('should have correct fullmove number', function () {
                assert.equal(result.fullMoveNumber, 2);
            });
        });
    });
    describe('moveFEN() - moving pieces', function () {
        const b = Board.newGame('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2');
        describe('when moving a pawn one step forward', function () {
            b.moveFEN('a2a3');
            it('should be a pawn in to-square', function () {
                assert.equal(b.getPieceAt(Square.a3), 'P');
            });
            it('should be empty in from-square', function () {
                assert.equal(b.getPieceAt(Square.a2), undefined);
            });
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
        it('should also remove blacks castling rights after black king move', function () {
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
        it('should remove blacks castling rights kingside only after that rook has moved', function () {
            g.moveFEN('h8h7');
            assert.equal(g.castlingRights, 'Qq');
        });
        it('should remove whites castling rights queenside after that rook has moved', function () {
            g.moveFEN('a1a2');
            assert.equal(g.castlingRights, 'q');
        });
        it('should remove blacks castling rights queenside after that rook has moved', function () {
            g.moveFEN('a8a7');
            assert.equal(g.castlingRights, '');
        });
    });
    describe('moveFEN() - castling queenside', function () {
        /*in this board castling can be done on all fronts, 
        (there are full castling rights, 
            no check on king or on squares between [rook can be in 'check'], 
            and no pieces between king and rooks)*/
        const b = Board.newGame('r3k2r/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/R3K2R w KQkq c6 0 2');
        it('should have full castling rights KQkq', function () {
            assert.equal(b.castlingRights, 'KQkq');
        });
        //check that there are no pieces between king and rook queenside
        it('should have no pieces queenside white between king & rook', function () {
            assert.equal(b.getPieceAt(Square.b1), undefined);
            assert.equal(b.getPieceAt(Square.c1), undefined);
            assert.equal(b.getPieceAt(Square.d1), undefined);
        });
        it('should - queenside white - have rook & king at right starting places', function () {
            assert.equal(b.getPieceAt(Square.a1), Piece.WHITE_ROOK);
            assert.equal(b.getPieceAt(Square.e1), Piece.WHITE_KING);
        });
        it('should make a complete queen white side castling', function () {
            b.moveFEN('e1c1');
            assert.equal(b.getPieceAt(Square.c1), 'K');
            assert.equal(b.getPieceAt(Square.d1), 'R');
            assert.equal(b.getPieceAt(Square.a1), undefined);
            assert.equal(b.getPieceAt(Square.e1), undefined);
        });
        it ('castling rights for white should have been removed', function () {
            assert.equal(b.castlingRights, 'kq');
        });
        it('should for black have rook & king at right starting places for queenside castling', function () {
            assert.equal(b.getPieceAt(Square.a8), Piece.BLACK_ROOK);
            assert.equal(b.getPieceAt(Square.e8), Piece.BLACK_KING);
        });
        it('should make a complete queen black side castling', function () {
            b.moveFEN('e8c8');
            assert.equal(b.getPieceAt(Square.c8), 'k');
            assert.equal(b.getPieceAt(Square.d8), 'r');
            assert.equal(b.getPieceAt(Square.a8), undefined);
            assert.equal(b.getPieceAt(Square.e8), undefined);
        });
        it ('castling rights for black should have been removed', function () {
            assert.equal(b.castlingRights, '');
        });
    });
    describe('moveFEN() - castling kingside', function () {
        /*in this board castling can be done on all fronts, 
        (there are full castling rights, 
            no check on king or on squares between [rook can be in 'check'], 
            and no pieces between king and rooks)*/
        const b = Board.newGame('r3k2r/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/R3K2R w KQkq c6 0 2');
        it('should have full castling rights KQkq', function () {
            assert.equal(b.castlingRights, 'KQkq');
        });
        it('should have no pieces kingside white between king & rook', function () {
            assert.equal(b.getPieceAt(Square.f1), undefined);
            assert.equal(b.getPieceAt(Square.g1), undefined);
        });
        it('should have rook & king at right starting places', function () {
            assert.equal(b.getPieceAt(Square.h1), Piece.WHITE_ROOK);
            assert.equal(b.getPieceAt(Square.e1), Piece.WHITE_KING);
        });
        it('should make a complete white castling', function () {
            b.moveFEN('e1g1');
            assert.equal(b.getPieceAt(Square.g1), 'K');
            assert.equal(b.getPieceAt(Square.f1), 'R');
            assert.equal(b.getPieceAt(Square.h1), undefined);
            assert.equal(b.getPieceAt(Square.e1), undefined);
        });
        it ('castling rights for white should have been removed', function () {
            assert.equal(b.castlingRights, 'kq');
        });
        it('should for black have rook & king at right starting places for kingside castling', function () {
            assert.equal(b.getPieceAt(Square.h8), Piece.BLACK_ROOK);
            assert.equal(b.getPieceAt(Square.e8), Piece.BLACK_KING);
        });
        it('should make a complete black side castling', function () {
            b.moveFEN('e8g8');
            assert.equal(b.getPieceAt(Square.g8), 'k');
            assert.equal(b.getPieceAt(Square.f8), 'r');
            assert.equal(b.getPieceAt(Square.h8), undefined);
            assert.equal(b.getPieceAt(Square.e8), undefined);
        });
        it ('castling rights for black should have been removed', function () {
            assert.equal(b.castlingRights, '');
        });
    });
    describe('moveFEN() - a request for doing castling during chess', function () {
        /*in this board white king is threatend by black queen & castling should not be possible)*/
        const b = Board.newGame('r3k2r/pp1ppppp/8/2p5/4P3/PPPPqPPP/8/R3K2R w KQkq c6 0 2');
        b.moveFEN('e1g1');
        describe('should be ignored', function () {
            it('and the king should remain in its place', function () {  
                assert.equal(b.getPieceAt(Square.e1),Piece.WHITE_KING);
            });
            it('and the rook should remain in its place', function () {   
                assert.equal(b.getPieceAt(Square.h1),Piece.WHITE_ROOK);
            });
            it('and the to-square for the king should remain empty', function () {
                assert.equal(b.getPieceAt(Square.g1),undefined);
            });
            it('and the halfmoveClock should have the same nr as before move', function () {
                assert.equal(b.halfMoveClock, 0);
            });
        });
    });
    describe('closestPiece()', function () {
        //white king should be checked by black queen, the white king has no other pieces (neither white or black) 
        //in any direction
        const b = Board.newGame('8/qk6/8/8/8/8/K7/8 w KQkq c6 0 2');
        let piece = b.closestPiece(Square.a2, Direction.NORTH);
        it('should return the square of the black queen in north', function () {
            assert.equal(piece, Piece.BLACK_QUEEN);
        });
        const c = Board.newGame('8/8/8/8/k7/q7/K7/8 w KQkq c6 0 2');
        let piece2 = c.closestPiece(Square.a2, Direction.NORTH);
        it('should return the square of the black queen in north (it is just one piece north)', function () {
            assert.equal(piece2, Piece.BLACK_QUEEN);
        });
    });
    describe('moveFEN()', function () {
        const b = Board.newGame('k7/8/p7/8/1P6/8/8/K7 w KQkq c6 0 2');
        b.moveFEN('a1a2');
        it('should not increase halfmoveclock when king moves', function () {
            assert.equal(b.halfMoveClock, 0);
        }); 
        b.moveFEN('a6a5')
        it('should increase halfmoveclock when pawn moves', function () {
            assert.equal(b.halfMoveClock, 1);
        });
    });
});