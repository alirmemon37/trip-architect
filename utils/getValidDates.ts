import { eachDayOfInterval, format } from "date-fns";

export default function getValidDates(startDate: Date, endDate: Date) {
  const validDates = eachDayOfInterval({ start: startDate, end: endDate });
  const formattedDates = validDates.map((date) => format(date, "dd-MM-yyyy"));
  return formattedDates;
}