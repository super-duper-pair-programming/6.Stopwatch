const $start = document.querySelector('.start');
const $reset = document.querySelector('.reset');
const $display = document.querySelector('.display');
const $laps = document.querySelector('.laps');

let timerId = 0;
let stopTime = 0;
let startTime = 0;

$start.addEventListener('click', e => {
  if (e.target.innerHTML === 'Start') {
    e.target.innerHTML = 'Stop';
    $reset.innerHTML = 'Lap';
    $reset.disabled = false;

    if ($display.innerHTML === '00:00:00') startTime = new Date().getTime();
    else startTime += new Date().getTime() - stopTime;

    timerId = setInterval(() => {
      const diffTime = new Date().getTime() - startTime;
      const newTime = new Date(diffTime);

      $display.innerHTML = `${newTime.getMinutes().toString().padStart(2, '0')}:${newTime
        .getSeconds()
        .toString()
        .padStart(2, '0')}:${newTime.getMilliseconds().toString().slice(0, 2).padEnd(2, '0')}`;
    }, 10);
  } else {
    stopTime = new Date().getTime();
    clearInterval(timerId);
    e.target.innerHTML = 'Start';
    $reset.innerHTML = 'Reset';
  }
});

let lapNum = 1;
$reset.addEventListener('click', e => {
  if (e.target.innerHTML === 'Lap') {
    $laps.style.display = 'grid';
    $laps.innerHTML += `
    <div class="lap-title">${lapNum++}</div>
    <div class="lap-title">${$display.innerHTML}</div>`;
  } else {
    clearInterval(timerId);
    $display.innerHTML = '00:00:00';
    $laps.innerHTML = `
    <div class="lap-title">Laps</div>
    <div class="lap-title">Time</div>`;
    $laps.style.display = 'none';
    lapNum = 1;
    $reset.disabled = true;
  }
});

// const startTime = new Date();

// startTime.setMinutes(0, 0, 0);
// console.log(startTime.getMinutes());
// console.log(startTime.getSeconds());
// console.log(startTime.getMilliseconds());

// setInterval(() => console.log(new Date().getTime()), 100);
