/**
 * @param {string} word
 * @returns {boolean}
 */
const isIncludeNotNumber = (word) =>
  word.split("").some((character) => character < "0" || character > "9");

/**
 * @param {string} orderMenu
 * @returns {boolean}
 */
const isNotValidOrderMenuFormat = (orderMenu) =>
  orderMenu.split(",").some((menuNameAndCount) => {
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
 * @param {string} orderMenu
 * @returns {boolean}
 */
const isDuplicateMenuName = (orderMenu) => {
  const menuNameSet = new Set();

  return orderMenu.split(",").some((menuNameAndCount) => {
    const [menuName] = menuNameAndCount.split("-");

    if (menuNameSet.has(menuName)) {
      return true;
    }
    menuNameSet.add(menuName);
    return false;
  });
};

/**
 * @param {string} orderMenu
 * @returns {boolean}
 */
const isIncludeCountLessThanOne = (orderMenu) =>
  orderMenu.split(",").some((menuNameAndCount) => {
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

/**
 * @param {string} orderMenu
 */
export const validateOrderMenu = (orderMenu) => {
  if (orderMenu.length === 0) {
    throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
  }
  if (isNotValidOrderMenuFormat(orderMenu)) {
    throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
  }
  if (isIncludeCountLessThanOne(orderMenu)) {
    throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
  }
  if (isDuplicateMenuName(orderMenu)) {
    throw new Error("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
  }
};
