import CHRISTMAST_EVENT from "../../common/constants/christmasEvent.js";
import MENU from "../../common/constants/menu.js";
import eventCalendar from "../../common/instances/eventCalendar.js";
import "../../common/typedefs/index.js";

class DiscountBenefitComputer {
  /**
   * @param {number} dateOfMonth
   * @param {OrderedMenu[]} orderedMenus
   * @returns {DiscountBenefit[]}
   */
  computeDiscountBenefits(dateOfMonth, orderedMenus) {
    return [
      this.#computeDDayDiscountBenefit(dateOfMonth),
      this.#computeSpecialDiscountBenefit(dateOfMonth),
      this.#computeWeekendDiscountBenefit(dateOfMonth, orderedMenus),
      this.#computeWeekdayDiscountBenefit(dateOfMonth, orderedMenus),
    ];
  }

  /**
   * @param {number} dateOfMonth
   * @returns {DiscountBenefit}
   */
  #computeDDayDiscountBenefit(dateOfMonth) {
    const { eventType, discountType } = CHRISTMAST_EVENT;

    const benefitAmount = this.#calcuateDDayDiscountAmount(dateOfMonth);

    return this.#generateDiscountBenefit(
      eventType.discount,
      discountType.dDay,
      benefitAmount,
    );
  }

  /**
   * @param {number} dateOfMonth
   * @returns {DiscountBenefit}
   */
  #computeSpecialDiscountBenefit(dateOfMonth) {
    const { eventType, discountType } = CHRISTMAST_EVENT;

    const benefitAmount = this.#calculateSpecialDiscountAmount(dateOfMonth);

    return this.#generateDiscountBenefit(
      eventType.discount,
      discountType.special,
      benefitAmount,
    );
  }

  /**
   * @param {number} dateOfMonth
   * @param {OrderedMenu[]} orderedMenus
   * @returns {DiscountBenefit}
   */
  #computeWeekendDiscountBenefit(dateOfMonth, orderedMenus) {
    const { eventType, discountType } = CHRISTMAST_EVENT;

    const benefitAmount = this.#calculateWeekendDiscountBenefit(
      dateOfMonth,
      orderedMenus,
    );

    return this.#generateDiscountBenefit(
      eventType.discount,
      discountType.weekend,
      benefitAmount,
    );
  }

  /**
   * @param {number} dateOfMonth
   * @param {OrderedMenu[]} orderedMenus
   * @returns {DiscountBenefit}
   */
  #computeWeekdayDiscountBenefit(dateOfMonth, orderedMenus) {
    const { eventType, discountType } = CHRISTMAST_EVENT;

    const benefitAmount = this.#calculateWeekdayDiscountBenefit(
      dateOfMonth,
      orderedMenus,
    );

    return this.#generateDiscountBenefit(
      eventType.discount,
      discountType.weekday,
      benefitAmount,
    );
  }

  /**
   * @param {number} dateOfMonth
   * @returns {number}
   */
  #calcuateDDayDiscountAmount(dateOfMonth) {
    const {
      eventPeriod: { christmasDDay },
      discountAmount: { christmasDDayEvent },
    } = CHRISTMAST_EVENT;

    if (christmasDDay.end < dateOfMonth) {
      return 0;
    }

    return (
      christmasDDayEvent.base +
      (dateOfMonth - christmasDDay.start) * christmasDDayEvent.dailyIncrease
    );
  }

  /**
   * @param {number} dateOfMonth
   * @returns {number}
   */
  #calculateSpecialDiscountAmount(dateOfMonth) {
    const { discountAmount } = CHRISTMAST_EVENT;

    const isSpecialEventDay = eventCalendar.isStarDay(dateOfMonth);

    return isSpecialEventDay ? discountAmount.specialEvent : 0;
  }

  /**
   * @param {number} dateOfMonth
   * @param {OrderedMenu[]} orderedMenus
   * @returns {number}
   */
  #calculateWeekendDiscountBenefit(dateOfMonth, orderedMenus) {
    const discountAmount = CHRISTMAST_EVENT.discountAmount.weekendEvent;
    const { main } = MENU.type;

    if (eventCalendar.isWeekday(dateOfMonth)) {
      return 0;
    }

    return orderedMenus.reduce(
      (prevSum, { type, count }) =>
        type === main ? prevSum + count * discountAmount : prevSum,
      0,
    );
  }

  /**
   * @param {number} dateOfMonth
   * @param {OrderedMenu[]} orderedMenus
   * @returns {number}
   */
  #calculateWeekdayDiscountBenefit(dateOfMonth, orderedMenus) {
    const discountAmount = CHRISTMAST_EVENT.discountAmount.weekdayEvent;
    const { dessert } = MENU.type;

    if (eventCalendar.isWeekend(dateOfMonth)) {
      return 0;
    }

    return orderedMenus.reduce(
      (prevSum, { type, count }) =>
        type === dessert ? prevSum + count * discountAmount : prevSum,
      0,
    );
  }

  /**
   * @param {string} evnetType
   * @param {string} discountType
   * @param {number} benefitAmount
   * @returns {DiscountBenefit}
   */
  #generateDiscountBenefit(eventType, discountType, benefitAmount) {
    return {
      eventType,
      discountType,
      benefitAmount,
    };
  }
}

export default DiscountBenefitComputer;
