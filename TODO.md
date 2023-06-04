TODOs
testboard.ts
  - test for nullmove (0000)
  - test for promotion - queen, rook, bishop or knight.
    - pawn on last square must be promoted
  - test isSquareChecked with threats by knights, bishops & pawns & other king
  - test for when en Passant square is initiated at '-'. What happens? How is this represented internally in board?
  - test that you cannot move from an empty square 
  - test for check
  - test for checkmate
  - test that all possible draws are executed
  - Actually the protocol shows that promotion should be done with small last letter ('q' for white queen) => remove unnecessary testcode and code in board.