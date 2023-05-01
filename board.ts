import { Square, Piece } from './enums';
/*
Chess Board 
*/
export class Board {

    //squares array going from a1 to h8
    squares: string[] = new Array(64);

    whiteMoveNext: boolean;

    //Some values: KQkq (all castling, K is white kingside), kq (black only), or - (no castling)
    castlingRights: string;

    //Possible values: - (no en passant), or a square coordinate (e.g. "e3"
    enPassantSq: Square;

    /*Halfmove clock: Nr of halfmoves since the last pawn advance or capture. 
      When 100 (50 full moves), it's a draw.*/
    halfMoveClock: string;

    //Fullmove number: Starts at 1, incremented after black's move
    fullMoveNumber: number;

    constructor(obj: any) {
        this.squares = obj.squares;
        this.whiteMoveNext = obj.whiteNextMove;
        this.castlingRights = obj.castlingRights;
        this.enPassantSq = obj.enPassantSq;
        this.halfMoveClock = obj.halfMoveClock;
        this.fullMoveNumber = obj.fullMoveNumber;
    }
    getPieceAt(sq: Square): string {
        return this.squares[sq];
    }
    /*
    The move format is in long algebraic notation.
    Examples:  e2e4, e7e5, e1g1 (white short castling), e7e8q (for promotion)
    */
    public moveFEN(fenStr: string) {
        let from: number = Square[fenStr.substring(0, 2)];
        let to: number = Square[fenStr.substring(2, 4)];

        this.move(from, to)

        //promotion
        if (fenStr.length === 5) {
        }
        
    }
    private move(from: Square, to: Square) {
        let piece: string = this.getPieceAt(from);
        //castling 
        //refactor to use this.castleRights instead
        if (this.isCastling(from, to)) {
            this.doCastleMove(from, to);
        }
        //en passant made?
        //det är första raden nedan som är fel. Byter jag på Piece.BLACK_PAWN och Piece.WHITE_PAWN så funkar det. 
        else if (this.getPieceAt(from) == Piece.WHITE_PAWN || this.getPieceAt(from) == Piece.BLACK_PAWN
            && (Math.abs(distanceNorthBetween(from, to)) === 2)) {
            /*find square for en passant
            (to - from)/2 will give 8, but it also gives the direction (+ for white, - for black)
            */
            this.enPassantSq = (to - from) / 2 + from;
            console.log("\nthis.enPassantSq" + this.enPassantSq);
        }

        //move piece
        this.squares[to] = this.squares[from];
        this.squares[from] = undefined;

        if (!this.whiteMoveNext){this.fullMoveNumber++;}

        if (piece === Piece.WHITE_KING || piece === Piece.BLACK_KING) {
            this.rmAllCastlingRightsFor(this.whiteMoveNext);
        }
        if (piece === Piece.WHITE_ROOK && (from === Square.a1 || from === Square.h1) ||
            piece === Piece.BLACK_ROOK && (from === Square.a8 || from === Square.h8)){
            this.rmCastlingRightsForSide(from);
        }
        
        //change turn
        this.whiteMoveNext = !this.whiteMoveNext;

        
        //halfmove clock ++ ?

        //pieces taken?
        
    }
    private rmCastlingRightsForSide(from: Square) {
        switch (from) {
            case Square.a1:
                this.castlingRights = this.castlingRights.replace("Q", "");
                break;
            case Square.h1:
                this.castlingRights = this.castlingRights.replace("K", "");
                break;
            case Square.a8:
                this.castlingRights = this.castlingRights.replace("q", "");
                break;
            case Square.h8:
                this.castlingRights = this.castlingRights.replace("k", "");
                break;
    }
}
    private isCastling(from: Square, to: Square): boolean {
        return this.getPieceAt(from) === (Piece.WHITE_KING || Piece.BLACK_KING)
                && (from === Square.e1 && (to === Square.g1 || to === Square.c1))
                || (from === Square.e8 && (to === Square.g8 || to === Square.c8));
    }
    /*
    Castling is permitted provided all of the following conditions are met:
    Neither the king nor the rook has previously moved.
    There are no pieces between the king and the rook.
    The king is not currently in check.
    The king does not pass through or finish on a square that is attacked by an enemy piece.
    */
    private rmAllCastlingRightsFor(white: boolean) {
        if (white) {
            this.castlingRights = this.castlingRights.replace("K", "").replace("Q", "");
        }
        else {
            this.castlingRights = this.castlingRights.replace("k", "").replace("q", "");
        }
    }
        
    private doCastleMove(from: Square, to: Square) {
    }
    
    /*One FEN string or record consists of six fields separated by a space character: 
    1. Piece placement
    2. Active color
    3. Castling availability
    4. En passant target square
    5. Halfmove clock
    6. Fullmove number
    */
    public static newGame(FENstr: string) {
        let sixFields: string[] = FENstr.split(" ");
        let squares: string[] = new Array(64);

        //pieces
        let ranks: string[] = sixFields[0].split("/");

        //"N.B. - the FEN string goes from a8 to h1
        for (let i = 0; i < ranks.length; i++) {
            let rank = ranks[i];
            let j = 0;
            while (j < rank.length) {
                let c = rank.charAt(j);

                //if a number, skip that many squares
                if (c >= '1' && c <= '8') {
                    j += parseInt(c);
                }
                //else, add the piece to the board
                else {
                    //N.B. the squares array goes from a1 to h8
                    let realRow = 7 - i;
                    squares[realRow * rank.length + j] = c;
                    j++;
                }
            }
        }
        let result: any = {};
        result.squares = squares;
        result.whiteNextMove = sixFields[1] === "w" ? true : false;
        result.castlingRights = sixFields[2];
        result.enPassantSq = Square[sixFields[3]];
        result.halfMoveClock = sixFields[4];
        result.fullMoveNumber = parseInt(sixFields[5]);
        return new Board(result);
    }
}
/*
When direction is south, return value will be prefixed with a minus sign.
(Should this be replaced with some kind of vector implemenation?)
*/
function distanceNorthBetween(from: Square, to: Square): number {
    return (to - from) / 8;
}