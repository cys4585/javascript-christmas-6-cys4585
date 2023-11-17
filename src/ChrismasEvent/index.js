import EventPlanner from "./EventPlanner/index.js";
import InputView from "./View/InputView.js";
import OutputView from "./View/OutputView.js";
import retryOnErrorAsync from "./common/utils/retryOnErrorAsync.js";

import "./common/typedefs/index.js";

class ChristmasEvent {
  #eventPlanner;

  constructor() {
    this.#eventPlanner = new EventPlanner();
  }

  async run() {
    this.#printWelcomeGreeting();
    const { dateOfMonth, menus } = await this.#readDateAndOrderMenu();
    this.#printPreview(dateOfMonth);
    const expectedResult = this.#computeExpectedResult(dateOfMonth, menus);
    this.printExpectedResult(expectedResult);
  }

  #printWelcomeGreeting() {
    OutputView.printWelcomeGreeting();
    OutputView.printCaution();
  }

  /**
   * @returns {{dateOfMonth: number, menus: Menu[]}}
   */
  async #readDateAndOrderMenu() {
    const dateOfMonth = await retryOnErrorAsync(InputView.readDate);
    const menus = await retryOnErrorAsync(InputView.readOrderMenu);

    return { dateOfMonth, menus };
  }

  #printPreview(dateOfMonth) {
    OutputView.printPreview(dateOfMonth);
  }

  /**
   * @param {number} dateOfMonth
   * @param {Menu[]} menus
   * @returns {ExpectedResult}
   */
  #computeExpectedResult(dateOfMonth, menus) {
    const orderState = this.#computeOrderState(menus);
    const eventState = this.#computeEventState(dateOfMonth, orderState);
    const finalPaymentAmount = this.#computeFinalPaymentAmount(
      orderState,
      eventState,
    );
    const eventBadge = this.#computeEventBadge(eventState);

    return { orderState, eventState, finalPaymentAmount, eventBadge };
  }

  /**
   * @param {Menu[]} menus
   * @returns {OrderState}
   */
  #computeOrderState(menus) {
    const orderState = this.#eventPlanner.computeOrderState(menus);

    return orderState;
  }

  /**
   * @param {number} dateOfMonth
   * @param {OrderState} orderState
   * @returns {EventState}
   */
  #computeEventState(dateOfMonth, orderState) {
    const eventState = this.#eventPlanner.computeEventState(
      dateOfMonth,
      orderState,
    );

    return eventState;
  }

  /**
   * @param {OrderState} orderState
   * @param {EventState} eventState
   * @param {number} OrderState.totalPrice
   * @param {number} eventState.discountAmount
   * @returns {number}
   */
  #computeFinalPaymentAmount({ totalPrice }, { discountAmount }) {
    const finalPaymentAmount = this.#eventPlanner.computeFinalPaymentAmount(
      totalPrice,
      discountAmount,
    );

    return finalPaymentAmount;
  }

  /**
   * @param {EventState} eventState
   * @param {number} eventState.totalBenefitAmount
   * @returns
   */
  #computeEventBadge({ totalBenefitAmount }) {
    const eventBadge = this.#eventPlanner.computeEventBadge(totalBenefitAmount);

    return eventBadge;
  }

  printExpectedResult({
    orderState,
    eventState,
    finalPaymentAmount,
    eventBadge,
  }) {
    OutputView.printMenu(orderState.orderedMenus);
    OutputView.printTotalPriceBeforeDiscount(orderState.totalPrice);
    OutputView.printFreeGift(eventState.eventBenefits);
    OutputView.printBenefits(eventState.eventBenefits);
    OutputView.printTotalBenefitAmount(eventState.totalBenefitAmount);
    OutputView.printFinalPaymentAmount(finalPaymentAmount);
    OutputView.printEventBadge(eventBadge);
  }
}

export default ChristmasEvent;
