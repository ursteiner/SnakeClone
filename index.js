let canvas;
let context;
const width = 20;
const height = 20;
let snake = { posX: width, posY: height, speedX: 0, speedY: 0, width: width, height: height, color: "#154c79", alive: true, tail: [] };
let food = { posX: 100, posY: 100, width: width, height: height, color: "green" };

window.onload = initGame;

function initGame() {
    document.onkeydown = handleUserInput;

    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');

    window.requestAnimationFrame(gameLoop);
}

function gameLoop() {

    showText("score", "Score: " + snake.tail.length);

    checkGameEnd();
    checkFoodMatched();

    if (snake.alive) {
        update();
        draw();

        setTimeout(() => {
            window.requestAnimationFrame(gameLoop);
        }, 200);
    } else {
        showText("status", "GAME OVER");
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    //food
    context.fillStyle = food.color;
    context.fillRect(food.posX, food.posY, food.width, food.height);

    //head
    context.fillStyle = snake.color;
    context.fillRect(snake.posX, snake.posY, snake.width, snake.height);

    //tail
    for (let i = 0; i < snake.tail.length; i++) {
        const t = snake.tail[i];
        context.fillRect(t.posX, t.posY, width, height);
    }

}

function update() {

    for (let i = snake.tail.length - 1; i > 0; i--) {
        snake.tail[i].posX = snake.tail[i - 1].posX;
        snake.tail[i].posY = snake.tail[i - 1].posY;
    }

    if (snake.tail.length > 0) {
        snake.tail[0].posX = snake.posX;
        snake.tail[0].posY = snake.posY;
    }

    snake.posX += snake.speedX;
    snake.posY += snake.speedY;
}

function checkGameEnd() {
    //moved out of frame
    if ((snake.posX + snake.speedX) < 0
        || (snake.posX + snake.speedX) > (canvas.width - snake.width)
        || snake.posY + snake.speedY < 0
        || (snake.posY + snake.speedY) > (canvas.height - snake.height)) {
        snake.alive = false;
    }

    //tail hit
    for (let i = 0; i < snake.tail.length; i++) {
        const t = snake.tail[i];
        if (t.posX == snake.posX && t.posY == snake.posY) {
            snake.alive = false;
        }
    }
}

function checkFoodMatched() {
    if (snake.posX == food.posX && snake.posY == food.posY) {
        //add snake tail element
        snake.tail.push({ posX: food.posX, posY: food.posY, width: width, height: height });
        replaceFood();
    }
}

function replaceFood() {
    let reset;
    do {
        reset = false;
        food.posX = Math.floor(Math.random() * (canvas.width / width)) * width;
        food.posY = Math.floor(Math.random() * (canvas.height / height)) * height;

        for (let i = 0; i < snake.tail.length; i++) {
            const t = snake.tail[i];
            if (food.posX == t.posX && food.posY == t.posY) {
                reset = true;
            }
        }
    } while (reset);
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

function showText(id, text) {
    document.getElementById(id).innerHTML = text;
}