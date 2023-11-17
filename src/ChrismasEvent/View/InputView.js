import { Console } from "@woowacourse/mission-utils";
import InputViewValidator from "../common/validators/InputView/index.js";
import INPUT from "../common/constants/input.js";
import "../common/typedefs/index.js";

const InputView = {
  /**
   * @returns {number}
   */
  async readDate() {
    const input = await Console.readLineAsync(INPUT.message.readDate);

    InputViewValidator.validateDate(input);

    return parseInt(input, 10);
  },

  /**
   * @returns {Menu[]}
   */
  async readOrderMenu() {
    const input = await Console.readLineAsync(INPUT.message.readOrderMenu);

    InputViewValidator.validateOrderMenu(input);

    return input.split(INPUT.separator.menu).map((menuNameAndCount) => {
      const [menuName, count] = menuNameAndCount.split(
        INPUT.separator.menuAndCount,
      );
      return { menuName, count: parseInt(count, 10) };
    });
  },
};

export default InputView;
