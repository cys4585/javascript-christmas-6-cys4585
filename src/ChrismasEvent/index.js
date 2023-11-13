import EventPlanner from "./EventPlanner/index.js";
import InputView from "./View/InputView.js";
import OutputView from "./View/OutputView.js";
import retryOnErrorAsync from "./utils/retryOnErrorAsync.js";

class ChristmasEvent {
  #eventPlanner;

  constructor() {
    this.#eventPlanner = new EventPlanner();
  }

  async run() {
    this.#step0();

    const { dateOfMonth, menus } = await this.#step1();

    const { orderState, eventState, finalPaymentAmount, eventBadge } =
      this.#step2(dateOfMonth, menus);

    this.#step3({ orderState, eventState, finalPaymentAmount, eventBadge });
  }

  #step0() {
    OutputView.printWelcomeGreeting();
    OutputView.printCaution();
  }

  async #step1() {
    const dateOfMonth = await retryOnErrorAsync(InputView.readDate);
    const menus = await retryOnErrorAsync(InputView.readOrderMenu);
    OutputView.printPreview(dateOfMonth);

    return { dateOfMonth, menus };
  }

  #step2(dateOfMonth, menus) {
    const orderState = this.#eventPlanner.computeOrderState(menus);
    const eventState = this.#eventPlanner.computeEventState(
      dateOfMonth,
      orderState,
    );
    const finalPaymentAmount = this.#eventPlanner.computeFinalPaymentAmount(
      orderState,
      eventState,
    );
    const eventBadge = this.#eventPlanner.computeEventBadge(
      eventState.totalBenefitAmount,
    );
    return { orderState, eventState, finalPaymentAmount, eventBadge };
  }

  #step3({ orderState, eventState, finalPaymentAmount, eventBadge }) {
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
