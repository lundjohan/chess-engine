export enum Square{
    a1 = 0, b1, c1, d1, e1, f1, g1, h1,
    a2 = 8, b2, c2, d2, e2, f2, g2, h2,
    a3 = 16, b3, c3, d3, e3, f3, g3, h3,
    a4 = 24, b4, c4, d4, e4, f4, g4, h4,
    a5 = 32, b5, c5, d5, e5, f5, g5, h5,
    a6 = 40, b6, c6, d6, e6, f6, g6, h6,
    a7 = 48, b7, c7, d7, e7, f7, g7, h7,
    a8 = 56, b8, c8, d8, e8, f8, g8, h8
}
export enum Piece{
    WHITE_KING = 'K', WHITE_QUEEN = 'Q', WHITE_ROOK = 'R', 
    WHITE_BISHOP = 'B', WHITE_KNIGHT = 'N', WHITE_PAWN = 'P',
    BLACK_KING = 'k', BLACK_QUEEN = 'q', BLACK_ROOK = 'r',
    BLACK_BISHOP = 'b', BLACK_KNIGHT = 'n', BLACK_PAWN = 'p',
    NO_PIECE = undefined
}

export enum Direction{
    NORTH = 8, NORTH_EAST = 9, EAST = 1, SOUTH_EAST = -7,
    SOUTH = -8, SOUTH_WEST = -9, WEST = -1, NORTH_WEST = 7
}
