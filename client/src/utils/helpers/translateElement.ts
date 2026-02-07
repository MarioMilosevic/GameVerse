export const translateElement = (index: number, selectedIndex: number) => {
  const calculation = 100 * (index - selectedIndex);
  return `translateX(${calculation}%)`;
};
