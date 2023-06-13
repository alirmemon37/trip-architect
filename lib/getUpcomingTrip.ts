import { closestIndexTo, isAfter } from "date-fns";

export default function getUpcomingTrip(trips: Trip[]) {
  // compare the start date of each trip and return the trip with the earliest start date using date-fns
  // https://date-fns.org/v2.16.1/docs/compareAsc
  // https://date-fns.org/v2.16.1/docs/compareDesc
  // https://date-fns.org/v2.16.1/docs/parseISO
  // https://date-fns.org/v2.16.1/docs/format
  // https://date-fns.org/v2.16.1/docs/isAfter

  // compare the start date of each trip and return the trip with the earliest start date using date-fns
  const todaysDate = new Date();

  const startDateArray = trips.map((trip) => trip.startDate);
  const startDateAfterToday = startDateArray.filter((date) => isAfter(date, todaysDate));

  const earliestStartDate = closestIndexTo(todaysDate, startDateAfterToday);

  // if there are no trips after today, return null
  if (earliestStartDate === -1) {
    return null;
  }

  // find the index of the trip with the earliest start date
  const earliestStartDateIndex = startDateArray.findIndex((date) => date === startDateAfterToday[earliestStartDate!]);

  // return the trip with the earliest start date
  return trips[earliestStartDateIndex];

}