export default function GetPiece(index) {
  let piece;
  let check = true;
  let clr;

  switch (index) {
    case 0:
    case 7:
      piece = "rook";
      clr = "white";
      break;
    case 56:
    case 63:
      piece = "rook";
      clr = "black";
      break;
    case 1:
    case 6:
      piece = "knight";
      clr = "white";
      break;
    case 57:
    case 62:
      piece = "knight";
      clr = "black";
      break;
    case 2:
    case 5:
      piece = "bishop";
      clr = "white";
      break;
    case 58:
    case 61:
      piece = "bishop";
      clr = "black";
      break;
    case 3:
      piece = "queen";
      clr = "white";
      break;
    case 59:
      piece = "queen";
      clr = "black";
      break;
    case 4:
      piece = "king";
      clr = "white";
      break;
    case 60:
      piece = "king";
      clr = "black";
      break;
    default:
      if ((index > 7 && index < 16) || (index > 47 && index < 56)) {
        piece = "pawn";
        clr = index > 16 ? "black" : "white";
      } else {
        piece = "";
        check = false;
        clr = "";
      }
      break;
  }
  return { piece, check, clr };
}
