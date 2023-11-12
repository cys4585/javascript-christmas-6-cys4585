import CHRISTMAST_EVENT from "../constants/christmasEvent.js";
import EVENT_DATE from "../constants/eventDate.js";

class EventCalendar {
  #decemberInformations;

  /**
   * @param {number} year
   * @param {number} month
   */
  constructor(year, month) {
    this.#generateCalendarInformations(year, month);
  }

  #generateCalendarInformations(year, month) {
    this.#decemberInformations = {};

    for (let day = 1; day <= EVENT_DATE.lastDayInMonth; day += 1) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.toLocaleDateString("ko-KR", { weekday: "short" });

      this.#decemberInformations[day] = {
        dayOfWeek,
        isStar: CHRISTMAST_EVENT.starEventDays.includes(day),
      };
    }
  }

  /**
   * @param {number} dateOfMonth
   * @returns {boolean}
   */
  isStarDay(dateOfMonth) {
    return this.#decemberInformations[dateOfMonth].isStar;
  }

  /**
   * @param {number} dateOfMonth
   * @returns {boolean}
   */
  isWeekend(dateOfMonth) {
    const { dayOfWeek } = this.#decemberInformations[dateOfMonth];
    return CHRISTMAST_EVENT.weekends.includes(dayOfWeek);
  }

  /**
   * @param {number} dateOfMonth
   * @returns {boolean}
   */
  isWeekday(dateOfMonth) {
    return !this.isWeekend(dateOfMonth);
  }
}

export default EventCalendar;
