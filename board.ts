import { Square, Piece, Direction } from './enums';
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
        //castling 
        if (this.isCastling(from, to)) {
            if (this.isKingCheckedDuringCastling(from, to)) {
                //illegal move => return  
                return;
            }
            this.doCastling(to);
        }
        else if (this.isEnPassant(from, to)) {
            /*find square for en passant
            (to - from)/2 will give 8, but it also gives the direction (+ for white, - for black)
            */
            this.enPassantSq = (to - from) / 2 + from;
        }
        this.rmCastlingRightsIfAppropriate(from);

        //move piece
        this.squares[to] = this.squares[from];
        this.squares[from] = undefined;

        //change turn
        this.whiteMoveNext = !this.whiteMoveNext;

        //fullmove change
        if (this.whiteMoveNext) { this.fullMoveNumber++; }

        //halfmove clock ++ ?

        //pieces taken?

    }
    private isCastling(from: Square, to: Square): boolean {
        return this.getPieceAt(from) === (Piece.WHITE_KING || Piece.BLACK_KING)
            && (from === Square.e1 && (to === Square.g1 || to === Square.c1))
            || (from === Square.e8 && (to === Square.g8 || to === Square.c8));
    }
    /* The king is not allowed to castle if he is in check,
        or if he has to pass through check,
        or if his destination is in check */
    private isKingCheckedDuringCastling(kingFrom: Square, kingTo: Square): boolean {
        const middleSquare = kingFrom + (kingTo - kingFrom) / 2;
        const kingSquares: Square[] = [kingFrom, middleSquare, kingTo];

        // Use the some() method to check if any square is in check
        return kingSquares.some(sq => this.isSquareChecked(sq, this.whiteMoveNext));
    }
    private doCastling(to: Square) {
        //move rook
        //white & queen side?
        if (this.whiteMoveNext && to === Square.c1) {
            this.squares[Square.a1] = undefined;
            this.squares[Square.d1] = Piece.WHITE_ROOK;
        }
        else if (this.whiteMoveNext && to === Square.g1) {
            this.squares[Square.h1] = undefined;
            this.squares[Square.f1] = Piece.WHITE_ROOK;
        }
        else if (!this.whiteMoveNext && to === Square.c8) {
            this.squares[Square.a8] = undefined;
            this.squares[Square.d8] = Piece.BLACK_ROOK;
        }
        else if (!this.whiteMoveNext && to === Square.g8) {
            this.squares[Square.h8] = undefined;
            this.squares[Square.f8] = Piece.BLACK_ROOK;
        }
    }
    private rmCastlingRightsIfAppropriate(from: Square) {
        let piece: string = this.getPieceAt(from);
        if (piece === Piece.WHITE_KING || piece === Piece.BLACK_KING) {
            this.rmAllCastlingRightsFor(this.whiteMoveNext);
        }
        if (piece === Piece.WHITE_ROOK && (from === Square.a1 || from === Square.h1) ||
            piece === Piece.BLACK_ROOK && (from === Square.a8 || from === Square.h8)) {
            this.rmCastlingRightsForSide(from);
        }
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
    private isEnPassant(from: Square, to: Square): boolean {
        return this.getPieceAt(from) == Piece.WHITE_PAWN || this.getPieceAt(from) == Piece.BLACK_PAWN
            && (Math.abs(distanceNorthBetween(from, to)) === 2)
    }
    private isSquareChecked(sq: Square, whiteInDefence: boolean): boolean {
        //first check if there are enemy knights threatening the square
        //8 possible positions for a knight to check square 
        let knightThreats: Square[] = [sq - 17, sq - 15, sq - 10, sq - 6, sq + 6, sq + 10, sq + 15, sq + 17];
        knightThreats = knightThreats.filter(sq => sq >= Square.a1 && sq <= Square.h8 && this.getPieceAt(sq) !== undefined
            && this.isKnight(this.getPieceAt(sq)) && isPieceWhite(this.getPieceAt(sq)) !== whiteInDefence);
        if (knightThreats.length > 0) {
            return true;
        }


        //Check directions in the x- and y-axis
        let pieceToNorth = this.closestPiece(sq, Direction.NORTH);
        let pieceToSouth = this.closestPiece(sq, Direction.SOUTH);
        let pieceToEast = this.closestPiece(sq, Direction.EAST);
        let pieceToWest = this.closestPiece(sq, Direction.WEST);

        //make array of pieces
        let pieces: string[] = [pieceToNorth, pieceToSouth, pieceToEast, pieceToWest];
        //filter out undefined & pieces of same color & not rook or queen
        pieces = pieces.filter(piece => piece !== undefined && isPieceWhite(piece.toString()) !== whiteInDefence
            && (this.isRook(piece) || this.isQueen(piece)));
        if (pieces.length > 0) {
            return true;
        }
        //check for threats from pawns

        return false;
    }
    isKnight(piece: string): boolean {
        return piece === Piece.WHITE_KNIGHT || piece === Piece.BLACK_KNIGHT;
    }
    isRook(piece: string) {
        return piece === Piece.WHITE_ROOK || piece === Piece.BLACK_ROOK;
    }
    isQueen(piece: string) {
        return piece === Piece.WHITE_QUEEN || piece === Piece.BLACK_QUEEN;
    }


    /*
        Recursive function.
        Returns the closest piece in a given direction.
        If no piece is found, returns undefined.
    */
    public closestPiece(from: Square, direction: Direction): string | undefined {
        let toSquare = from + direction;
        if (toSquare < Square.a1 || toSquare > Square.h8) { return undefined; }
        else if (this.squares[toSquare] !== undefined) { return this.squares[toSquare]; }
        else { return this.closestPiece(toSquare, direction); }
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
        const sixFields: string[] = FENstr.split(" ");

        // Replace numbers with corresponding number of '1's and then split by '/'
        const ranks = sixFields[0].replace(/\d/g, match => '1'.repeat(Number(match))).split('/');

        // Reverse the ranks array to match the internal board representation
        const reversedRanks = ranks.reverse();

        // Create the squares array
        const squares: string[] = new Array(64);
        reversedRanks.forEach((rank, rowIndex) => {
            [...rank].forEach((char, colIndex) => {
                const squareIndex = rowIndex * 8 + colIndex;
                squares[squareIndex] = char === '1' ? undefined : char;
            });
        });

        const result = {
            squares: squares,
            whiteNextMove: sixFields[1] === "w",
            castlingRights: sixFields[2],
            enPassantSq: Square[sixFields[3]],
            halfMoveClock: Number(sixFields[4]),
            fullMoveNumber: Number(sixFields[5])
        };

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
//prints FEN of state
export function toFen(board: Board): string {
    let result: string = "";

    for (let i = 0; i < board.squares.length; i++) {
        if (i > 0 && i % 8 === 0) {
            //'/' is separator between ranks
            result += "/";
        }
        let piece = board.squares[i];

        //creating 1:s for empty squares, will later be replaced below
        result += piece === undefined ? "1" : piece;
    }

    // Replace consecutive '1's with their count
    result = result.replace(/1{1,8}/g, match => match.length.toString());

    //ranks should be reversed, from a1 - h8 to h8 - a1
    result = result.split('/').reverse().join('/');

    result += board.whiteMoveNext ? " w " : " b ";
    result += board.castlingRights + " ";
    result += Square[board.enPassantSq] + " ";
    result += board.halfMoveClock + " ";
    result += board.fullMoveNumber;

    return result;
}
export function isPieceWhite(piece: string): boolean {
    return piece.toUpperCase() === piece;
}
