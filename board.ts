import { Square } from './enums';
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
    enPassantSq: string;

    /*Halfmove clock: Nr of halfmoves since the last pawn advance or capture. 
      When 100 (50 full moves), it's a draw.*/
    halfMoveClock: string;

    //Fullmove number: Starts at 1, incremented after black's move
    fullMoveNumber: string;

    constructor(squares: string[], whiteMoveNext: boolean = true,
        castlingRights: string = '-', enPassantSq: string = '-',
        halfMoveClock: string = '0', fullMoveNumber: string = '1') {
        this.squares = squares;
        this.whiteMoveNext = whiteMoveNext;
        this.castlingRights = castlingRights;
        this.enPassantSq = enPassantSq;
        this.halfMoveClock = halfMoveClock;
        this.fullMoveNumber = fullMoveNumber;
    }
    getPieceAt(sq: Square): string {
        return this.squares[sq];
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
        console.log("ranks.length: " + ranks.length);

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


        let whiteNextMove = sixFields[1] === "w" ? true : false;
        let castlingRights = sixFields[2];
        let enPassantSq = sixFields[3];
        let halfMoveClock = sixFields[4];
        let fullMoveNumber = sixFields[5];
        return new Board(squares, whiteNextMove, castlingRights, enPassantSq, halfMoveClock, fullMoveNumber);
    }
}