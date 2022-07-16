
let breakTimer;
let sessionTimer;

const buttonReset = document.getElementById("reset");
const timeLeft = document.getElementById("time-left");

buttonReset.addEventListener('click', () => {
    breakTimer = 5;
    sessionTimer = 25;
    minutes = sessionTimer;

    timeLeft.innerText = `${minutes}:00`;
})