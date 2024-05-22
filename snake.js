document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const boardSize = 20;
    const snakeSpeed = 150;

    // Variables
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 5, y: 5 };
    let dx = 0;
    let dy = 0;
    let changingDirection = false;
    let gameLoop;

    // DOM elements
    const startButton = document.getElementById('start-button');
    const startScreen = document.getElementById('start-screen');
    const gameBoard = document.getElementById('game-board');

    // Event listeners
    startButton.addEventListener('click', startGame);
    document.addEventListener('keydown', changeDirection);

    // Functions
    function startGame() {
        startScreen.style.opacity = 0;
        setTimeout(() => {
            startScreen.style.display = 'none';
            gameBoard.style.display = 'grid';
            gameLoop = setInterval(gameLoopFunction, snakeSpeed);
            startButton.removeEventListener('click', startGame);
        }, 800); // 800 milliseconds delay
    }

    function gameLoopFunction() {
        clearBoard();
        moveSnake();
        drawSnake();
        drawFood();
        checkCollision();
        changingDirection = false;
    }

    function clearBoard() {
        gameBoard.innerHTML = '';
    }

    function drawSnake() {
        snake.forEach(segment => {
            const snakeElement = createBoardElement('div', 'snake');
            setPosition(snakeElement, segment.x, segment.y);
            gameBoard.appendChild(snakeElement);
        });
    }

    function drawFood() {
        const foodElement = createBoardElement('div', 'food');
        setPosition(foodElement, food.x, food.y);
        gameBoard.appendChild(foodElement);
    }

    function setPosition(element, x, y) {
        element.style.gridColumnStart = x;
        element.style.gridRowStart = y;
    }

    function createBoardElement(tagName, className) {
        const element = document.createElement(tagName);
        element.classList.add(className);
        return element;
    }

    function moveSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            food = generateFoodPosition();
        } else {
            snake.pop();
        }
    }

    function generateFoodPosition() {
        return {
            x: Math.floor(Math.random() * boardSize) + 1,
            y: Math.floor(Math.random() * boardSize) + 1
        };
    }

    function checkCollision() {
        if (
            snake[0].x < 1 || snake[0].x > boardSize ||
            snake[0].y < 1 || snake[0].y > boardSize ||
            snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
        ) {
            clearInterval(gameLoop);
            alert('Game Over! Your Score: ' + (snake.length - 1));
            resetGame();
        }
    }

    function resetGame() {
        startScreen.style.display = 'block';
        gameBoard.style.display = 'none';
        snake = [{ x: 10, y: 10 }];
        food = generateFoodPosition();
        dx = 0;
        dy = 0;
        changingDirection = false;
        startButton.innerText = 'Start Game';
        startButton.addEventListener('click', startGame);
    }

    function changeDirection(event) {
        if (changingDirection) return;
        changingDirection = true;
        const keyPressed = event.key;
        const goingUp = dy === -1;
        const goingDown = dy === 1;
        const goingRight = dx === 1;
        const goingLeft = dx === -1;
        if (keyPressed === 'ArrowUp' && !goingDown) {
            dx = 0;
            dy = -1;
        }
        if (keyPressed === 'ArrowDown' && !goingUp) {
            dx = 0;
            dy = 1;
        }
        if (keyPressed === 'ArrowRight' && !goingLeft) {
            dx = 1;
            dy = 0;
        }
        if (keyPressed === 'ArrowLeft' && !goingRight) {
            dx = -1;
            dy = 0;
        }
    }
});
