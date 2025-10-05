
let startTime;
let elapsedTime = 0;
let timerInterval;
let lapCounter = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    ms %= 3600000;
    const minutes = Math.floor(ms / 60000);
    ms %= 60000;
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;

    return (
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + '.' +
        String(milliseconds).padStart(3, '0')
    );
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }, 10); // Update every 10 milliseconds for smoother display
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = '00:00:00.000';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    lapList.innerHTML = ''; // Clear lap times
    lapCounter = 0;
}

function recordLap() {
    lapCounter++;
    const lapTime = formatTime(elapsedTime);
    const listItem = document.createElement('li');
    listItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapList.prepend(listItem); // Add new lap at the top
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

// Initial state
pauseBtn.disabled = true;
lapBtn.disabled = true;