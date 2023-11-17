import menuBook from "../../instances/menuBook.js";
import EVENT_DATE from "../../constants/eventDate.js";
import INPUT from "../../constants/input.js";

/**
 * @param {string} word
 * @returns {boolean}
 */
export const isIncludeNotNumber = (word) =>
  word.split("").some((character) => character < "0" || character > "9");

/**
 * @param {string} date
 * @returns {boolean}
 */
export const isOverDateRange = (date) => {
  const dateNumber = parseInt(date, 10);
  return dateNumber < 1 || dateNumber > EVENT_DATE.lastDayInMonth;
};

/**
 * @param {string[]} orderMenuList
 * @returns {boolean}
 */
export const isInvalidOrderMenuFormat = (orderMenuList) =>
  orderMenuList.some((menuNameAndCount) => {
    const [menuName, count] = menuNameAndCount.split(
      INPUT.separator.menuAndCount,
    );

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
export const isIncludeCountLessThanOne = (orderMenuList) =>
  orderMenuList.some((menuNameAndCount) => {
    // eslint-disable-next-line no-unused-vars
    const [_, count] = menuNameAndCount.split(INPUT.separator.menuAndCount);

    if (parseInt(count, 10) < 1) {
      return true;
    }
    return false;
  });

/**
 * @param {string[]} orderMenuList
 * @returns {boolean}
 */
export const isDuplicateMenuName = (orderMenuList) => {
  const menuNameSet = new Set();

  return orderMenuList.some((menuNameAndCount) => {
    const [menuName] = menuNameAndCount.split(INPUT.separator.menuAndCount);

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
export const isExistNonOrderableMenu = (orderMenuList) =>
  !orderMenuList.every((menuNameAndCount) => {
    const [menuName] = menuNameAndCount.split(INPUT.separator.menuAndCount);
    return menuBook.isOrderableMenu(menuName);
  });

/**
 * @param {string[]} orderMenuList
 * @returns {boolean}
 */
export const isExistOnlyBeverageMenu = (orderMenuList) =>
  orderMenuList.every((menuNameAndCount) => {
    const [menuName] = menuNameAndCount.split(INPUT.separator.menuAndCount);
    return menuBook.isBeverageMenu(menuName);
  });

/**
 * @param {string[]} orderMenuList
 * @returns {boolean}
 */
export const isOverMaximumMenuCount = (orderMenuList) => {
  const menuCount = orderMenuList.reduce((prevSum, menuNameAndCount) => {
    // eslint-disable-next-line no-unused-vars
    const [_, count] = menuNameAndCount.split(INPUT.separator.menuAndCount);
    return prevSum + parseInt(count, 10);
  }, 0);

  return menuCount > 20;
};
