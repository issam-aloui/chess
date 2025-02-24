import React from "react";
import { useContext, useEffect } from "react";
import { PossibleMoves } from "../context/PossibleMoves.js";
import { Selected } from "../context/selected.js";
import { BoardCtx } from "../context/BoardCtx.js";
import { Turn } from "../context/Turn.js";
import * as Moves from "../hooks/Moves.js";
import MoveSvg from "./MoveSvg.jsx";

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
  const included = possibleMoves.includes(id);

  function handleFocus() {
    if (turn !== pieceClr) return;
    setSelectedPiece({ id, color, pieceClr, imgSrc, check });
    switch (imgSrc) {
      case "pawn":
        setPossibleMoves(Moves.PawnMoves(id, pieceClr));
        break;
      case "rook":
        setPossibleMoves([
          ...Moves.VerticalMoves(id, pieceClr),
          ...Moves.HorizantalMoves(id, pieceClr),
        ]);
        break;
      case "knight":
        setPossibleMoves(Moves.knightMoves(id, pieceClr));
        break;
      case "bishop":
        setPossibleMoves(Moves.DiagonalMoves(id, pieceClr));
        break;
      case "queen":
        setPossibleMoves([
          ...Moves.VerticalMoves(id, pieceClr),
          ...Moves.HorizantalMoves(id, pieceClr),
          ...Moves.DiagonalMoves(id, pieceClr),
        ]);
        break;
      case "king":
        setPossibleMoves(Moves.KingMoves(id, pieceClr));
        break;
      default:
        setPossibleMoves([]);
        break;
    }
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
    newBoard[selectedPiece.id] = (
      <Square
        key={selectedPiece.id}
        id={selectedPiece.id}
        color={selectedPiece.color}
        check={false}
      />
    );

    // Place the piece in the new position
    newBoard[id] = (
      <Square
        key={id}
        id={id}
        color={color}
        pieceClr={selectedPiece.pieceClr}
        imgSrc={selectedPiece.imgSrc}
        check={true}
      />
    );

    // Update the board and reset selection
    setBoard(newBoard);
    console.log(possibleMoves);
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
