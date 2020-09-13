const daysEL = document.getElementById('days');
const hoursEL = document.getElementById('hours');
const minutesEL = document.getElementById('minutes');
const secondesEL = document.getElementById('secondes');

const newYears = '30 Jan 2021';

function countDown() {
  const newYearsdDate = new Date(newYears);
  const currentDate = new Date();

  const totalSeconds = (newYearsdDate - currentDate) / 1000;

  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  console.log(days, hours, minutes, seconds);

  daysEL.innerHTML = days;
  hoursEL.innerHTML = formatTime(hours);
  minutesEL.innerHTML = formatTime(minutes);
  secondesEL.innerHTML = formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

setInterval(countDown, 1000);
