import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="countainer">
        <h1>JavaScript Snake Game</h1>
        <div class="scors" id="scors">
            <h2>SCORE: <span id="score"></span></h2>
            <h2>HIGH SCORE: <span id="highScore">000</span></h2>
        </div>
        <div class="sectionGame" id="sectionGame"></div>
        <div class="theRslt" id="theRslt">
            <h2 id="resultGame" class="resultGame">Click to begin</h2>
            <button class="forPlay" id="forPlay">Play</button>
        </div>
    </div>
`

let score = <HTMLElement> document.getElementById('score'),
    Hscore = <HTMLElement> document.getElementById('highScore'),
    game = <HTMLElement> document.getElementById('sectionGame'),
    stopSnake = <HTMLElement> document.getElementById('theRslt'),
    play = <HTMLElement> document.getElementById('forPlay');
    
    
let num = 0;
let sec = 0;
let snakeY = 0;
let snakeX = 0;
let foodY = 0;
let foodX = 0;
type snakes = [number, number]
let arrayOfSnake: snakes[] = [];
let scr = 0;
let arrayOfPoint: number[] = [];

// click to start the game 

play.addEventListener('click', startTheGame)

function startTheGame() {
    stopSnake.style.display = "none";
    
    snakeX = 5;
    snakeY = 10;
    foodX = 0;
    foodY = 0;
    arrayOfSnake = [];

    // let startRnd = "";

    let getLCST = localStorage.getItem('highScore');
    Hscore.innerHTML = getLCST ? `${Math.max(...JSON.parse(getLCST))}` : "";
    
    playTheGame();
    randomTheFood();
    setInterval(() => {
        buildTheSnake()
    }, 140);
}
    

// move the snake when i click
function changeDirection(e: KeyboardEvent) {
    if (e.key === "ArrowRight") {
        num = 1;
        sec = 0;
    } else if (e.key === "ArrowLeft") {
        num = -1;
        sec = 0;
    } else if (e.key === "ArrowDown") {
        num = 0;
        sec = 1;
    } else if (e.key === "ArrowUp") {
        num = 0;
        sec = -1;
    } 
}

// random the eatpoint 
function randomTheFood() {
    let rndRow = Math.floor(Math.random() * 30) + 1;
    let rndColumn = Math.floor(Math.random() * 30) + 1;

    foodX = rndRow;
    foodY = rndColumn;
}

function buildTheSnake() {
    let snakeBody = `<div class="point" id="point" style='grid-area: ${foodY} / ${foodX}'></div>`;
    
    // when eat the food 
    if (snakeX === foodX && snakeY === foodY) {
        randomTheFood();
        arrayOfSnake.push([foodX, foodY]);
        scr += 1;
        score.innerHTML = `${scr}`;
    }

    // update the snake position 
    snakeY += sec;
    snakeX += num;

    for (let j = arrayOfSnake.length - 1; j > 0; j--) {
        arrayOfSnake[j] = arrayOfSnake[j - 1];
    }

    // the head of the snake 
    arrayOfSnake[0] = [snakeX , snakeY]
    
    
    for (let i = 0; i < arrayOfSnake.length; i++) {
        snakeBody += `<div class="snake" id="snake" style='grid-area: ${arrayOfSnake[i][1]} / ${arrayOfSnake[i][0]}'></div>`;
    }

    // snake head bumped into his body 
    for (let i = 1; i < arrayOfSnake.length; i++) {
        if (arrayOfSnake[0][0] === arrayOfSnake[i][0] &&
            arrayOfSnake[0][1] === arrayOfSnake[i][1]) {
            snakeX = 14;
            snakeY = 13;
            arrayOfSnake = [];
            arrayOfPoint.push(scr);
            scr = 0;
            score.innerHTML = "0";

            let arr = JSON.stringify(arrayOfPoint);
            localStorage.setItem('highScore', arr);

            alert('TRY AGAIN');

            let getLCST = localStorage.getItem('highScore');
            Hscore.innerHTML = getLCST ? `${Math.max(...JSON.parse(getLCST))}` : "";
        }
    }
    
    game.innerHTML = snakeBody;


    // bumped into the bracket 
    if (snakeX === 31 || snakeX === 0 || snakeY === 31 || snakeY === 0) {
        snakeX = 7;
        snakeY = 13;
        arrayOfSnake = [];
        arrayOfPoint.push(scr);
        scr = 0;
        score.innerHTML = "0";

        let arr = JSON.stringify(arrayOfPoint);
        localStorage.setItem('highScore', arr);

        alert('TRY AGAIN');

        let getLCST = localStorage.getItem('highScore');
        Hscore.innerHTML = getLCST ? `${Math.max(...JSON.parse(getLCST))}` : "";
    }
}

changeDirection;
function playTheGame() {
    document.addEventListener('keydown', (e) => changeDirection(e));
}

