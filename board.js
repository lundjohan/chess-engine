/*
Chess Board
*/
class Board {
    constructor(whiteMoveNext = true, enPassantSq = '-') {
        this.whiteMoveNext = whiteMoveNext;
        this.enPassantSq = enPassantSq;
    }
    /*One FEN string or record consists of six fields separated by a space character:
    1. Piece placement
    2. Active color
    3. Castling availability
    4. En passant target square
    5. Halfmove clock
    6. Fullmove number
    */
    newGame(FENstr) {
        let sixFields = FENstr.split(" ");
        let pieces = sixFields[0].split("/");
        let whiteNextMove = sixFields[1] === "w" ? true : false;
        let enPassantSq = sixFields[3];
        return new Board(whiteNextMove, enPassantSq);
    }
}
exports.Board = Board;
