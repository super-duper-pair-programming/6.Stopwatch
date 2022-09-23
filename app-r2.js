const $start = document.querySelector('.start');
const $reset = document.querySelector('.reset');
const $display = document.querySelector('.display');
const $laps = document.querySelector('.laps');

// State
const timerState = { timerId: null, startTime: 0, stopTime: 0, lapNum: 0 };

const timerRender = displayTime => {
  $display.textContent = displayTime;
};

const btnRender = () => {
  $start.textContent = timerState.timerId === null ? 'Start' : 'Stop';
  $reset.textContent = timerState.timerId === null ? 'Reset' : 'Lap';
  $reset.disabled = timerState.startTime === 0;
};

const lapRender = lapTime => {
  $laps.style.display = 'grid';
  $laps.innerHTML += `
  <div class="lap-title">${(timerState.lapNum += 1)}</div>
  <div class="lap-title">${lapTime}</div>`;
};

const startTimer = () => {
  if (timerState.startTime === 0) timerState.startTime = new Date().getTime();
  else timerState.startTime += new Date().getTime() - timerState.stopTime;

  timerState.timerId = setInterval(() => {
    const diffTime = new Date().getTime() - timerState.startTime;
    const diffTimeStr = new Date(diffTime).toISOString().slice(14, 22).replace('.', ':');
    timerRender(diffTimeStr);
  }, 10);

  btnRender();
};

const stopTimer = () => {
  timerState.stopTime = new Date().getTime();
  clearInterval(timerState.timerId);
  timerState.timerId = null;
  btnRender();
};

const resetLap = () => {
  $laps.style.display = 'none';
  timerState.lapNum = 0;
  $laps.innerHTML = `
  <div class="lap-title">Laps</div>
  <div class="lap-title">Time</div>`;
};

const resetTimer = () => {
  timerState.startTime = 0;
  timerRender('00:00:00');
  resetLap();
  btnRender();
};

// Controller
$start.addEventListener('click', () => (timerState.timerId === null ? startTimer() : stopTimer()));

$reset.addEventListener('click', () => (timerState.timerId !== null ? lapRender($display.textContent) : resetTimer()));

// [변경사항]
// - 불필요한 상태 삭제
// - $display에 들어갈 타이머 문자열 처리 부분 간소화
// - if ... else 문을 삼항연산자로 대체하여 코드 간소화
