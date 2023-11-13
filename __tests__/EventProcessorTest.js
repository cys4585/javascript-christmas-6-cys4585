import EventProcessor from "../src/ChrismasEvent/EventPlanner/EventProcessor";
import MenuBook from "../src/ChrismasEvent/ObjectForEvent/MenuBook";
import CHRISTMAST_EVENT from "../src/ChrismasEvent/constants/christmasEvent";

const cases = {
  computeEventBenefits: [
    {
      input: {
        dateOfMonth: 26,
        orderState: {
          orderedMenus: [
            { menuName: "타파스", count: 1, type: "애피타이저", price: 5_500 },
            { menuName: "제로콜라", count: 1, type: "음료", price: 3_000 },
          ],
          totalPrice: 8_500,
        },
      },
      expeced: [],
    },
    {
      input: {
        dateOfMonth: 3,
        orderState: {
          orderedMenus: [
            { menuName: "티본스테이크", count: 1, type: "메인", price: 55_000 },
            { menuName: "바비큐립", count: 1, type: "메인", price: 54_000 },
            { menuName: "초코케이크", count: 2, type: "디저트", price: 15_000 },
            { menuName: "제로콜라", count: 1, type: "음료", price: 3_000 },
          ],
          totalPrice: 142_000,
        },
      },
      expeced: [
        {
          eventType: CHRISTMAST_EVENT.eventType.freeGift,
          menuName: CHRISTMAST_EVENT.freeGift.menuName,
          count: CHRISTMAST_EVENT.freeGift.count,
          benefitAmount: new MenuBook().findMenuPrice(
            CHRISTMAST_EVENT.freeGift.menuName,
          ),
        },
        {
          eventType: CHRISTMAST_EVENT.eventType.discount,
          discountType: CHRISTMAST_EVENT.discountType.dDay,
          benefitAmount:
            CHRISTMAST_EVENT.discountAmount.christmasDDayEvent + 200,
        },
        {
          eventType: CHRISTMAST_EVENT.eventType.discount,
          discountType: CHRISTMAST_EVENT.discountType.special,
          benefitAmount: CHRISTMAST_EVENT.discountAmount.specialEvent,
        },
        {
          eventType: CHRISTMAST_EVENT.eventType.discount,
          discountType: CHRISTMAST_EVENT.discountType.weekend,
          benefitAmount: 0,
        },
        {
          eventType: CHRISTMAST_EVENT.eventType.discount,
          discountType: CHRISTMAST_EVENT.discountType.weekday,
          benefitAmount: CHRISTMAST_EVENT.discountAmount.weekdayEvent * 2,
        },
      ],
    },
    {
      input: {
        dateOfMonth: 2,
        orderState: {
          orderedMenus: [
            { menuName: "타파스", count: 1, type: "애피타이저", price: 5_500 },
            { menuName: "티본스테이크", count: 1, type: "메인", price: 55_000 },
            { menuName: "바비큐립", count: 1, type: "메인", price: 54_000 },
            { menuName: "초코케이크", count: 2, type: "디저트", price: 15_000 },
            { menuName: "제로콜라", count: 1, type: "음료", price: 3_000 },
          ],
          totalPrice: 147_500,
        },
      },
      expeced: [
        {
          eventType: CHRISTMAST_EVENT.eventType.freeGift,
          menuName: CHRISTMAST_EVENT.freeGift.menuName,
          count: CHRISTMAST_EVENT.freeGift.count,
          benefitAmount: new MenuBook().findMenuPrice(
            CHRISTMAST_EVENT.freeGift.menuName,
          ),
        },
        {
          eventType: CHRISTMAST_EVENT.eventType.discount,
          discountType: CHRISTMAST_EVENT.discountType.dDay,
          benefitAmount:
            CHRISTMAST_EVENT.discountAmount.christmasDDayEvent + 100,
        },
        {
          eventType: CHRISTMAST_EVENT.eventType.discount,
          discountType: CHRISTMAST_EVENT.discountType.special,
          benefitAmount: 0,
        },
        {
          eventType: CHRISTMAST_EVENT.eventType.discount,
          discountType: CHRISTMAST_EVENT.discountType.weekend,
          benefitAmount: CHRISTMAST_EVENT.discountAmount.weekendEvent * 2,
        },
        {
          eventType: CHRISTMAST_EVENT.eventType.discount,
          discountType: CHRISTMAST_EVENT.discountType.weekday,
          benefitAmount: 0,
        },
      ],
    },
  ],

  computeTotalBenefitAmount: [
    {
      input: {
        eventBenefits: [],
      },
      expected: 0,
    },
    {
      input: {
        eventBenefits: [
          {
            eventType: CHRISTMAST_EVENT.eventType.freeGift,
            menuName: CHRISTMAST_EVENT.freeGift.menuName,
            count: CHRISTMAST_EVENT.freeGift.count,
            benefitAmount: new MenuBook().findMenuPrice(
              CHRISTMAST_EVENT.freeGift.menuName,
            ),
          },
          {
            eventType: CHRISTMAST_EVENT.eventType.discount,
            discountType: CHRISTMAST_EVENT.discountType.dDay,
            benefitAmount:
              CHRISTMAST_EVENT.discountAmount.christmasDDayEvent + 200,
          },
          {
            eventType: CHRISTMAST_EVENT.eventType.discount,
            discountType: CHRISTMAST_EVENT.discountType.special,
            benefitAmount: CHRISTMAST_EVENT.discountAmount.specialEvent,
          },
          {
            eventType: CHRISTMAST_EVENT.eventType.discount,
            discountType: CHRISTMAST_EVENT.discountType.weekend,
            benefitAmount: 0,
          },
          {
            eventType: CHRISTMAST_EVENT.eventType.discount,
            discountType: CHRISTMAST_EVENT.discountType.weekday,
            benefitAmount: CHRISTMAST_EVENT.discountAmount.weekdayEvent * 2,
          },
        ],
      },
      expected: 31_246,
    },
    {
      input: {
        eventBenefits: [
          {
            eventType: CHRISTMAST_EVENT.eventType.freeGift,
            menuName: CHRISTMAST_EVENT.freeGift.menuName,
            count: CHRISTMAST_EVENT.freeGift.count,
            benefitAmount: new MenuBook().findMenuPrice(
              CHRISTMAST_EVENT.freeGift.menuName,
            ),
          },
          {
            eventType: CHRISTMAST_EVENT.eventType.discount,
            discountType: CHRISTMAST_EVENT.discountType.dDay,
            benefitAmount:
              CHRISTMAST_EVENT.discountAmount.christmasDDayEvent + 100,
          },
          {
            eventType: CHRISTMAST_EVENT.eventType.discount,
            discountType: CHRISTMAST_EVENT.discountType.special,
            benefitAmount: 0,
          },
          {
            eventType: CHRISTMAST_EVENT.eventType.discount,
            discountType: CHRISTMAST_EVENT.discountType.weekend,
            benefitAmount: CHRISTMAST_EVENT.discountAmount.weekendEvent * 2,
          },
          {
            eventType: CHRISTMAST_EVENT.eventType.discount,
            discountType: CHRISTMAST_EVENT.discountType.weekday,
            benefitAmount: 0,
          },
        ],
      },
      expected: 30_146,
    },
  ],

  computeDiscountAmount: [
    {
      input: {
        eventBenefits: [],
      },
      expected: 0,
    },
    {
      input: {
        eventBenefits: [
          {
            eventType: CHRISTMAST_EVENT.eventType.freeGift,
            menuName: CHRISTMAST_EVENT.freeGift.menuName,
            count: CHRISTMAST_EVENT.freeGift.count,
            benefitAmount: new MenuBook().findMenuPrice(
              CHRISTMAST_EVENT.freeGift.menuName,
            ),
          },
          {
            eventType: CHRISTMAST_EVENT.eventType.discount,
            discountType: CHRISTMAST_EVENT.discountType.dDay,
            benefitAmount:
              CHRISTMAST_EVENT.discountAmount.christmasDDayEvent + 200,
          },
          {
            eventType: CHRISTMAST_EVENT.eventType.discount,
            discountType: CHRISTMAST_EVENT.discountType.special,
            benefitAmount: CHRISTMAST_EVENT.discountAmount.specialEvent,
          },
          {
            eventType: CHRISTMAST_EVENT.eventType.discount,
            discountType: CHRISTMAST_EVENT.discountType.weekend,
            benefitAmount: 0,
          },
          {
            eventType: CHRISTMAST_EVENT.eventType.discount,
            discountType: CHRISTMAST_EVENT.discountType.weekday,
            benefitAmount: CHRISTMAST_EVENT.discountAmount.weekdayEvent * 2,
          },
        ],
      },
      expected: 6_246,
    },
    {
      input: {
        eventBenefits: [
          {
            eventType: CHRISTMAST_EVENT.eventType.freeGift,
            menuName: CHRISTMAST_EVENT.freeGift.menuName,
            count: CHRISTMAST_EVENT.freeGift.count,
            benefitAmount: new MenuBook().findMenuPrice(
              CHRISTMAST_EVENT.freeGift.menuName,
            ),
          },
          {
            eventType: CHRISTMAST_EVENT.eventType.discount,
            discountType: CHRISTMAST_EVENT.discountType.dDay,
            benefitAmount:
              CHRISTMAST_EVENT.discountAmount.christmasDDayEvent + 100,
          },
          {
            eventType: CHRISTMAST_EVENT.eventType.discount,
            discountType: CHRISTMAST_EVENT.discountType.special,
            benefitAmount: 0,
          },
          {
            eventType: CHRISTMAST_EVENT.eventType.discount,
            discountType: CHRISTMAST_EVENT.discountType.weekend,
            benefitAmount: CHRISTMAST_EVENT.discountAmount.weekendEvent * 2,
          },
          {
            eventType: CHRISTMAST_EVENT.eventType.discount,
            discountType: CHRISTMAST_EVENT.discountType.weekday,
            benefitAmount: 0,
          },
        ],
      },
      expected: 5_146,
    },
  ],

  computeEventBadge: [
    {
      input: {
        totalBenefitAmount: 0,
      },
      expected: CHRISTMAST_EVENT.eventBadge.default,
    },
    {
      input: {
        totalBenefitAmount: 9_246,
      },
      expected: CHRISTMAST_EVENT.eventBadge.star.name,
    },
    {
      input: {
        totalBenefitAmount: 19_246,
      },
      expected: CHRISTMAST_EVENT.eventBadge.tree.name,
    },
    {
      input: {
        totalBenefitAmount: 30_146,
      },
      expected: CHRISTMAST_EVENT.eventBadge.santa.name,
    },
  ],
};

describe("이벤트 프로세서(EventProcessor) 클래스 테스트", () => {
  /**
   * @type {EventProcessor}
   */
  let eventProcessor;

  beforeEach(() => {
    eventProcessor = new EventProcessor();
  });

  test.each(cases.computeEventBenefits)(
    "방문 날짜와 주문내역 데이터를 가지고 '이벤트 혜택 내역 계산' 메서드를 호출하면, 이벤트 혜택 내역이 담긴 배열(EventBenefitArray)를 반환한다.",
    // given
    ({
      input: { dateOfMonth, orderState },
      expeced: expectedEventBenefits,
    }) => {
      // when
      const eventBenefits = eventProcessor.computeEventBenefits(
        dateOfMonth,
        orderState,
      );

      expect(eventBenefits).toEqual(expectedEventBenefits);
    },
  );

  test.each(cases.computeTotalBenefitAmount)(
    "EventBenefitArray 데이터를 가지고 '총혜택 금액 계산' 메서드를 호출하면, 총혜택 금액(number)을 반환한다.",
    // given
    ({ input: { eventBenefits }, expected: expectedTotalBenefitAmount }) => {
      // when
      const totalBenefitAmount =
        eventProcessor.computeTotalBenefitAmount(eventBenefits);

      // then
      expect(totalBenefitAmount).toEqual(expectedTotalBenefitAmount);
    },
  );

  test.each(cases.computeDiscountAmount)(
    "EventBenefitArray 데이터를 가지고 '총할인 금액 계산' 메서드를 호출하면, 총할인 금액(number)를 반환한다.",
    // given
    ({ input: { eventBenefits }, expected: expectedDiscountAmount }) => {
      // when
      const discountAmount =
        eventProcessor.computeDiscountAmount(eventBenefits);

      // then
      expect(discountAmount).toEqual(expectedDiscountAmount);
    },
  );
});
