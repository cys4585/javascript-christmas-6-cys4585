import MenuBook from "../classes/MenuBook.js";

/**
 * @param {string} word
 * @returns {boolean}
 */
const isIncludeNotNumber = (word) =>
  word.split("").some((character) => character < "0" || character > "9");

/**
 * @param {string[]} orderMenuList
 * @returns {boolean}
 */
const isNotValidOrderMenuFormat = (orderMenuList) =>
  orderMenuList.some((menuNameAndCount) => {
    const [menuName, count] = menuNameAndCount.split("-");

    if (!menuName || !count) {
      return true;
    }
    if (isIncludeNotNumber(count)) {
      return true;
    }
    return false;
  });

/**
 * @param {string[]} orderMenuList
 * @returns {boolean}
 */
const isDuplicateMenuName = (orderMenuList) => {
  const menuNameSet = new Set();

  return orderMenuList.some((menuNameAndCount) => {
    const [menuName] = menuNameAndCount.split("-");

    if (menuNameSet.has(menuName)) {
      return true;
    }
    menuNameSet.add(menuName);
    return false;
  });
};

/**
 * @param {string[]} orderMenuList
 * @returns {boolean}
 */
const isIncludeCountLessThanOne = (orderMenuList) =>
  orderMenuList.some((menuNameAndCount) => {
    // eslint-disable-next-line no-unused-vars
    const [_, count] = menuNameAndCount.split("-");

    if (parseInt(count, 10) < 1) {
      return true;
    }
    return false;
  });

/**
 * @param {string} date
 */
export const validateDate = (date) => {
  if (date.length === 0) {
    throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
  }
  if (isIncludeNotNumber(date)) {
    throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
  }
  const dateNumber = parseInt(date, 10);
  if (dateNumber < 1 || dateNumber > 31) {
    throw new Error("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
  }
};

const isExistNonOrderableMenu = (orderMenuList) => {
  const menuBook = new MenuBook();

  return !orderMenuList.every((menuNameAndCount) => {
    const [menuName] = menuNameAndCount.split("-");
    return menuBook.isOrderableMenu(menuName);
  });
};

const isExistOnlyBeverageMenu = (orderMenuList) => {
  const menuBook = new MenuBook();

  return orderMenuList.every((menuNameAndCount) => {
    const [menuName] = menuNameAndCount.split("-");
    return menuBook.isBeverageMenu(menuName);
  });
};

const isOverMaximumMenuCount = (orderMenuList) => {
  const menuCount = orderMenuList.reduce((prevSum, menuNameAndCount) => {
    // eslint-disable-next-line no-unused-vars
    const [_, count] = menuNameAndCount.split("-");
    return prevSum + parseInt(count, 10);
  }, 0);

  return menuCount > 20;
};

/**
 * @param {string} orderMenu
 */
export const validateOrderMenu = (orderMenu) => {
  const orderMenuList = orderMenu.split(",");

  if (
    orderMenu.length === 0 ||
    isNotValidOrderMenuFormat(orderMenuList) ||
    isIncludeCountLessThanOne(orderMenuList) ||
    isDuplicateMenuName(orderMenuList) ||
    isExistNonOrderableMenu(orderMenuList) ||
    isExistOnlyBeverageMenu(orderMenuList) ||
    isOverMaximumMenuCount(orderMenuList)
  ) {
    throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
  }
};
