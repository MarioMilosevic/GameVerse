import { format } from "date-fns";
import { apiUrl } from "./constants";

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

export const renderUserImage = (image: string) => image.startsWith("images")
    ? `${apiUrl}/public/${image}`
    : "https://social-network-js.vercel.app/img/profile5.png";
// const userImage = computed(() => {
//   if (!user.value.image) return "";

//   return user.value.image.startsWith("images")
//     ? `${apiUrl}/public/${user.value.image}`
//     : "https://social-network-js.vercel.app/img/profile5.png";
// });
