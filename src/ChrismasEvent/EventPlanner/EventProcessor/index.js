import CHRISTMAST_EVENT from "../../constants/christmasEvent.js";
import EVENT_DATE from "../../constants/eventDate.js";
import MENU from "../../constants/menu.js";
import MenuBook from "../MenuBook.js";
import EventCalendar from "../EventCalendar.js";

/**
 * @typedef {Object} FreeGiftBenefit
 * @property {string} eventType
 * @property {string} menuName
 * @property {number} count
 * @property {number} benefitAmount
 */

/**
 * @typedef {Object} DiscountBenefit
 * @property {string} eventType
 * @property {string} discountType
 * @property {number} benefitAmount
 */

/**
 * @typedef {Array<FreeGiftBenefit | DiscountBenefit>} EventBenefitArray
 */

class EventProcessor {
  #eventCalendar;

  constructor() {
    this.#eventCalendar = new EventCalendar(EVENT_DATE.year, EVENT_DATE.month);
  }

  /**
   * @param {number} dateOfMonth
   * @param {import("../OrderProcess/index.js").OrderedStatement} orderedStatement
   * @returns {EventBenefitArray}
   */
  computeEventBenefits(dateOfMonth, { orderedMenus, totalPrice }) {
    if (totalPrice < CHRISTMAST_EVENT.minimumTotalPriceConditionForEvent) {
      return [];
    }

    const eventBenefits = [
      this.#computeFreeGiftBenefit(totalPrice),
      this.#computeDDayDiscountBenefit(dateOfMonth),
      this.#computeSpecialDiscountBenefit(dateOfMonth),
      this.#computeWeekendDiscountBenefit(dateOfMonth, orderedMenus),
      this.#computeWeekdayDiscountBenefit(dateOfMonth, orderedMenus),
    ];

    return eventBenefits;
  }

  /**
   * @param {EventBenefitArray} eventBenefits
   * @returns {number}
   */
  computeTotalBenefitAmount(eventBenefits) {
    return eventBenefits.reduce(
      (prevSum, { benefitAmount, count = null }) =>
        count === null
          ? prevSum + benefitAmount
          : prevSum + benefitAmount * count,
      0,
    );
  }

  /**
   * @param {EventBenefitArray} eventBenefits
   * @returns {number}
   */
  computeDiscountAmount(eventBenefits) {
    return eventBenefits.reduce(
      (prevSum, { eventType, benefitAmount }) =>
        eventType === CHRISTMAST_EVENT.eventType.discount
          ? prevSum + benefitAmount
          : prevSum,
      0,
    );
  }

  /**
   * @param {number} totalBenefitAmount
   * @returns {string}
   */
  computeEventBadge(totalBenefitAmount) {
    const { eventBadge } = CHRISTMAST_EVENT;

    if (totalBenefitAmount > eventBadge.santa.minimumCondition) {
      return eventBadge.santa.name;
    }
    if (totalBenefitAmount > eventBadge.tree.minimumCondition) {
      return eventBadge.tree.name;
    }
    if (totalBenefitAmount > eventBadge.star.minimumCondition) {
      return eventBadge.star.name;
    }
    return eventBadge.default;
  }

  /**
   * @param {number} totalPrice
   * @returns {FreeGiftBenefit}
   */
  #computeFreeGiftBenefit(totalPrice) {
    const { eventType, freeGift } = CHRISTMAST_EVENT;
    const conditionPrice = freeGift.minimumTotalPriceCondition;

    const freeGiftBenefit = {
      eventType: eventType.freeGift,
      menuName: freeGift.menuName,
      count: freeGift.count,
      benefitAmount:
        totalPrice < conditionPrice
          ? 0
          : new MenuBook().findMenuPrice(freeGift.menuName),
    };
    return freeGiftBenefit;
  }

  /**
   * @param {number} dateOfMonth
   * @returns {DiscountBenefit}
   */
  #computeDDayDiscountBenefit(dateOfMonth) {
    const { discountType } = CHRISTMAST_EVENT;

    const benefitAmount = this.#calcuateDDayDiscountAmount(dateOfMonth);

    const discountBenefit = this.#generateDiscountBenefit(
      discountType.dDay,
      benefitAmount,
    );

    return discountBenefit;
  }

  /**
   * @param {number} dateOfMonth
   * @returns {DiscountBenefit}
   */
  #computeSpecialDiscountBenefit(dateOfMonth) {
    const { discountAmount } = CHRISTMAST_EVENT;

    const isSpecialEventDay = this.#eventCalendar.isStarDay(dateOfMonth);

    const benefitAmount = isSpecialEventDay ? discountAmount.specialEvent : 0;

    return this.#generateSpecialDiscountBenefit(benefitAmount);
  }

  /**
   * @param {number} dateOfMonth
   * @param {import("../OrderProcess/index.js").OrderedMenu[]} orderedMenus
   * @returns {DiscountBenefit}
   */
  #computeWeekendDiscountBenefit(dateOfMonth, orderedMenus) {
    const { discountAmount } = CHRISTMAST_EVENT;

    const benefitAmount = this.#eventCalendar.isWeekend(dateOfMonth)
      ? this.#sumDiscountAmount(
          orderedMenus,
          MENU.type.main,
          discountAmount.weekendEvent,
        )
      : 0;

    return this.#generateWeekendDiscountBenefit(benefitAmount);
  }

  /**
   * @param {number} dateOfMonth
   * @param {import("../OrderProcess/index.js").OrderedMenu[]} orderedMenus
   * @returns {DiscountBenefit}
   */
  #computeWeekdayDiscountBenefit(dateOfMonth, orderedMenus) {
    const { discountAmount } = CHRISTMAST_EVENT;

    const benefitAmount = this.#eventCalendar.isWeekday(dateOfMonth)
      ? this.#sumDiscountAmount(
          orderedMenus,
          MENU.type.dessert,
          discountAmount.weekdayEvent,
        )
      : 0;

    return this.#generateWeekdayDiscountBenefit(benefitAmount);
  }

  /**
   * @param {number} benefitAmount
   * @returns {DiscountBenefit}
   */
  #generateSpecialDiscountBenefit(benefitAmount) {
    const { discountType } = CHRISTMAST_EVENT;

    const discountBenefit = this.#generateDiscountBenefit(
      discountType.special,
      benefitAmount,
    );

    return discountBenefit;
  }

  /**
   * @param {number} benefitAmount
   * @returns {DiscountBenefit}
   */
  #generateWeekendDiscountBenefit(benefitAmount) {
    const { discountType } = CHRISTMAST_EVENT;

    const discountBenefit = this.#generateDiscountBenefit(
      discountType.weekend,
      benefitAmount,
    );

    return discountBenefit;
  }

  /**
   * @param {number} benefitAmount
   * @returns {DiscountBenefit}
   */
  #generateWeekdayDiscountBenefit(benefitAmount) {
    const { discountType } = CHRISTMAST_EVENT;

    const discountBenefit = this.#generateDiscountBenefit(
      discountType.weekday,
      benefitAmount,
    );

    return discountBenefit;
  }

  /**
   * @param {string} discountType
   * @param {number} benefitAmount
   * @returns {DiscountBenefit}
   */
  #generateDiscountBenefit(discountType, benefitAmount) {
    return {
      eventType: CHRISTMAST_EVENT.eventType.discount,
      discountType,
      benefitAmount,
    };
  }

  /**
   * @param {number} dateOfMonth
   * @returns {number}
   */
  #calcuateDDayDiscountAmount(dateOfMonth) {
    const { eventPeriod, discountAmount } = CHRISTMAST_EVENT;

    if (eventPeriod.christmasDDay.end < dateOfMonth) {
      return 0;
    }

    return (
      discountAmount.christmasDDayEvent +
      (dateOfMonth - eventPeriod.christmasDDay.start) * 100
    );
  }

  /**
   *
   * @param {import("../OrderProcess/index.js").OrderedMenu[]} orderedMenus
   * @param {string} menuType
   * @param {number} discountAmount
   * @returns
   */
  #sumDiscountAmount(orderedMenus, menuType, discountAmount) {
    return orderedMenus.reduce(
      (prevSum, { type, count }) =>
        type === menuType ? prevSum + count * discountAmount : prevSum,
      0,
    );
  }
}

export default EventProcessor;
