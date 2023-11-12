class MenuBook {
  #menuInformation = Object.freeze({
    appetizer: Object.freeze({
      mushroomSoup: 6_000,
      tapas: 5_500,
      caesarSalad: 8_000,
    }),
    main: Object.freeze({
      tBoneSteak: 55_000,
      barbecueRib: 54_000,
      seafoodPasta: 35_000,
      christmasPasta: 25_000,
    }),
    dessert: Object.freeze({
      chocolateCake: 15_000,
      iceCream: 5_000,
    }),
    beverage: Object.freeze({
      zeroCoke: 3_000,
      redWine: 60_000,
      champagne: 25_000,
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
    return Object.keys(this.#menuInformation.beverage);
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
