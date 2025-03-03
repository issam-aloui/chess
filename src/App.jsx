import React from "react";
import Board from "./components/Board";
import { Selected } from "./context/selected";
import { BoardCtx } from "./context/BoardCtx";
import { PossibleMoves } from "./context/PossibleMoves";
import { Turn } from "./context/Turn";
import { useState } from "react";
import { KingsPlace } from "./context/KingCtx";
import { AttackedSquares } from "./context/AttackedSquares";
export default function App() {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [board, setBoard] = useState([]);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [turn, setTurn] = useState("white");
  const [Kings, setKings] = useState([4,60]);
  const [attackedSquares, setAttackedSquares] = useState([]);

  return (
    <div className="text-black flex justify-center items-center w-screen container">
      <AttackedSquares.Provider value={{ attackedSquares, setAttackedSquares }}>
        <KingsPlace.Provider value={{ Kings, setKings }}>
          <Selected.Provider value={{ selectedPiece, setSelectedPiece }}>
            <BoardCtx.Provider value={{ board, setBoard }}>
              <PossibleMoves.Provider
                value={{ possibleMoves, setPossibleMoves }}>
                <Turn.Provider value={{ turn, setTurn }}>
                  <Board />
                </Turn.Provider>
              </PossibleMoves.Provider>
            </BoardCtx.Provider>
          </Selected.Provider>
        </KingsPlace.Provider>
      </AttackedSquares.Provider>
    </div>
  );
}
