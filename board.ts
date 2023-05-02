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
            //move rook
            //white & queen side?
            if (this.whiteMoveNext && to === Square.c1) {
                this.squares[Square.a1] = undefined;
                this.squares[Square.d1] = Piece.WHITE_ROOK;
            }
            else if(!this.whiteMoveNext && to === Square.c8){
                this.squares[Square.a8] = undefined;
                this.squares[Square.d8] = Piece.BLACK_ROOK;
            }
        }
        //en passant made?
        //det är första raden nedan som är fel. Byter jag på Piece.BLACK_PAWN och Piece.WHITE_PAWN så funkar det. 
        else if (this.getPieceAt(from) == Piece.WHITE_PAWN || this.getPieceAt(from) == Piece.BLACK_PAWN
            && (Math.abs(distanceNorthBetween(from, to)) === 2)) {
            /*find square for en passant
            (to - from)/2 will give 8, but it also gives the direction (+ for white, - for black)
            */
            this.enPassantSq = (to - from) / 2 + from;
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
        
    private moveRook(from: Square, to: Square) {
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
        //prepare FEN string, replace numbers that describe empty squares with 1s


        let sixFields: string[] = FENstr.split(" ");

        //this part of FEN needs preparing:
        //1. Extract board (Pieces loc & empty loc). 2. Divide into 8 ranks. 3. a8 - h1 => a1 - h8
        let ranks:string[] = sixFields[0].split('/').reverse();

        //...pp3ppp... => ...pp111ppp...
        let cleanedRanks:string[][] = new Array();
        for (let i = 0;i<ranks.length;i++){
            let rankArr = ranks[i].split("");
            
            for (let j = 0; j<rankArr.length;j++)
            {
                let c = rankArr[j];
                let nrOfOnes:string = '';
                if (c.match(/[1-8]/)){
                    for (let k = 0; k<parseInt(c);k++){
                        nrOfOnes += '1';
                    }
                }
                rankArr.splice(i,1,nrOfOnes);
            }
            //join().split to make 'p','111','p' -> 'p','1','1','1','p'
            cleanedRanks.push(rankArr.join("").split(""));
        }
        
        //insert "cleaned up" array into squares array
        let squares: string[] = new Array(64);
        for (let row = 0; row < cleanedRanks.length; row++) {
            let rank = cleanedRanks[row];
            for (let col = 0;col<rank.length;col++){
                if (rank[col] === '1') {continue;}
                squares[row * rank.length + col] = rank[col];
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
//prints FEN of state
export function toFen(board: Board):string {
    let result:string = "";
    for (let i = 0; i<board.squares.length; i++) {
        if (i > 0 && i % 8 === 0) {
            result += '/';
        }
        let piece = board.squares[i];
        if (piece === undefined) {
            result += "1";
        }
        else {
            result += piece;
        }
    }
    //revert to a8-h1 (internal board goes from a1-h8)
    result = result.split("").reverse().join("");
    
    //replace 11111111 with 8, or 111 with 3, etc.
    result = result.replace(/1{1,8}/g, match => match.length.toString());
    result += board.whiteMoveNext ? " w " : " b ";
    result += board.castlingRights + " ";
    result += Square[board.enPassantSq] + " ";
    result += board.halfMoveClock + " ";
    result += board.fullMoveNumber;
    return result;
}