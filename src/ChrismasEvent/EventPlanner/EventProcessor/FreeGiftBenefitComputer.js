import menuBook from "../../common/instances/menuBook.js";
import CHRISTMAST_EVENT from "../../common/constants/christmasEvent.js";
import "../../common/typedefs/index.js";

class FreeGiftBenefitComputer {
  /**
   * @param {number} totalPrice
   * @returns {FreeGiftBenefit[]}
   */
  computeFreeGiftBenefits(totalPrice) {
    return [this.#computeChampagneFreeGiftBenefit(totalPrice)];
  }

  /**
   * @param {number} totalPrice
   * @returns {FreeGiftBenefit}
   */
  #computeChampagneFreeGiftBenefit(totalPrice) {
    const { eventType, freeGift } = CHRISTMAST_EVENT;

    const { menuName } = freeGift;
    const count = this.#calculateCount(totalPrice);
    const benefitAmount = this.#calculateBenefitAmount(totalPrice);

    return this.#generateFreeGiftBenefit(
      eventType.freeGift,
      menuName,
      count,
      benefitAmount,
    );
  }

  /**
   * @param {number} totalPrice
   * @returns {number}
   */
  #calculateBenefitAmount(totalPrice) {
    const { menuName, minimumTotalPriceCondition } = CHRISTMAST_EVENT.freeGift;

    return totalPrice < minimumTotalPriceCondition
      ? 0
      : menuBook.findMenuPrice(menuName);
  }

  /**
   * @param {number} totalPrice
   * @returns {number}
   */
  #calculateCount(totalPrice) {
    const { count, minimumTotalPriceCondition } = CHRISTMAST_EVENT.freeGift;

    return totalPrice < minimumTotalPriceCondition ? 0 : count;
  }

  /**
   * @param {string} eventType
   * @param {string} menuName
   * @param {number} count
   * @param {number} benefitAmount
   * @returns {FreeGiftBenefit}
   */
  #generateFreeGiftBenefit(eventType, menuName, count, benefitAmount) {
    return {
      eventType,
      menuName,
      count,
      benefitAmount,
    };
  }
}

export default FreeGiftBenefitComputer;
