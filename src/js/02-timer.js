import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      window.alert('Please choose a date in the future');
      return;
    }

    startButton.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

const startButton = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let countdownInterval;

function startCountdown() {
  const selectedDate = flatpickr.parseDate(
    document.getElementById('datetime-picker').value
  );
  const currentDate = new Date();
  const timeDifference = selectedDate - currentDate;

  if (timeDifference <= 0) {
    return;
  }

  updateCountdown(timeDifference);

  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const updatedTimeDifference = selectedDate - currentTime;

    if (updatedTimeDifference <= 0) {
      clearInterval(countdownInterval);
      updateCountdown(0);
      return;
    }

    updateCountdown(updatedTimeDifference);
  }, 1000);
}

function updateCountdown(timeDifference) {
  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  timerDays.textContent = formatTime(days);
  timerHours.textContent = formatTime(hours);
  timerMinutes.textContent = formatTime(minutes);
  timerSeconds.textContent = formatTime(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function formatTime(time) {
  return time.toString().padStart(2, '0');
}

startButton.addEventListener('click', startCountdown);
