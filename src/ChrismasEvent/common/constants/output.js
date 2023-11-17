import EVENT_DATE from "./eventDate.js";

const message = Object.freeze({
  welcomeGreeting: "안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.",
  caution: `<주의 사항>
  - 총주문 금액 10,000원 이상부터 이벤트가 적용됩니다.
  - 음료만 주문 시, 주문할 수 없습니다.
  - 메뉴는 한 번에 최대 20개까지만 주문할 수 있습니다.
    (e.g. 시저샐러드-1, 티본스테이크-1, 크리스마스파스타-1, 제로콜라-3, 아이스크림-1의 총개수는 7개)`,
  generatePreview: (dateOfMonth) =>
    `${EVENT_DATE.month}월 ${dateOfMonth}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
  menu: "<주문 메뉴>",
  totalPriceBeforeDiscount: "<할인 전 총주문 금액>",
  freeGift: "<증정 메뉴>",
  benefits: "<혜택 내역>",
  totalBenefitAmount: "<총혜택 금액>",
  finalPaymentAmount: "<할인 후 예상 결제 금액>",
  eventBadge: "<12월 이벤트 배지>",
});

const currencyUnit = "원";

const none = "없음";

const OUTPUT = Object.freeze({
  message,
  currencyUnit,
  none,
});

export default OUTPUT;
