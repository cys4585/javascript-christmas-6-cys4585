import EventProcessor from "../src/ChrismasEvent/EventPlanner/EventProcessor";
import MenuBook from "../src/ChrismasEvent/EventPlanner/MenuBook";
import CHRISTMAST_EVENT from "../src/ChrismasEvent/constants/christmasEvent";

describe("이벤트 프로세서(EventProcessor) 클래스 테스트", () => {
  /**
   * @type {EventProcessor}
   */
  let eventProcessor;

  beforeEach(() => {
    eventProcessor = new EventProcessor();
  });

  test("방문 날짜와 주문내역을 인자로 computeEventBenefits 메서드를 호출하면, EventBenefitArray를 반환한다.", () => {
    // given
    const dateOfMonth = 2;
    const orderedStatement = {
      orderedMenus: [
        { menuName: "타파스", count: 1, type: "애피타이저", price: 5_500 },
        { menuName: "티본스테이크", count: 1, type: "메인", price: 55_000 },
        { menuName: "바비큐립", count: 1, type: "메인", price: 54_000 },
        { menuName: "초코케이크", count: 2, type: "디저트", price: 15_000 },
        { menuName: "제로콜라", count: 1, type: "음료", price: 3_000 },
      ],
      totalPrice: 147_500,
    };
    const expectedEventBenefits = [
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
        benefitAmount: CHRISTMAST_EVENT.discountAmount.christmasDDayEvent + 100,
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
    ];

    // when
    const eventBenefits = eventProcessor.computeEventBenefits(
      dateOfMonth,
      orderedStatement,
    );

    expect(eventBenefits).toEqual(expectedEventBenefits);
  });
});
