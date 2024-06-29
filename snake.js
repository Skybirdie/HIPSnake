var blockSize = 25;
var rows = 20;
var cols = 15;
var board;
var context;

var snakeX;
var snakeY;
var velocityX;
var velocityY;

var snakeBody = [];
var foodX;
var foodY;
var gameOver = false;
var speed;
var foodEaten;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    document.getElementById("startButton").addEventListener("click", startGame);
    document.addEventListener("keyup", changeDirection);
    board.addEventListener("click", changeDirectionTouch);
}

function startGame() {
    resetGame();
    placeFood();
    setInterval(update, speed);
}

function resetGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    foodEaten = 0;
    gameOver = false;
    speed = 100; // Reset speed to 100 ms per update
}

function update() {
    if (gameOver) return;

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        foodEaten++;
        if (foodEaten % 10 === 0) {
            speed *= 0.9; // Increase speed
        }
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    snakeX += velocityX * blockSize * 0.5;
    snakeY += velocityY * blockSize * 0.5;

    context.fillStyle = "lime";
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function changeDirectionTouch(e) {
    const rect = board.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = snakeX + blockSize / 2;
    const centerY = snakeY + blockSize / 2;

    const dx = x - centerX;
    const dy = y - centerY;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && velocityX != -1) {
            velocityX = 1;
            velocityY = 0;
        } else if (velocityX != 1) {
            velocityX = -1;
            velocityY = 0;
        }
    } else {
        if (dy > 0 && velocityY != -1) {
            velocityX = 0;
            velocityY = 1;
        } else if (velocityY != 1) {
            velocityX = 0;
            velocityY = -1;
        }
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
