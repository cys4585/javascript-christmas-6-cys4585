import CALENDAR_INFORMATIONS from "../constants/eventCalendar.js";

class EventCalendar {
  #calendarInformations = CALENDAR_INFORMATIONS;

  /**
   * @param {number} dateOfMonth
   * @returns {boolean}
   */
  isStarDay(dateOfMonth) {
    return this.#calendarInformations[dateOfMonth].isStar;
  }

  /**
   * @param {number} dateOfMonth
   * @returns {boolean}
   */
  isWeekend(dateOfMonth) {
    return this.#calendarInformations[dateOfMonth].isWeekend;
  }

  /**
   * @param {number} dateOfMonth
   * @returns {boolean}
   */
  isWeekday(dateOfMonth) {
    return !this.isWeekend(dateOfMonth);
  }
}

const eventCalendar = new EventCalendar();
export default eventCalendar;
