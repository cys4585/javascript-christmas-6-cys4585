import EventPlanner from "../src/ChrismasEvent/EventPlanner";

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
});
