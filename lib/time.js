export const convertToMinutes = (time) => {
  const min = Math.floor((time / 1000 / 60) << 0),
    sec = Math.floor((time / 1000) % 60);

  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};
