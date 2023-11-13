const randomImgDraw = () => {
  const randomNum = Math.floor(Math.random() * 8);

  const imgUrl = `./src/momentum/img/${randomNum}.jpeg`;
  document.body.style.backgroundImage = `url(${imgUrl})`;
};

export const imgInit = () => {
  randomImgDraw();
};
