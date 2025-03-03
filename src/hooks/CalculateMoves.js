import * as Moves from "../hooks/Moves.js";
export default function CalculateMoves(id, piece, pieceClr) {
  let moves = [];
  switch (piece) {
    case "pawn":
      moves = [...Moves.PawnMoves(id, pieceClr).attacks];
      break;
    case "rook":
      moves = [
        ...Moves.VerticalMoves(id, pieceClr).attacks,
        ...Moves.HorizantalMoves(id, pieceClr).attacks,
      ];
      break;
    case "knight":
      moves = [...Moves.knightMoves(id, pieceClr).attacks];
      break;
    case "bishop":
      moves = [...Moves.DiagonalMoves(id, pieceClr).attacks];
      break;
    case "queen":
      moves = [
        ...Moves.VerticalMoves(id, pieceClr).attacks,
        ...Moves.HorizantalMoves(id, pieceClr).attacks,
        ...Moves.DiagonalMoves(id, pieceClr).attacks,
      ];
      break;
    case "king":
      moves = [...Moves.KingMoves(id, pieceClr).attacks];
      break;
  }
  return moves;
}
