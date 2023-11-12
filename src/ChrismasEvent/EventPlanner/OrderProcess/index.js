import MenuBook from "./MenuBook.js";

class OrderProcessor {
  #menuBook;

  constructor() {
    this.#menuBook = new MenuBook();
  }

  /**
   * @param {{menuName: string, count: number}[]} menus
   * @returns {array}
   */
  takeOrder(menus) {
    this.#validateOrderedMenus(menus);
    const orderedMenus = this.#computeOrderedMenusInformation(menus);
    const totalPrice = this.#computeTotalPrice(orderedMenus);

    return { orderedMenus, totalPrice };
  }

  /**
   * @param {{menuName: string, count: number}[]} menus
   * @returns {{menuName: string, count: number, type: string, price: number}[]}
   */
  #computeOrderedMenusInformation(menus) {
    return menus.map(({ menuName, count }) => ({
      menuName,
      count,
      type: this.#menuBook.findMenuType(menuName),
      price: this.#menuBook.findMenuPrice(menuName),
    }));
  }

  #computeTotalPrice(orderedMenus) {
    return orderedMenus.reduce(
      (prevSum, { price, count }) => prevSum + price * count,
      0,
    );
  }

  /**
   * @param {{menuName: string, count: number}[]} menus
   */
  #validateOrderedMenus(menus) {
    this.#validateNonOrderableMenu(menus);
    this.#validateOnlyBeverageMenu(menus);
    this.#validateMaximumMenuCount(menus);
  }

  #validateNonOrderableMenu(menus) {
    const isExistNonOrderableMenu = !menus.every(({ menuName }) =>
      this.#menuBook.isOrderableMenu(menuName),
    );

    if (isExistNonOrderableMenu) {
      throw new Error("[ERROR] 메뉴북에 없는 메뉴를 주문했네?");
    }
  }

  #validateOnlyBeverageMenu(menus) {
    const isExistOnlyBeverageMenu = menus.every(({ menuName }) =>
      this.#menuBook.isBeverageMenu(menuName),
    );

    if (isExistOnlyBeverageMenu) {
      throw new Error("[ERROR] 음료만 주문했네?");
    }
  }

  #validateMaximumMenuCount(menus) {
    const menuCount = menus.reduce(
      (prevCount, { count }) => prevCount + count,
      0,
    );

    if (menuCount > 20) {
      throw new Error("[ERROR] 메뉴를 20개 넘게 주문했네?");
    }
  }
}

export default OrderProcessor;
