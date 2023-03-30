/**
 * Capitalizes the first letter in a string:
 * ex/ "haPPY funnY Monkey!" becomes "HaPPY funnY Monkey!"
 * Nothing but the first letter changes.
 */
export const capitalize = (inputString: string) => {
  if (!inputString || inputString.length === 0) {
    return "";
  }

  return inputString[0].toLocaleUpperCase() + inputString.slice(1);
};
