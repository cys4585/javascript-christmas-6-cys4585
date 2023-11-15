import CHRISTMAST_EVENT from "../../common/constants/christmasEvent.js";
import DiscountBenefitComputer from "./DiscountBenefitComputer.js";
import FreeGiftBenefitComputer from "./FreeGiftBenefitComputer.js";
import "../../common/typedefs/index.js";

class EventProcessor {
  /**
   * @param {number} dateOfMonth
   * @param {OrderState} orderState
   * @returns {EventBenefitArray}
   */
  computeEventBenefits(dateOfMonth, { orderedMenus, totalPrice }) {
    if (totalPrice < CHRISTMAST_EVENT.minimumTotalPriceConditionForEvent) {
      return [];
    }

    const eventBenefits = [
      ...this.#computeFreeGiftBenefits(totalPrice),
      ...this.#computeDiscountBenefits(dateOfMonth, orderedMenus),
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
   * @param {number} totalPrice
   * @returns {FreeGiftBenefit[]}
   */
  #computeFreeGiftBenefits(totalPrice) {
    return new FreeGiftBenefitComputer().computeFreeGiftBenefits(totalPrice);
  }

  /**
   * @param {number} dateOfMonth
   * @param {OrderedMenu[]} orderedMenus
   * @returns {DiscountBenefit[]}
   */
  #computeDiscountBenefits(dateOfMonth, orderedMenus) {
    return new DiscountBenefitComputer().computeDiscountBenefits(
      dateOfMonth,
      orderedMenus,
    );
  }
}

export default EventProcessor;
