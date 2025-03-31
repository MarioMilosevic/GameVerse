import { format } from "date-fns";

export const translateElement = (index: number, selectedIndex: number) => {
  const calculation = 100 * (index - selectedIndex);
  return `translateX(${calculation}%)`;
};

export const formattedDate = (date: string) =>
  format(new Date(date), "dd MMMM yyyy");

export const fillStars = (index: number, length: number = 10) => {
  const newStarsArr = [];
  for (let i = 0; i < length; i++) {
    const value = i <= index ? "fill" : "empty";
    newStarsArr.push(value);
  }
  return newStarsArr;
};