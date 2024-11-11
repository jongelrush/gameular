const boardSize = 20; // ukuran kotak 20x20 piksel
const gameBoard = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");
let snake = [{ x: 10, y: 10 }]; // posisi awal ular
let direction = { x: 0, y: 0 };
let food = generateFood();
let gameOver = false;
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const keyPressed = event.key;
  if (keyPressed === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -1 };
  if (keyPressed === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 1 };
  if (keyPressed === "ArrowLeft" && direction.x === 0) direction = { x: -1, y: 0 };
  if (keyPressed === "ArrowRight" && direction.x === 0) direction = { x: 1, y: 0 };
}

function generateFood() {
  return {
    x: Math.floor(Math.random() * (400 / boardSize)),
    y: Math.floor(Math.random() * (400 / boardSize)),
  };
}

function gameLoop() {
  if (gameOver) {
    alert("Game Over! Skor Anda: " + score);
    window.location.reload();
    return;
  }
  moveSnake();
  if (checkCollision()) gameOver = true;
  if (ateFood()) {
    score += 10;
    scoreDisplay.innerText = "Score: " + score;
    snake.push({ ...snake[snake.length - 1] });
    food = generateFood();
  }
  drawGame();
  setTimeout(gameLoop, 100);
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);
  snake.pop();
}

function checkCollision() {
  const [head, ...body] = snake;
  return head.x < 0 || head.x >= 400 / boardSize || head.y < 0 || head.y >= 400 / boardSize || body.some((segment) => segment.x === head.x && segment.y === head.y);
}

function ateFood() {
  return snake[0].x === food.x && snake[0].y === food.y;
}

function drawGame() {
  gameBoard.innerHTML = "";

  snake.forEach((segment, index) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.left = `${segment.x * boardSize}px`;
    snakeElement.style.top = `${segment.y * boardSize}px`;
    snakeElement.classList.add("snake");
    if (index === 0) snakeElement.classList.add("snake-head");
    gameBoard.appendChild(snakeElement);
  });

  const foodElement = document.createElement("div");
  foodElement.style.left = `${food.x * boardSize + 1}px`;
  foodElement.style.top = `${food.y * boardSize + 1}px`;
  foodElement.classList.add("food");
  gameBoard.appendChild(foodElement);
}

gameLoop();
