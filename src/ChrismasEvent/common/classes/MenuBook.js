import MENU from "../constants/menu.js";
import MENU_BOOK_INFORMATION from "../constants/menuBook.js";

class MenuBook {
  #menuBookInformation = MENU_BOOK_INFORMATION;

  #getAllMenuTypes() {
    return Object.keys(this.#menuBookInformation);
  }

  #getAllMenuNames() {
    const menuTypes = this.#getAllMenuTypes();

    const menuNames = menuTypes.reduce(
      (prevMenuNames, menuType) => [
        ...prevMenuNames,
        ...Object.keys(this.#menuBookInformation[menuType]),
      ],
      [],
    );

    return menuNames;
  }

  #getBeverageMenuNames() {
    return Object.keys(this.#menuBookInformation[MENU.type.beverage]);
  }

  /**
   * @param {string} menuName
   * @returns {string}
   */
  findMenuType(menuName) {
    const menuTypes = this.#getAllMenuTypes();
    return menuTypes.find((menuType) =>
      Object.keys(this.#menuBookInformation[menuType]).includes(menuName),
    );
  }

  /**
   * @param {string} menuName
   * @returns {number}
   */
  findMenuPrice(menuName) {
    const menuType = this.findMenuType(menuName);
    return this.#menuBookInformation[menuType][menuName];
  }

  /**
   * @param {string} menuName
   * @returns {boolean}
   */
  isOrderableMenu(menuName) {
    const menuNames = this.#getAllMenuNames();
    return menuNames.includes(menuName);
  }

  /**
   * @param {string} menuName
   * @returns {boolean}
   */
  isBeverageMenu(menuName) {
    const beverageMenuNames = this.#getBeverageMenuNames();
    return beverageMenuNames.includes(menuName);
  }
}

export default MenuBook;
