import { Console } from "@woowacourse/mission-utils";
import CHRISTMAST_EVENT from "../common/constants/christmasEvent.js";
import "../common/typedefs/index.js";
import OUTPUT from "../common/constants/output.js";

const OutputView = {
  printWelcomeGreeting() {
    Console.print(OUTPUT.message.welcomeGreeting);
  },

  printCaution() {
    Console.print(OUTPUT.message.caution);
  },

  /**
   * @param {number} dateOfMonth
   */
  printPreview(dateOfMonth) {
    Console.print(OUTPUT.message.generatePreview(dateOfMonth));
  },

  /**
   * @param {OrderedMenu[]} orderedMenus
   */
  printMenu(orderedMenus) {
    Console.print(OUTPUT.message.menu);

    const orderedMenuFormat = orderedMenus
      .map(({ menuName, count }) => `${menuName} ${count}개`)
      .join("\n");

    Console.print(`${orderedMenuFormat}\n`);
  },

  /**
   * @param {number} totalPrice
   */
  printTotalPriceBeforeDiscount(totalPrice) {
    Console.print(OUTPUT.message.totalPriceBeforeDiscount);
    Console.print(`${totalPrice.toLocaleString()}${OUTPUT.currencyUnit}\n`);
  },

  /**
   * @param {EventBenefitArray} eventBenefits
   */
  printFreeGift(eventBenefits) {
    Console.print(OUTPUT.message.freeGift);

    const freeGiftBenefit = eventBenefits.find(
      ({ eventType }) => eventType === CHRISTMAST_EVENT.eventType.freeGift,
    );

    const message =
      freeGiftBenefit && freeGiftBenefit.count
        ? `${freeGiftBenefit.menuName} ${freeGiftBenefit.count}개`
        : OUTPUT.none;

    Console.print(`${message}\n`);
  },

  /**
   * @param {EventBenefitArray} eventBenefits
   */
  printBenefits(eventBenefits) {
    Console.print(OUTPUT.message.benefits);

    const message = OutputView.getBenefitsMessage(eventBenefits);

    Console.print(`${message.length === 0 ? `${OUTPUT.none}\n` : message}`);
  },

  /**
   * @param {EventBenefitArray} eventBenefits
   * @returns {string}
   */
  getBenefitsMessage(eventBenefits) {
    return eventBenefits
      .map(({ eventType, benefitAmount, discountType, count }) => {
        if (benefitAmount === 0) {
          return "";
        }
        if (eventType === CHRISTMAST_EVENT.eventType.freeGift) {
          return OutputView.getFreeGiftMessage(eventType, benefitAmount, count);
        }
        return OutputView.getDiscountMessage(discountType, benefitAmount);
      })
      .join("");
  },

  getFreeGiftMessage(eventType, benefitAmount, count) {
    return `${eventType}: -${(benefitAmount * count).toLocaleString()}${
      OUTPUT.currencyUnit
    }\n`;
  },

  getDiscountMessage(discountType, benefitAmount) {
    return `${discountType}: -${benefitAmount.toLocaleString()}${
      OUTPUT.currencyUnit
    }\n`;
  },

  /**
   * @param {number} totalBenefitAmount
   */
  printTotalBenefitAmount(totalBenefitAmount) {
    Console.print(OUTPUT.message.totalBenefitAmount);
    Console.print(
      `${totalBenefitAmount ? "-" : ""}${totalBenefitAmount.toLocaleString()}${
        OUTPUT.currencyUnit
      }\n`,
    );
  },

  /**
   * @param {number} finalPaymentAmount
   */
  printFinalPaymentAmount(finalPaymentAmount) {
    Console.print(OUTPUT.message.finalPaymentAmount);
    Console.print(
      `${finalPaymentAmount.toLocaleString()}${OUTPUT.currencyUnit}\n`,
    );
  },

  /**
   *
   * @param {string} eventBadge
   */
  printEventBadge(eventBadge) {
    Console.print(OUTPUT.message.eventBadge);
    Console.print(eventBadge);
  },

  /**
   * @param {Error} error
   */
  printError(error) {
    Console.print(error.message);
  },
};

export default OutputView;
