import CHRISTMAST_EVENT from "../constants/christmasEvent.js";
import EventProcessor from "./EventProcessor/index.js";
import OrderProcessor from "./OrderProcess/index.js";

class EventPlanner {
  #orderProcessor;

  #eventProcessor;

  constructor() {
    this.#orderProcessor = new OrderProcessor();
    this.#eventProcessor = new EventProcessor();
  }

  /**
   * @param {import("./OrderProcess/index.js").Menu[]} menus
   * @returns {import("./OrderProcess/index.js").OrderState}
   */
  computeOrderState(menus) {
    return this.#orderProcessor.takeOrder(menus);
  }

  /**
   * @param {number} dateOfMonth
   * @param {import("./OrderProcess/index.js").OrderState} orderState
   * @returns {import("./EventProcessor/index.js").EventState}
   */
  computeEventState(dateOfMonth, orderState) {
    const eventBenefits = this.#eventProcessor.computeEventBenefits(
      dateOfMonth,
      orderState,
    );
    const totalBenefitAmount =
      this.#eventProcessor.computeTotalBenefitAmount(eventBenefits);

    return { eventBenefits, totalBenefitAmount };
  }

  /**
   * @param {import("./OrderProcess/index.js").OrderState} orderState
   * @param {import("./EventProcessor/index.js").EventState} eventState
   * @returns
   */
  computeFinalPaymentAmount(orderState, eventState) {
    const discountAmount = this.#eventProcessor.computeDiscountAmount(
      eventState.eventBenefits,
    );

    return orderState.totalPrice - discountAmount;
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
}

export default EventPlanner;
