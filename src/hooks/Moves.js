// Vertical moves are exported as the default function.
export function VerticalMoves(index, color) {
  if (index < 0 || index > 63) return [];
  let moves = [];
  let attacks = [];
  let i;
  // Move Downwards: increment index by 8 until beyond the board.
  i = index;
  while (true) {
    i += 8;
    if (i > 63) break;
    const square = document.getElementById(i);
    const child = square && square.childNodes[0];
    if (child && child.tagName === "IMG") {
      if (child.classList.contains(color)) break;
      else {
        moves.push(i);
        attacks.push(i);
        break;
      }
    }
    moves.push(i);
  }

  // Move Upwards: decrement index by 8 until before the board.
  i = index;
  while (true) {
    i -= 8;
    if (i < 0) break;
    const square = document.getElementById(i);
    const child = square && square.childNodes[0];
    if (child && child.tagName === "IMG") {
      if (child.classList.contains(color)) break;
      else {
        moves.push(i);
        attacks.push(i);

        break;
      }
    }
    moves.push(i);
  }
  return { moves, attacks };
}

// Horizontal moves: right then left.
export function HorizantalMoves(index, color) {
  if (index < 0 || index > 63) return [];
  let moves = [];
  let attacks = [];
  let i;

  // Move Right: add 1 until the right edge is reached.
  i = index;
  while (true) {
    if ((i + 1) % 8 === 0) break; // at right edge of the board
    i += 1;
    if (i > 63) break;
    const square = document.getElementById(i);
    const child = square && square.childNodes[0];
    if (child && child.tagName === "IMG") {
      if (child.classList.contains(color)) break;
      else {
        moves.push(i);
        attacks.push(i);

        break;
      }
    }
    moves.push(i);
  }

  // Move Left: subtract 1 until the left edge is reached.
  i = index;
  while (true) {
    if (i % 8 === 0) break; // at left edge of the board
    i -= 1;
    if (i < 0) break;
    const square = document.getElementById(i);
    const child = square && square.childNodes[0];
    if (child && child.tagName === "IMG") {
      if (child.classList.contains(color)) break;
      else {
        attacks.push(i);

        moves.push(i);
        break;
      }
    }
    moves.push(i);
  }
  return { moves, attacks };
}

// Diagonal moves in all four directions.
export function DiagonalMoves(index, color) {
  if (index < 0 || index > 63) return [];
  let moves = [];
  let attacks = [];
  let i;

  // Top-left diagonal (subtract 9)
  i = index;
  while (true) {
    if (i % 8 === 0) break; // reached left edge
    i -= 9;
    if (i < 0) break;
    const square = document.getElementById(i);
    const child = square && square.childNodes[0];
    if (child && child.tagName === "IMG") {
      if (child.classList.contains(color)) break;
      else {
        moves.push(i);
        attacks.push(i);
        break;
      }
    }
    moves.push(i);
  }

  // Top-right diagonal (subtract 7)
  i = index;
  while (true) {
    if ((i + 1) % 8 === 0) break; // reached right edge
    i -= 7;
    if (i < 0) break;
    const square = document.getElementById(i);
    const child = square && square.childNodes[0];
    if (child && child.tagName === "IMG") {
      if (child.classList.contains(color)) break;
      else {
        moves.push(i);
        attacks.push(i);

        break;
      }
    }
    moves.push(i);
  }

  // Bottom-left diagonal (add 7)
  i = index;
  while (true) {
    if (i % 8 === 0) break; // reached left edge
    i += 7;
    if (i > 63) break;
    const square = document.getElementById(i);
    const child = square && square.childNodes[0];
    if (child && child.tagName === "IMG") {
      if (child.classList.contains(color)) break;
      else {
        moves.push(i);
        attacks.push(i);

        break;
      }
    }
    moves.push(i);
  }

  // Bottom-right diagonal (add 9)
  i = index;
  while (true) {
    if ((i + 1) % 8 === 0) break; // reached right edge
    i += 9;
    if (i > 63) break;
    const square = document.getElementById(i);
    const child = square && square.childNodes[0];
    if (child && child.tagName === "IMG") {
      if (child.classList.contains(color)) break;
      else {
        attacks.push(i);

        moves.push(i);
        break;
      }
    }
    moves.push(i);
  }
  return { moves, attacks };
}
export function PawnMoves(index, color) {
  if (index < 0 || index > 63) return [];
  let moves = [];
  let attacks = [];
  // Set the direction: white moves "up" (index decreases), black moves "down" (index increases)
  let direction = color === "white" ? 8 : -8;
  let i = index + direction;
  const square = document.getElementById(i);
  const child = square && square.childNodes[0];
  if (!child) moves.push(i);
  if (
    ((index < 16 && color === "white") || (index > 47 && color === "black")) &&
    moves.length
  ) {
    i = index + 2 * direction;
    const square = document.getElementById(i);
    const child = square && square.childNodes[0];
    if (!child) moves.push(i);
  }
  direction = [7, 9];
  for (let dir of direction) {
    i = color === "white" ? index + dir : index - dir;
    if (
      Math.trunc(i / 8) == Math.trunc(index / 8) ||
      Math.abs(Math.trunc(i / 8) - Math.trunc(index / 8)) != 1
    )
      continue;
    const square = document.getElementById(i);
    const child = square && square.childNodes[0];
    if (child && child.tagName === "IMG" && !child.classList.contains(color))
      moves.push(i);
    attacks.push(i);
  }
  return { moves, attacks };
}
export function knightMoves(index, color) {
  if (index < 0 || index > 63) return [];
  let moves = [];
  let attacks = [];
  let directions = [-17, -15, -10, -6, 6, 10, 15, 17];

  for (let move of directions) {
    let i = index + move;
    if (i < 0 || i > 63) continue;

    let col = index % 8;
    let newCol = i % 8;

    // Ensure movement stays within the same region of columns
    if (Math.abs(newCol - col) > 2) continue;

    const square = document.getElementById(i);
    const child = square && square.childNodes[0];
    if (child && child.tagName === "IMG") {
      if (!child.classList.contains(color)) {
        moves.push(i);
        attacks.push(i);
      } else continue;
    }

    moves.push(i);
  }
  return { moves, attacks };
}
export function KingMoves(index, color) {
  if (index < 0 || index > 63) return [];
  let moves = [];
  let attacks = [];
  let directions = [-9, -8, -7, -1, 1, 7, 8, 9];
  for (let dir of directions) {
    let i = index + dir;
    if (i < 0 || i > 63) continue;
    let col = index % 8;
    let newCol = i % 8;
    if (Math.abs(newCol - col) > 1) continue;
    const square = document.getElementById(i);
    const child = square && square.childNodes[0];
    if (child && child.tagName === "IMG") {
      if (!child.classList.contains(color)) {
        moves.push(i);
        attacks.push(i);
      } else continue;
    }
    moves.push(i);
  }
  return { moves, attacks };
}
