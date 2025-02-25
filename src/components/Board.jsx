import React from "react";
import { useState, useContext, useEffect } from "react";
import { BoardCtx } from "../context/BoardCtx.js";
import Square from "./Square.jsx";
import GetPiece from "../hooks/getPiece.js";

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

export default function Board() {
  const { board, setBoard } = useContext(BoardCtx);
  useEffect(() => {
    setBoard(getInitialBoard());
  }, []);

  return (
    <div className="grid grid-cols-8 border-2 border-black w-fit">
      {board.map((element) => (
        <Square
          key={element.id}
          id={element.id}
          color={element.color}
          pieceClr={element.pieceClr} // Fixed: `piecesClr` → `pieceClr`
          imgSrc={element.imgSrc}
          check={element.check}
        />
      ))}
    </div>
  );
}
