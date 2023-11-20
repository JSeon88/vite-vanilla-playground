import { imgInit } from './image';

const loginFormEl = document.querySelector('#uid_login_form');
const inputEl = loginFormEl?.querySelector('input');
const usernameEl = document.querySelector('#uid_username');
const momentumEl = document.querySelector('#uid_momentum');

const username = localStorage.getItem('username');

const drawUsername = (username: string) => {
  loginFormEl?.classList.add('hidden');
  momentumEl?.classList.remove('hidden');

  const h2 = document.createElement('h2');
  h2.innerText = `Hi! ${username}`;
  usernameEl?.appendChild(h2);
};

const handleLogin = (event: Event) => {
  event.preventDefault();
  if (inputEl) {
    const username: string = inputEl.value;
    localStorage.setItem('username', username);
    drawUsername(username);
  }
  imgInit();
};

export const loginInit = () => {
  loginFormEl?.addEventListener('submit', handleLogin);

  if (username) {
    drawUsername(username);
    imgInit();
  }
};
