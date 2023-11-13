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
   *
   * @param {number} totalPrice
   * @param {number} discountAmount
   * @returns {number}
   */
  computeFinalPaymentAmount(totalPrice, discountAmount) {
    return totalPrice - discountAmount;
  }
}

export default EventPlanner;
