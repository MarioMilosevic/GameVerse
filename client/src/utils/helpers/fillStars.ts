export const fillStars = (index: number, length: number = 10) => {
  const newStarsArr = [];
  for (let i = 0; i < length; i++) {
    const value = i <= index ? "fill" : "empty";
    newStarsArr.push(value);
  }
  return newStarsArr;
};
