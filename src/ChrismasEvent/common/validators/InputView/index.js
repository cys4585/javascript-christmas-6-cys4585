import INPUT from "../../constants/input.js";
import {
  isDuplicateMenuName,
  isExistNonOrderableMenu,
  isExistOnlyBeverageMenu,
  isIncludeCountLessThanOne,
  isIncludeNotNumber,
  isInvalidOrderMenuFormat,
  isOverDateRange,
  isOverMaximumMenuCount,
} from "./checkInput.js";

const InputViewValidator = {
  /**
   * @param {string} date
   */
  validateDate(date) {
    if (
      date.length === 0 ||
      isIncludeNotNumber(date) ||
      isOverDateRange(date)
    ) {
      throw new Error(INPUT.errorMessage.readDate);
    }
  },
  /**
   * @param {string} orderMenu
   */
  validateOrderMenu(orderMenu) {
    const orderMenuList = orderMenu.split(INPUT.separator.menu);

    if (
      orderMenu.length === 0 ||
      isInvalidOrderMenuFormat(orderMenuList) ||
      isIncludeCountLessThanOne(orderMenuList) ||
      isDuplicateMenuName(orderMenuList) ||
      isExistNonOrderableMenu(orderMenuList) ||
      isExistOnlyBeverageMenu(orderMenuList) ||
      isOverMaximumMenuCount(orderMenuList)
    ) {
      throw new Error(INPUT.errorMessage.readOrderMenu);
    }
  },
};

export default InputViewValidator;
