import MENU from "../../constants/menu.js";

class MenuBook {
  #menuInformation = Object.freeze({
    [MENU.type.appetizer]: Object.freeze({
      [MENU.name.mushroomSoup]: 6_000,
      [MENU.name.tapas]: 5_500,
      [MENU.name.caesarSalad]: 8_000,
    }),
    [MENU.type.main]: Object.freeze({
      [MENU.name.tBoneSteak]: 55_000,
      [MENU.name.barbecueRib]: 54_000,
      [MENU.name.seafoodPasta]: 35_000,
      [MENU.name.christmasPasta]: 25_000,
    }),
    [MENU.type.dessert]: Object.freeze({
      [MENU.name.chocolateCake]: 15_000,
      [MENU.name.iceCream]: 5_000,
    }),
    [MENU.type.beverage]: Object.freeze({
      [MENU.name.zeroCoke]: 3_000,
      [MENU.name.redWine]: 60_000,
      [MENU.name.champagne]: 25_000,
    }),
  });

  #getAllMenuTypes() {
    return Object.keys(this.#menuInformation);
  }

  #getAllMenuNames() {
    const menuTypes = this.#getAllMenuTypes();

    const menuNames = menuTypes.reduce(
      (prevMenuNames, menuType) => [
        ...prevMenuNames,
        ...Object.keys(this.#menuInformation[menuType]),
      ],
      [],
    );

    return menuNames;
  }

  #getBeverageMenuNames() {
    return Object.keys(this.#menuInformation[MENU.type.beverage]);
  }

  /**
   * @param {string} menuName
   * @returns {string}
   */
  findMenuType(menuName) {
    const menuTypes = this.#getAllMenuTypes();
    return menuTypes.find((menuType) =>
      Object.keys(this.#menuInformation[menuType]).includes(menuName),
    );
  }

  /**
   * @param {string} menuName
   * @returns {number}
   */
  findMenuPrice(menuName) {
    const menuType = this.findMenuType(menuName);
    return this.#menuInformation[menuType][menuName];
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
