import React from "react";
import { useContext, useEffect } from "react";
import { PossibleMoves } from "../context/PossibleMoves.js";
import { Selected } from "../context/selected.js";
import { BoardCtx } from "../context/BoardCtx.js";
import { Turn } from "../context/Turn.js";
import * as Moves from "../hooks/Moves.js";
import MoveSvg from "./MoveSvg.jsx";
import { KingsPlace } from "../context/KingCtx.js";
import { AttackedSquares } from "./Board.jsx";
export default function Square({
  id = "",
  color = "white",
  pieceClr = "white",
  imgSrc = "",
  check = false,
}) {
  const { possibleMoves, setPossibleMoves } = useContext(PossibleMoves);
  const { selectedPiece, setSelectedPiece } = useContext(Selected);
  const { board, setBoard } = useContext(BoardCtx);
  const { turn, setTurn } = useContext(Turn);
  const { Kings, setKings } = useContext(KingsPlace);
  const included = possibleMoves.includes(id);

  function handleFocus() {
    if (turn !== pieceClr) return;
    setSelectedPiece({ id, color, pieceClr, imgSrc, check });
    let movesList = [];
    switch (imgSrc) {
      case "pawn":
        movesList = Moves.PawnMoves(id, pieceClr).moves;
        break;
      case "rook":
        movesList = [
          ...Moves.VerticalMoves(id, pieceClr).moves,
          ...Moves.HorizantalMoves(id, pieceClr).moves,
        ];
        break;
      case "knight":
        movesList = Moves.knightMoves(id, pieceClr).moves;
        break;
      case "bishop":
        movesList = Moves.DiagonalMoves(id, pieceClr).moves;
        break;
      case "queen":
        movesList = [
          ...Moves.VerticalMoves(id, pieceClr).moves,
          ...Moves.HorizantalMoves(id, pieceClr).moves,
          ...Moves.DiagonalMoves(id, pieceClr).moves,
        ];
        break;
      case "king":
        movesList = Moves.KingMoves(id, pieceClr).moves;
        break;
      default:
        movesList([]);
        break;
    }
  
    setPossibleMoves(movesList);
  }

  function handleBlur() {
    setPossibleMoves([]);
    setSelectedPiece(null);
  }
  function handleMove() {
    if (!selectedPiece) return;

    // Create a new board with the updated positions
    const newBoard = [...board];

    // Clear the old position
    newBoard[selectedPiece.id] = {
      id: selectedPiece.id,
      color: selectedPiece.color,
      pieceClr: selectedPiece.pieceClr,
      imgSrc: selectedPiece.imgSrc,
      check: false,
    };

    // Place the piece in the new position
    newBoard[id] = {
      id: id,
      color: color,
      pieceClr: selectedPiece.pieceClr,
      imgSrc: selectedPiece.imgSrc,
      check: true,
    };
    if (selectedPiece.imgSrc === "king") {
      if (selectedPiece.pieceClr === "white") {
        setKings([id, Kings[1]]);
      } else {
        setKings([Kings[0], id]);
      }
    }
    let audio = new Audio(
      check
        ? "src/assets/sounds/capture.mp3"
        : "src/assets/sounds/move-self.mp3"
    );
    audio.play();
    // Update the board and reset selection
    setBoard(newBoard);
    setSelectedPiece(null);
    setPossibleMoves([]);
    setTurn(turn === "white" ? "black" : "white");
  }

  const bgColor = color === "white" ? "bg-whiteClr" : "bg-blackClr";
  const pointer = check || included ? "cursor-pointer" : "";
  const focus = "focus:bg-[#7B61FF]";

  return (
    <div
      id={id}
      tabIndex={0}
      className={`${bgColor} aspect-square ${pointer} p-2 ${
        check && focus
      } flex justify-center items-center ${included && "move"}`}
      onClick={() => {
        included ? handleMove() : handleFocus();
      }}>
      {check && (
        <img
          src={`src/assets/${pieceClr}/${imgSrc}.png`}
          alt={imgSrc}
          className={`w-full h-full object-cover select-none relative ${pieceClr}`}
        />
      )}
      {!included || <MoveSvg />}
    </div>
  );
}
