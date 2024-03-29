import menuBook from "../common/instances/menuBook.js";
import INPUT from "../common/constants/input.js";
import "../common/typedefs/index.js";

class OrderProcessor {
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
      type: menuBook.findMenuType(menuName),
      price: menuBook.findMenuPrice(menuName),
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
      menuBook.isOrderableMenu(menuName),
    );

    if (isExistNonOrderableMenu) {
      throw new Error(INPUT.errorMessage.readOrderMenu);
    }
  }

  #validateOnlyBeverageMenu(menus) {
    const isExistOnlyBeverageMenu = menus.every(({ menuName }) =>
      menuBook.isBeverageMenu(menuName),
    );

    if (isExistOnlyBeverageMenu) {
      throw new Error(INPUT.errorMessage.readOrderMenu);
    }
  }

  #validateMaximumMenuCount(menus) {
    const menuCount = menus.reduce(
      (prevCount, { count }) => prevCount + count,
      0,
    );

    if (menuCount > 20) {
      throw new Error(INPUT.errorMessage.readOrderMenu);
    }
  }
}

export default OrderProcessor;
