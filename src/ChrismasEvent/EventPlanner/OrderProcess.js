import MenuBook from "../common/classes/MenuBook.js";
import "../common/typedefs/index.js";

class OrderProcessor {
  #menuBook;

  constructor() {
    this.#menuBook = new MenuBook();
  }

  /**
   * @param {Menu[]} menus
   * @returns {OrderState}
   */
  takeOrder(menus) {
    this.#validateMenus(menus);
    const orderedMenus = this.#computeOrderedMenu(menus);
    const totalPrice = this.#computeTotalPrice(orderedMenus);

    return { orderedMenus, totalPrice };
  }

  /**
   * @param {Menu[]} menus
   * @returns {OrderedMenu[]}
   */
  #computeOrderedMenu(menus) {
    return menus.map(({ menuName, count }) => ({
      menuName,
      count,
      type: this.#menuBook.findMenuType(menuName),
      price: this.#menuBook.findMenuPrice(menuName),
    }));
  }

  /**
   * @param {OrderedMenu[]} orderedMenus
   * @returns {number}
   */
  #computeTotalPrice(orderedMenus) {
    return orderedMenus.reduce(
      (prevSum, { price, count }) => prevSum + price * count,
      0,
    );
  }

  /**
   * @param {Menu[]} menus
   */
  #validateMenus(menus) {
    this.#validateNonOrderableMenu(menus);
    this.#validateOnlyBeverageMenu(menus);
    this.#validateMaximumMenuCount(menus);
  }

  #validateNonOrderableMenu(menus) {
    const isExistNonOrderableMenu = !menus.every(({ menuName }) =>
      this.#menuBook.isOrderableMenu(menuName),
    );

    if (isExistNonOrderableMenu) {
      throw new Error("[ERROR] 메뉴북에 없는 메뉴를 주문했네요!?");
    }
  }

  #validateOnlyBeverageMenu(menus) {
    const isExistOnlyBeverageMenu = menus.every(({ menuName }) =>
      this.#menuBook.isBeverageMenu(menuName),
    );

    if (isExistOnlyBeverageMenu) {
      throw new Error("[ERROR] 음료만 주문했네요!?");
    }
  }

  #validateMaximumMenuCount(menus) {
    const menuCount = menus.reduce(
      (prevCount, { count }) => prevCount + count,
      0,
    );

    if (menuCount > 20) {
      throw new Error("[ERROR] 메뉴를 20개 넘게 주문했네요!?");
    }
  }
}

export default OrderProcessor;
