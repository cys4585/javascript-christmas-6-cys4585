import MENU from "./menu.js";
import EVENT_DATE from "./eventDate.js";

const minimumTotalPriceConditionForEvent = 10_000;

const eventType = Object.freeze({
  freeGift: "증정 이벤트",
  discount: "할인 이벤트",
});

const discountType = Object.freeze({
  dDay: "크리스마스 디데이 할인",
  special: "특별 할인",
  weekday: "평일 할인",
  weekend: "주말 할인",
});

const freeGift = Object.freeze({
  minimumTotalPriceCondition: 120_000,
  menuName: MENU.name.champagne,
  count: 1,
});

const discountAmount = Object.freeze({
  christmasDDayEvent: {
    base: 1000,
    dailyIncrease: 100,
  },
  specialEvent: 1000,
  weekdayEvent: 2023,
  weekendEvent: 2023,
});

const eventPeriod = Object.freeze({
  default: {
    start: 1,
    end: EVENT_DATE.lastDayInMonth,
  },
  christmasDDay: {
    start: 1,
    end: 25,
  },
});

const eventBadge = Object.freeze({
  default: "없음",
  star: Object.freeze({
    name: "별",
    minimumCondition: 5_000,
  }),
  tree: Object.freeze({
    name: "트리",
    minimumCondition: 10_000,
  }),
  santa: Object.freeze({
    name: "산타",
    minimumCondition: 20_000,
  }),
});

const CHRISTMAST_EVENT = Object.freeze({
  minimumTotalPriceConditionForEvent,
  eventType,
  discountType,
  freeGift,
  eventPeriod,
  discountAmount,
  eventBadge,
});

export default CHRISTMAST_EVENT;
