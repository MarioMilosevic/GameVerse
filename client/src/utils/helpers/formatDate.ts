import { format } from "date-fns";

export const formatDate = (date: string) => {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Invalid Date";
  }

  return format(parsed, "dd MMMM yyyy");
};
