let canvas;
let context;
const width = 20;
const height = 20;
let snake = { posX: width, posY: height, speedX: 0, speedY: 0, width: width, height: height, color: "#820e20", alive: true, tail: [] };
let food = { posX: 100, posY: 100, width: width, height: height, color: "#ed6002" };

window.onload = initGame;

function initGame() {
    document.addEventListener("keydown",  (event) => {handleUserInput(event)});

    canvas = document.getElementById('gameCanvas');
    context = canvas.getContext('2d');

    window.requestAnimationFrame(gameLoop);
}

function gameLoop() {

    showText("score", "SCORE: " + snake.tail.length);

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
    context.fillRect(food.posX, food.posY, food.width-1, food.height-1);

    //tail
    context.fillStyle = snake.color;
    for (const tailPart of snake.tail) {
        context.fillRect(tailPart.posX, tailPart.posY, width-1, height-1);
    }

    //head
    context.fillRect(snake.posX, snake.posY, snake.width-1, snake.height-1);
    
    //eyes
    context.fillStyle = "white";
    if(snake.speedX > 0){
        context.fillRect(snake.posX + 10, snake.posY + 3, 4, 4);
        context.fillRect(snake.posX + 10, snake.posY + 13, 4, 4);
    }else if (snake.speedX < 0){
        context.fillRect(snake.posX + 3, snake.posY + 3, 4, 4);
        context.fillRect(snake.posX + 3, snake.posY + 13, 4, 4);
 
    }else if (snake.speedY > 0){
        context.fillRect(snake.posX + 3, snake.posY + 10, 4, 4);
        context.fillRect(snake.posX + 13, snake.posY + 10, 4, 4);
 
    }else if (snake.speedY < 0){
        context.fillRect(snake.posX + 3, snake.posY + 3, 4, 4);
        context.fillRect(snake.posX + 13, snake.posY + 3, 4, 4);
 
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
    for (const tailPart of snake.tail) {
        console.log(tailPart.posX + " " + snake.posX + " " + tailPart.posY + " " + snake.posY);
        if (tailPart.posX === snake.posX + snake.speedX && tailPart.posY === snake.posY + snake.speedY) {
            snake.alive = false;
            break;
        }
    }
}

function checkFoodMatched() {
    if (snake.posX === food.posX && snake.posY === food.posY) {
        //add snake tail element
        snake.tail.push({ posX: snake.posX, posY: snake.posY, width: width, height: height });
        replaceFood();
    }
}

function replaceFood() {
    let foodPlaceNotFree;
    do {
        foodPlaceNotFree = false;
        food.posX = Math.floor(Math.random() * (canvas.width / width)) * width;
        food.posY = Math.floor(Math.random() * (canvas.height / height)) * height;

        for (const tailPart of snake.tail) {
            if (food.posX === tailPart.posX && food.posY === tailPart.posY) {
                foodPlaceNotFree = true;
            }
        }
    } while (foodPlaceNotFree);
}

function handleUserInput(event) {

    switch(event.key){
        case 'ArrowUp':
            snake.speedY = -snake.height;
            snake.speedX = 0;
            break;
        case 'ArrowDown':
            snake.speedY = snake.height;
            snake.speedX = 0;
            break;
        case 'ArrowLeft':
            snake.speedY = 0;
            snake.speedX = -snake.width;
            break;
        case 'ArrowRight':
            snake.speedY = 0;
            snake.speedX = snake.width;
            break;
    }
}

function showText(id, text) {
    document.getElementById(id).innerHTML = text;
}