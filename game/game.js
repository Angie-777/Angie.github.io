/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

//CUADRITOS DONDE SE MOVERA
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// FACKING VARIABLES
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let score = 0;
let level = 1;
let gameRunning = false;
let gamePaused = false;
let gameSpeed = 100;

// MASAJES
const loveMessages = [
    "¡Te amo! 💕",
    "Eres lo mejor que me pasó 🥰",
    "Cada día te amo más 💖",
    "Mi corazón es tuyo ❤️",
    "Eres mi persona favorita 🌟",
    "Te extraño cuando no estás 😘",
    "Eres mi razón para sonreír 😊",
    "Gracias por existir 💫",
    "Tu amor me hace feliz 🎉",
    "Eres mi mejor decisión 💝",
    "Te quiero más que a la vida 💕",
    "Eres mi sueño hecho realidad ✨",
    "Mi vida es mejor contigo 🌹",
    "Te amo hasta el infinito 🚀",
    "Eres mi persona persona 👑",
    "Ojaña pasar el resto de mi vida a tu lado 😘",
    "Por más saliditas al cine💕",
    "Que buen poto te cargas👌",
    "Por mas comiditas compartidas😋",
    "Por la eternidad 😛",
    "Feliz cumple mi amor 🎂💕"
];

//FACKING FUNCIONES

function draw() {
    // Fondo
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // serpiente
    ctx.fillStyle = '#ff69b4';
    snake.forEach((segment, index) => {
        if (index === 0) {
            ctx.fillStyle = '#ff1493'; // Cabeza más oscura
            ctx.shadowColor = '#ff69b4';
            ctx.shadowBlur = 10;
        } else {
            ctx.fillStyle = '#ff69b4';
            ctx.shadowBlur = 5;
        }
        ctx.fillRect(
            segment.x * gridSize + 1,
            segment.y * gridSize + 1,
            gridSize - 2,
            gridSize - 2
        );
    });

    ctx.shadowColor = 'transparent';

    // ÑAM ÑAM
    drawHeart(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2);
}

//CORAZON
function drawHeart(x, y, size) {
    ctx.fillStyle = '#ff1493';
    ctx.beginPath();
    ctx.moveTo(x, y + size * 0.4);
    
    //LEFT
    ctx.bezierCurveTo(
        x - size * 0.6, y - size * 0.4,
        x - size * 0.9, y + size * 0.1,
        x, y + size * 0.8
    );
    
    //RIGHT
    ctx.bezierCurveTo(
        x + size * 0.9, y + size * 0.1,
        x + size * 0.6, y - size * 0.4,
        x, y + size * 0.4
    );
    
    ctx.fill();
}

function update() {
    if (!gameRunning || gamePaused) return;

    direction = nextDirection;

    // POSICION DE LA CHOMPA
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Detectar colisión con paredes
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        endGame();
        return;
    }

    // PA LA COLISION TERRIBLE
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
    }

    snake.unshift(head);

    //ÑAM ÑAM A LA ÑAM ÑAM
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = score;

        // NIVEL NUEVO CADA 50 PUNTOS
        if (score % 50 === 0) {
            level++;
            levelDisplay.textContent = level;
            gameSpeed = Math.max(50, gameSpeed - 5); // Aumentar velocidad
        }

        // DEICIR OLA
        showNotification();

        // PARA LA GENERALIZAZAO DE LA ÑAM ÑAM 
        generateFood();
    } else {
        snake.pop();
    }
}

// ALETORIZAR POSISASAO DE LA ÑAM ÑAM
function generateFood() {
    let newFood;
    let isOnSnake;

    do {
        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    } while (isOnSnake);

    food = newFood;
}

// MOSTRAR OLA
function showNotification() {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];

    notificationText.textContent = randomMessage;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// GAME OFF
function endGame() {
    gameRunning = false;
    alert(`¡Game Over! 💔\nPuntos: ${score}\nNivel: ${level}\n\n¡Vuelve a intentar!`);
}

// LOOPO
let lastTime = 0;
function gameLoop(currentTime) {
    if (currentTime - lastTime > gameSpeed) {
        update();
        draw();
        lastTime = currentTime;
    }
    requestAnimationFrame(gameLoop);
}

//EVENTOS LLAMADOS

// PA QUE DETECTE EL FACKING TECLAO
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;

    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) nextDirection = { x: 0, y: -1 };
            e.preventDefault();
            break;
        case 'ArrowDown':
            if (direction.y === 0) nextDirection = { x: 0, y: 1 };
            e.preventDefault();
            break;
        case 'ArrowLeft':
            if (direction.x === 0) nextDirection = { x: -1, y: 0 };
            e.preventDefault();
            break;
        case 'ArrowRight':
            if (direction.x === 0) nextDirection = { x: 1, y: 0 };
            e.preventDefault();
            break;
    }
});

// BUTONS
startBtn.addEventListener('click', () => {
    if (!gameRunning) {
        gameRunning = true;
        gamePaused = false;
        startBtn.textContent = '▶️ JUGANDO';
        pauseBtn.textContent = '⏸️ PAUSAR';
    }
});

pauseBtn.addEventListener('click', () => {
    if (gameRunning) {
        gamePaused = !gamePaused;
        pauseBtn.textContent = gamePaused ? '▶️ REANUDAR' : '⏸️ PAUSAR';
    }
});

resetBtn.addEventListener('click', () => {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    level = 1;
    gameSpeed = 100;
    gameRunning = false;
    gamePaused = false;
    scoreDisplay.textContent = '0';
    levelDisplay.textContent = '1';
    startBtn.textContent = '▶️ INICIAR';
    pauseBtn.textContent = '⏸️ PAUSAR';
    generateFood();
    draw();
});

// PA QUE ARRANQUE LA KOSA
generateFood();
draw();
requestAnimationFrame(gameLoop);


