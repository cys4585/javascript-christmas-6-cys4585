import { Console } from "@woowacourse/mission-utils";
import EVENT_DATE from "../constants/eventDate.js";
import CHRISTMAST_EVENT from "../constants/christmasEvent.js";

const OutputView = {
  printWelcomeGreeting() {
    Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
  },

  printCaution() {
    const cautionMessage = `<주의 사항>
    - 총주문 금액 10,000원 이상부터 이벤트가 적용됩니다.
    - 음료만 주문 시, 주문할 수 없습니다.
    - 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.
      (e.g. 시저샐러드-1, 티본스테이크-1, 크리스마스파스타-1, 제로콜라-3, 아이스크림-1의 총개수는 7개)`;

    Console.print(cautionMessage);
  },

  /**
   * @param {number} dateOfMonth
   */
  printPreview(dateOfMonth) {
    Console.print(
      `${EVENT_DATE.month}월 ${dateOfMonth}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
    );
  },

  /**
   * @param {import("../EventPlanner/OrderProcess").OrderedMenu[]} orderedMenus
   */
  printMenu(orderedMenus) {
    Console.print("<주문 메뉴>");

    const orderedMenuFormat = orderedMenus
      .map(({ menuName, count }) => `${menuName} ${count}개`)
      .join("\n");

    Console.print(`${orderedMenuFormat}\n`);
  },

  /**
   * @param {number} totalPrice
   */
  printTotalPriceBeforeDiscount(totalPrice) {
    Console.print("<할인 전 총주문 금액>");
    Console.print(`${totalPrice.toLocaleString()}원\n`);
  },

  /**
   * @param {import("../EventPlanner/EventProcessor/index.js").EventBenefitArray} eventBenefits
   */
  printFreeGift(eventBenefits) {
    Console.print("<증정 메뉴>");

    const freeGiftBenefit = eventBenefits.find(
      ({ eventType }) => eventType === CHRISTMAST_EVENT.eventType.freeGift,
    );

    const message =
      freeGiftBenefit && freeGiftBenefit.count
        ? `${freeGiftBenefit.menuName} ${freeGiftBenefit.count}개`
        : "없음";

    Console.print(`${message}\n`);
  },

  /**
   * @param {import("../EventPlanner/EventProcessor/index.js").EventBenefitArray} eventBenefits
   */
  printBenefits(eventBenefits) {
    Console.print("<혜택 내역>");
    const message = eventBenefits
      .map(({ eventType, benefitAmount, discountType, count }) => {
        if (benefitAmount === 0) return "";
        if (eventType === CHRISTMAST_EVENT.eventType.freeGift) {
          return `증정 이벤트: -${(benefitAmount * count).toLocaleString()}원`;
        }
        return `${discountType}: -${benefitAmount.toLocaleString()}원`;
      })
      .join("\n")
      .trim();
    Console.print(`${message.length === 0 ? "없음" : message}\n`);
  },

  /**
   * @param {number} totalBenefitAmount
   */
  printTotalBenefitAmount(totalBenefitAmount) {
    Console.print("<총혜택 금액>");
    Console.print(
      `${
        totalBenefitAmount ? "-" : ""
      }${totalBenefitAmount.toLocaleString()}원\n`,
    );
  },

  /**
   * @param {number} finalPaymentAmount
   */
  printFinalPaymentAmount(finalPaymentAmount) {
    Console.print("<할인 후 예상 결제 금액>");
    Console.print(`${finalPaymentAmount.toLocaleString()}원\n`);
  },

  /**
   *
   * @param {string} eventBadge
   */
  printEventBadge(eventBadge) {
    Console.print("<12월 이벤트 배지>");
    Console.print(eventBadge);
  },
};

export default OutputView;
