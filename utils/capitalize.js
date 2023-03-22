const capitalize = (inputString) => {
  if (!inputString || inputString.length === 0) {
    return "";
  }

  return inputString[0].toLocaleUpperCase() + inputString.slice(1);
};

module.exports = {
  capitalize,
};
