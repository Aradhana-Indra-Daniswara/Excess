const formatTime = (time) => {
  return `${time.toString().slice(0, 2)}:${time.toString().slice(2, 4)}`;
};

export default formatTime;
