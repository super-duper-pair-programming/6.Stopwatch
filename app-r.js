const $start = document.querySelector('.start');
const $reset = document.querySelector('.reset');
const $display = document.querySelector('.display');
const $laps = document.querySelector('.laps');

// State
let buttonState = { startStopBtn: 'Start', resetLapBtn: 'Reset', isResetLapBtnDisabled: true };
let timerState = { timerId: 0, stopTime: 0, startTime: 0, displayTime: '00:00:00', lapNum: 1 };

const timerRender = () => {
  $display.textContent = timerState.displayTime;
};

const btnRender = () => {
  $start.textContent = buttonState.startStopBtn;
  $reset.textContent = buttonState.resetLapBtn;
  $reset.disabled = buttonState.isResetLapBtnDisabled;
};

const lapRender = () => {
  $laps.style.display = 'grid';
  $laps.innerHTML += `
  <div class="lap-title">${timerState.lapNum++}</div>
  <div class="lap-title">${timerState.displayTime}</div>`;
};

const resetLapRender = () => {
  $laps.innerHTML = `
  <div class="lap-title">Laps</div>
  <div class="lap-title">Time</div>`;

  $laps.style.display = 'none';
};

const setTimerState = state => {
  timerState = { ...timerState, ...state };
  timerRender();
};

const setBtnState = state => {
  buttonState = { ...buttonState, ...state };
  btnRender();
};

const startTimer = () => {
  setBtnState({ startStopBtn: 'Stop', resetLapBtn: 'Lap', isResetLapBtnDisabled: false });

  if (timerState === '00:00:00') timerState.startTime = new Date().getTime();
  else timerState.startTime += new Date().getTime() - timerState.stopTime;

  timerState.timerId = setInterval(() => {
    const diffTime = new Date().getTime() - timerState.startTime;
    const newTime = new Date(diffTime);
    const newTimeMinute = newTime.getMinutes().toString().padStart(2, '0');
    const newTimeSecond = newTime.getSeconds().toString().padStart(2, '0');
    const newTimeMillisecond = newTime.getMilliseconds().toString().slice(0, 2).padEnd(2, '0');

    setTimerState({
      displayTime: `${newTimeMinute}:${newTimeSecond}:${newTimeMillisecond}`,
    });
  }, 10);
};

const stopTimer = () => {
  timerState.stopTime = new Date().getTime();
  clearInterval(timerState.timerId);
  setBtnState({ startStopBtn: 'Start', resetLapBtn: 'Reset' });
};

const resetTimer = () => {
  clearInterval(timerState.timerId);
  setTimerState({ displayTime: '00:00:00', lapNum: 1 });
  resetLapRender();
  setBtnState({ isResetLapBtnDisabled: true });
};

// Controller
$start.addEventListener('click', () => {
  if (buttonState.startStopBtn === 'Start') startTimer();
  else stopTimer();
});

$reset.addEventListener('click', () => {
  if (buttonState.resetLapBtn === 'Lap') lapRender();
  else resetTimer();
});

// [변경사항]
// - 버튼의 상태와 타이머의 상태를 모두 별도의 상태로 관리
// - event listener 안의 코드들을 역할에 따라 함수로 분리
