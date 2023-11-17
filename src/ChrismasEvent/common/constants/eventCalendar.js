import EVENT_DATE from "./eventDate.js";

const weekends = Object.freeze(["금", "토"]);
const starEventDates = Object.freeze([3, 10, 17, 24, 25, 31]);

const CALENDAR_INFORMATIONS = (() => {
  const result = [];

  for (let day = 1; day <= EVENT_DATE.lastDayInMonth; day += 1) {
    const date = new Date(EVENT_DATE.year, EVENT_DATE.month, day);
    const dayOfWeek = date.toLocaleDateString("ko-KR", { weekday: "short" });
    result[day] = Object.freeze({
      dayOfWeek,
      isStar: starEventDates.includes(day),
      isWeekend: weekends.includes(dayOfWeek),
    });
  }

  return Object.freeze(result);
})();

export default CALENDAR_INFORMATIONS;
