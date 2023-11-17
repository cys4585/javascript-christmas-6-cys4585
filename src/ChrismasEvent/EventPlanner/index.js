import CHRISTMAST_EVENT from "../common/constants/christmasEvent.js";
import OrderProcessor from "./OrderProcess.js";
import EventProcessor from "./EventProcessor/index.js";
import "../common/typedefs/index.js";

class EventPlanner {
  #orderProcessor;

  #eventProcessor;

  constructor() {
    this.#orderProcessor = new OrderProcessor();
    this.#eventProcessor = new EventProcessor();
  }

  /**
   * @param {Menu[]} menus
   * @returns {OrderState}
   */
  computeOrderState(menus) {
    return this.#orderProcessor.takeOrder(menus);
  }

  /**
   * @param {number} dateOfMonth
   * @param {OrderState} orderState
   * @returns {EventState}
   */
  computeEventState(dateOfMonth, orderState) {
    const eventBenefits = this.#eventProcessor.computeEventBenefits(
      dateOfMonth,
      orderState,
    );
    const totalBenefitAmount =
      this.#eventProcessor.computeTotalBenefitAmount(eventBenefits);
    const discountAmount =
      this.#eventProcessor.computeDiscountAmount(eventBenefits);

    return { eventBenefits, totalBenefitAmount, discountAmount };
  }

  /**
   * @param {number} totalPrice
   * @param {number} discountAmount
   * @returns {number}
   */
  computeFinalPaymentAmount(totalPrice, discountAmount) {
    return totalPrice - discountAmount;
  }

  /**
   * @param {number} totalBenefitAmount
   * @returns {string}
   */
  computeEventBadge(totalBenefitAmount) {
    const { eventBadge } = CHRISTMAST_EVENT;

    if (totalBenefitAmount >= eventBadge.santa.minimumCondition) {
      return eventBadge.santa.name;
    }
    if (totalBenefitAmount >= eventBadge.tree.minimumCondition) {
      return eventBadge.tree.name;
    }
    if (totalBenefitAmount >= eventBadge.star.minimumCondition) {
      return eventBadge.star.name;
    }
    return eventBadge.default;
  }
}

export default EventPlanner;
