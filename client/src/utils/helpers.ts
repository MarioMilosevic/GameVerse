import { format } from "date-fns";

export const translateElement = (index: number, selectedIndex: number) => {
  const calculation = 100 * (index - selectedIndex);
  return `translateX(${calculation}%)`;
};

export const formattedDate = (date: string) =>
  format(new Date(date), "dd MMMM yyyy");
