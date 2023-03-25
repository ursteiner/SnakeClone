let canvas;
let context;
let snake = { posX: 10, posY: 10, speedX: 0, speedY: 0, width: 10, height: 10, color: "#154c79", alive: true };

window.onload = initGame;

function initGame() {
    document.onkeydown = handleUserInput;

    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');

    window.requestAnimationFrame(gameLoop);
}

function gameLoop() {
    console.log("X: " + snake.posX + " Y:" + snake.posY);

    checkGameEnd();

    if(snake.alive){
        update();
        draw();
    }

    setTimeout(() => {
        window.requestAnimationFrame(gameLoop);
    }, 300);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = snake.color;
    context.fillRect(snake.posX, snake.posY, snake.width, snake.height);
}

function update() {
    snake.posX += snake.speedX;
    snake.posY += snake.speedY;
}

function checkGameEnd(){
    if ((snake.posX + snake.speedX) < 0 
    || (snake.posX + snake.speedX) > (canvas.width - snake.width) 
    || snake.posY + snake.speedY < 0 
    || (snake.posY +snake.speedY) > (canvas.height - snake.height)) {
        snake.alive = false;
    }
}

function handleUserInput(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        snake.speedY = -snake.height;
        snake.speedX = 0;
    }
    else if (e.keyCode == '40') {
        snake.speedY = snake.height;
        snake.speedX = 0;
    }
    else if (e.keyCode == '37') {
        snake.speedY = 0;
        snake.speedX = -snake.width;
    }
    else if (e.keyCode == '39') {
        snake.speedY = 0;
        snake.speedX = snake.width;
    }
}