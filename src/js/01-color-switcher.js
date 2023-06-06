// 01-color-switcher.js
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const body = document.body;
let intervalId;

function startColorSwitcher() {
  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
  }, 1000);

  startButton.disabled = true;
  stopButton.disabled = false;
}

function stopColorSwitcher() {
  clearInterval(intervalId);

  startButton.disabled = false;
  stopButton.disabled = true;
}

startButton.addEventListener('click', startColorSwitcher);
stopButton.addEventListener('click', stopColorSwitcher);

// 01-color-switcher.js
