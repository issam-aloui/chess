import React from "react";
import Board from "./components/Board";
import { Selected } from "./context/selected";
import { BoardCtx } from "./context/BoardCtx";
import { PossibleMoves } from "./context/PossibleMoves";
import { Turn } from "./context/Turn";
import { useState } from "react";
import { useContext } from "react";
export default function App() {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [board, setBoard] = useState([]);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [turn, setTurn] = useState("white");

  return (
    <div className="text-black flex justify-center items-center w-screen container">
      <Selected.Provider value={{ selectedPiece, setSelectedPiece }}>
        <BoardCtx.Provider value={{ board, setBoard }}>
          <PossibleMoves.Provider value={{ possibleMoves, setPossibleMoves }}>
            <Turn.Provider value={{ turn, setTurn }}>
              <Board />
            </Turn.Provider>
          </PossibleMoves.Provider>
        </BoardCtx.Provider>
      </Selected.Provider>
    </div>
  );
}
