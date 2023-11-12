import OrderProcessor from "../src/ChrismasEvent/EventPlanner/OrderProcess";

describe("오더 리시버 클래스 테스트", () => {
  /**
   * @type {OrderProcessor}
   */
  let orderReceiver;

  beforeEach(() => {
    orderReceiver = new OrderProcessor();
  });

  test("주문 메뉴와 개수를 인자로 computeOrderMenuInformation 메서드를 호출하면, 주문메뉴 정보(메뉴 이름, 개수, 종류, 가격)을 반환한다.", () => {
    // given
    const orderingMenus = [
      { menuName: "tapas", count: 1 },
      { menuName: "tBoneSteak", count: 1 },
      { menuName: "barbecueRib", count: 1 },
      { menuName: "chocolateCake", count: 2 },
      { menuName: "zeroCoke", count: 1 },
    ];
    const expectedOrderedMenuInformations = {
      orderedMenus: [
        { menuName: "tapas", count: 1, type: "appetizer", price: 5_500 },
        { menuName: "tBoneSteak", count: 1, type: "main", price: 55_000 },
        { menuName: "barbecueRib", count: 1, type: "main", price: 54_000 },
        { menuName: "chocolateCake", count: 2, type: "dessert", price: 15_000 },
        { menuName: "zeroCoke", count: 1, type: "beverage", price: 3_000 },
      ],
      totalPrice: 147_500,
    };

    // when
    const orderedMenuInformations = orderReceiver.takeOrder(orderingMenus);

    // then
    expect(orderedMenuInformations).toEqual(expectedOrderedMenuInformations);
  });

  test("메뉴북에 없는 메뉴를 주문하면, 예외가 발생한다.", () => {
    // given
    const orderingMenus = [
      { menuName: "chocolateCake", count: 2 },
      { menuName: "zeroCoke", count: 1 },
      { menuName: "든든한 국밥", count: 1 },
      { menuName: "제육볶음", count: 1 },
      { menuName: "돈까스", count: 1 },
    ];
    const expectedMessage = "[ERROR]";

    // when & then
    expect(() => {
      orderReceiver.takeOrder(orderingMenus);
    }).toThrow(expectedMessage);
  });

  test("음료만 주문하면, 예외가 발생한다.", () => {
    // given
    const orderingMenus = [
      { menuName: "redWine", count: 2 },
      { menuName: "champagne", count: 2 },
      { menuName: "zeroCoke", count: 1 },
    ];
    const expectedMessage = "[ERROR]";

    // when & then
    expect(() => {
      orderReceiver.takeOrder(orderingMenus);
    }).toThrow(expectedMessage);
  });

  test("메뉴를 20개 넘게 주문하면, 예외가 발생한다.", () => {
    // given
    const orderingMenus = [
      { menuName: "chocolateCake", count: 3 },
      { menuName: "zeroCoke", count: 3 },
      { menuName: "redWine", count: 3 },
      { menuName: "champagne", count: 2 },
      { menuName: "tapas", count: 2 },
      { menuName: "tBoneSteak", count: 4 },
      { menuName: "barbecueRib", count: 4 },
    ];
    const expectedMessage = "[ERROR]";

    // when & then
    expect(() => {
      orderReceiver.takeOrder(orderingMenus);
    }).toThrow(expectedMessage);
  });
});
