let playTurn = "white";
let turnAnnouncer = document.getElementById("turn");
function changeTurn() {
  playTurn = playTurn === "white" ? "black" : "white";
  turnAnnouncer.innerHTML = `${playTurn}'s turn`;
  document.getElementById("turn").style.color = playTurn;
}

function addPieces(selector, piece, blackCount) {
  let cells = document.querySelectorAll(selector);
  cells.forEach((cell, index) => {
    if (index < blackCount) {
      cell.innerHTML += `<img src='chess-pieces/black-${piece}.png' alt='black-${piece}' class = "${piece} black" >`;
    } else {
      cell.innerHTML += `<img src='chess-pieces/white-${piece}.png' alt='white-${piece}' class = "${piece} white" >`;
    }
  });
}
let counter = 1;
let chessboard = document.querySelectorAll(".chess-board td");
chessboard.forEach((cell) => {
  cell.id = `${counter}`;
  counter++;
});
// Add pawns
addPieces(".chess-board tr:nth-child(2) td", "pawn", 8);
addPieces(".chess-board tr:nth-child(7) td", "pawn", 0);

// Add rooks (towers)
addPieces(
  ".chess-board tr:nth-child(1) td:nth-child(1), .chess-board tr:nth-child(1) td:nth-child(8)",
  "rook",
  2
);
addPieces(
  ".chess-board tr:nth-child(8) td:nth-child(1), .chess-board tr:nth-child(8) td:nth-child(8)",
  "rook",
  0
);

// Add knights
addPieces(
  ".chess-board tr:nth-child(1) td:nth-child(2), .chess-board tr:nth-child(1) td:nth-child(7)",
  "knight",
  2
);
addPieces(
  ".chess-board tr:nth-child(8) td:nth-child(2), .chess-board tr:nth-child(8) td:nth-child(7)",
  "knight",
  0
);

// Add bishops
addPieces(
  ".chess-board tr:nth-child(1) td:nth-child(3), .chess-board tr:nth-child(1) td:nth-child(6)",
  "bishop",
  2
);
addPieces(
  ".chess-board tr:nth-child(8) td:nth-child(3), .chess-board tr:nth-child(8) td:nth-child(6)",
  "bishop",
  0
);

// Add queens
addPieces(".chess-board tr:nth-child(1) td:nth-child(4)", "queen", 1);
addPieces(".chess-board tr:nth-child(8) td:nth-child(4)", "queen", 0);

// Add kings
addPieces(".chess-board tr:nth-child(1) td:nth-child(5)", "king", 1);
addPieces(".chess-board tr:nth-child(8) td:nth-child(5)", "king", 0);
function chessPieceSelected(piece) {
  if (piece.classList.contains(playTurn)) {
    piece.classList.add("selected");
    glowMoves(piece);
  }
}
function chessPiecesUnselected() {
  let selectedPiece = document.querySelector(".selected");
  if (selectedPiece) {
    selectedPiece.classList.remove("selected");
  }

  let glowCells = document.querySelectorAll("[class$='glow']");
  glowCells.forEach((cell) => {
    // Find the class name that ends with 'glow' and remove it
    cell.classList.forEach((className) => {
      if (className.endsWith("glow")) {
        cell.classList.remove(className);
      }
    });
  });
}

function glowMoves(cell) {
  switch (cell.classList[0]) {
    case "pawn":
      glowPawnMoves(cell);
      break;
    case "rook":
      glowRookMoves(cell);
      break;
    case "knight":
      glowKnightMoves(cell);
      break;
    case "bishop":
      glowBishopMoves(cell);
      break;
    case "queen":
      glowQueenMoves(cell);
      break;
    case "king":
      glowKingMoves(cell);
      break;
  }
}
function glowCell(cell) {
  let nextCell = document.getElementById(`${cell}`);
  nextCell.classList.add("glow");
}
function redGlowCell(cell) {
  let nextCell = document.getElementById(`${cell}`);
  nextCell.classList.add("red-glow");
}

function glowPawnMoves(piece) {
  const currentPlace = parseInt(piece.parentElement.id);
  const isBlack = piece.classList.contains("black");
  let direction = isBlack ? 1 : -1;
  const nextPlace = currentPlace + direction * 8;
  if (!document.getElementById(`${nextPlace}`).hasChildNodes()) {
    glowCell(nextPlace);
  }
  if (
    ((isBlack && currentPlace <= 16) || (!isBlack && currentPlace >= 49)) &&
    !document.getElementById(`${nextPlace + direction * 8}`).hasChildNodes()
  ) {
    glowCell(nextPlace + direction * 8);
  }
  direction = [7, 9];
  direction.forEach((dir) => {
    let enemyPiece = isBlack ? currentPlace + dir : currentPlace - dir;
    if (
      document.getElementById(`${enemyPiece}`).hasChildNodes() &&
      document.getElementById(`${enemyPiece}`).firstChild.classList[1] !==
        piece.classList[1]
    ) {
      redGlowCell(enemyPiece);
    }
  });
}
function glowBishopMoves(piece) {
  const currentPlace = parseInt(piece.parentElement.id);
  const directions = [7, 9, -7, -9];

  directions.forEach((direction) => {
    let nextPlace = currentPlace;
    let currentRow = Math.floor((currentPlace - 1) / 8);
    let currentCol = (currentPlace - 1) % 8;

    while (true) {
      nextPlace += direction;
      let nextRow = Math.floor((nextPlace - 1) / 8);
      let nextCol = (nextPlace - 1) % 8;

      // Check if we're still on the board and moving diagonally
      if (
        nextPlace < 1 ||
        nextPlace > 64 ||
        Math.abs(nextRow - currentRow) !== Math.abs(nextCol - currentCol)
      ) {
        break;
      }

      // Stop if we hit a piece
      if (document.getElementById(`${nextPlace}`).hasChildNodes()) {
        if (
          document.getElementById(`${nextPlace}`).firstChild.classList[1] !==
          piece.classList[1]
        ) {
          redGlowCell(nextPlace);
          break;
        } else {
          break;
        }
      }
      glowCell(nextPlace);

      currentRow = nextRow;
      currentCol = nextCol;
    }
  });
}
function glowRookMoves(piece) {
  const currentPlace = parseInt(piece.parentElement.id);
  const directions = [1, -1, 8, -8];

  directions.forEach((direction) => {
    let nextPlace = currentPlace;
    let currentRow = Math.floor((currentPlace - 1) / 8);
    let currentCol = (currentPlace - 1) % 8;

    while (true) {
      nextPlace += direction;
      let nextRow = Math.floor((nextPlace - 1) / 8);
      let nextCol = (nextPlace - 1) % 8;

      if (
        nextPlace < 1 ||
        nextPlace > 64 ||
        (currentRow !== nextRow && currentCol !== nextCol)
      ) {
        break;
      }

      if (document.getElementById(`${nextPlace}`).hasChildNodes()) {
        if (
          document.getElementById(`${nextPlace}`).firstChild.classList[1] !==
          piece.classList[1]
        ) {
          redGlowCell(nextPlace);
          break;
        } else {
          break;
        }
      }
      glowCell(nextPlace);
    }
  });
}
function glowKingMoves(piece) {
  const currentPlace = parseInt(piece.parentElement.id);
  const directions = [1, -1, 8, -8, 7, 9, -7, -9];

  directions.forEach((direction) => {
    let nextPlace = currentPlace + direction;
    if (nextPlace >= 1 && nextPlace <= 64) {
      if (!document.getElementById(`${nextPlace}`).hasChildNodes()) {
        glowCell(nextPlace);
      } else if (
        document.getElementById(`${nextPlace}`).firstChild.classList[1] !==
        piece.classList[1]
      ) {
        redGlowCell(nextPlace);
      }
    }
  });
}
function glowKnightMoves(piece) {
  const currentPlace = parseInt(piece.parentElement.id);
  const directions = [-17, -15, -10, -6, 6, 10, 15, 17];
  const currentRow = Math.floor((currentPlace - 1) / 8);
  const currentCol = (currentPlace - 1) % 8;

  directions.forEach((direction) => {
    let nextPlace = currentPlace + direction;
    let nextRow = Math.floor((nextPlace - 1) / 8);
    let nextCol = (nextPlace - 1) % 8;
    if (
      nextPlace >= 1 &&
      nextPlace <= 64 &&
      Math.abs(nextRow - currentRow) != 0 &&
      Math.abs(nextCol - currentCol) <= 2
    ) {
      if (!document.getElementById(`${nextPlace}`).hasChildNodes()) {
        glowCell(nextPlace);
      } else if (
        document.getElementById(`${nextPlace}`).firstChild.classList[1] !==
        piece.classList[1]
      ) {
        redGlowCell(nextPlace);
      }
    }
  });
}

function glowQueenMoves(piece) {
  glowRookMoves(piece);
  glowBishopMoves(piece);
}
function moveChessPiece(targetCell) {
  const selectedPiece = document.querySelector(".selected");
  if (selectedPiece && (targetCell.classList.contains("glow") || targetCell.classList.contains("red-glow"))) {
    targetCell.innerHTML = selectedPiece.parentElement.innerHTML;
    selectedPiece.parentElement.innerHTML = "";
    chessPiecesUnselected();
  }
  changeTurn();
}

// Remove the separate event listener for .glow cells

// Modify the chess board click event listener
document.querySelector(".chess-board").addEventListener("click", (event) => {
  const clickedElement = event.target;
  const cellElement = clickedElement.tagName === "IMG" ? clickedElement.parentElement : clickedElement;

  if (clickedElement.tagName === "IMG" && clickedElement.classList.contains(playTurn)) {
    chessPiecesUnselected();
    chessPieceSelected(clickedElement);
  } else if (cellElement.classList.contains("glow") || cellElement.classList.contains("red-glow")) {
    moveChessPiece(cellElement);
  }
});