const clockEl: HTMLElement | null = document.querySelector('#uid_clock h1');
let lastTime: number;

const drawClock = (currentDate: Date) => {
  if (!clockEl) {
    return;
  }

  const hour = String(currentDate.getHours()).padStart(2, '0');
  const min = String(currentDate.getMinutes()).padStart(2, '0');
  const sec = String(currentDate.getSeconds()).padStart(2, '0');

  clockEl.innerText = `${hour} : ${min} : ${sec}`;
};

const tick = (render: (currentDate: Date) => void) => {
  const currentDate = new Date();
  const currentTime = currentDate.getTime();

  if (!lastTime) {
    lastTime = currentTime;
    render(currentDate);
  }

  if (currentTime - lastTime > 500) {
    lastTime = currentTime;

    render(currentDate);
  }
  requestAnimationFrame(() => tick(render));
};

// requestAnimationFrame(() => tick(drawClock));
export const clockInit = () => {
  tick(drawClock);
};
