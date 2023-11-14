import EventPlanner from "../src/ChrismasEvent/EventPlanner";
import CHRISTMAST_EVENT from "../src/ChrismasEvent/common/constants/christmasEvent";

describe("이벤트 플래너(EventPlanner) 클래스 테스트", () => {
  /**
   * @type {EventPlanner}
   */
  let eventPlanner;

  beforeEach(() => {
    eventPlanner = new EventPlanner();
  });

  test("할인 전 총주문 금액과 총할인 금액을 가지고 '최종 예상 결제 금액 계산' 메서드를 호출하면, 최종 결제 예상 결제 금액(number)를 반환한다.", () => {
    // given
    const totalPrice = 130000;
    const discountAmount = 15000;
    const expectedFinalPaymentAmount = 115000;

    // when
    const finalPaymentAmount = eventPlanner.computeFinalPaymentAmount(
      totalPrice,
      discountAmount,
    );

    // then
    expect(finalPaymentAmount).toEqual(expectedFinalPaymentAmount);
  });

  const cases = [
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
  ];
  test.each(cases)(
    "총혜택 금액 데이터를 가지고 '이벤트 배지 계산' 메서드를 호출하면, 이벤트 배지(string)을 반환한다.",
    // given
    ({ input: { totalBenefitAmount }, expected: expectedEventBadge }) => {
      // when
      const eventBadge = eventPlanner.computeEventBadge(totalBenefitAmount);

      // then
      expect(eventBadge).toEqual(expectedEventBadge);
    },
  );
});
