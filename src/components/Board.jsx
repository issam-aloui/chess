import React from "react";
import { useState, useContext, useEffect, useRef, useMemo } from "react";
import { BoardCtx } from "../context/BoardCtx.js";
import { Turn } from "../context/Turn.js";
import Square from "./Square.jsx";
import GetPiece from "../hooks/getPiece.js";
import CalculateMoves from "../hooks/CalculateMoves.js";
import { Selected } from "../context/selected.js";
function getInitialBoard() {
  let list = Array(64).fill(null);
  let colors = "white";

  list = list.map((_, index) => {
    const pieces = GetPiece(index);

    if (index % 8 !== 0) {
      colors = colors === "black" ? "white" : "black";
    }

    return {
      id: index,
      color: colors,
      pieceClr: pieces.clr,
      imgSrc: pieces.piece,
      check: pieces.check,
    };
  });

  return list;
}

export function AttackedSquares(board, colour) {
  let moves = [];
  board.forEach((element) => {
    if (element.pieceClr != colour) {
      moves = [
        ...moves,
        ...CalculateMoves(element.id, element.imgSrc, element.pieceClr),
      ];
    }
  });
  return [...new Set(moves)];
}

export default function Board() {
  const { board, setBoard } = useContext(BoardCtx);
  const { turn, setTurn } = useContext(Turn);
  const { Selectedpiece, setSelectedPiece } = useContext(Selected);
  const attacks = useMemo(() => {
    AttackedSquares(board, turn).sort((a, b) => a - b);
  }, [board]);
  const attacked = useRef([]);
  useEffect(() => {
    setBoard(getInitialBoard());
  }, [])
  useEffect(() => {
    attacked.current = AttackedSquares(board, turn).sort((a, b) => a - b);
    console.log(attacked.current);
  }, [board, turn]);
  return (
    <div className="grid grid-cols-8 border-2 border-black w-fit">
      {board.map((element) => (
        <Square
          key={element.id}
          id={element.id}
          color={element.color}
          pieceClr={element.pieceClr}
          imgSrc={element.imgSrc}
          check={element.check}
        />
      ))}
    </div>
  );
}
