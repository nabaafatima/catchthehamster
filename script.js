const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start-btn');

let score = 0;
let timeLeft = 30;
let lastHole;
let gameInterval;
let countdownInterval;
function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole || hole.classList.contains('active')) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}
function popUpHamster() {
    const time = Math.random() * (800 - 400) + 400; 
    const hole = randomHole(holes);
    hole.classList.add('active');
    setTimeout(() => {
        hole.classList.remove('active');
    }, time);
}
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    startBtn.disabled = true;
    gameInterval = setInterval(popUpHamster, 1000);
    countdownInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            clearInterval(countdownInterval);
            holes.forEach(hole => hole.classList.remove('active'));
            alert(`Game Over! You caught ${score} hamsters!`);
            startBtn.disabled = false;
        }
    }, 1000);
}
function whack(e) {
    if (!this.classList.contains('active')) return;
    score++;
    this.classList.remove('active');
    scoreDisplay.textContent = score;
}
startBtn.addEventListener('click', startGame);
holes.forEach(hole => hole.addEventListener('mousedown', whack));