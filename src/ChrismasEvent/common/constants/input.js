const message = Object.freeze({
  readDate:
    "12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n",
  readOrderMenu:
    "주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n",
});

const errorMessage = Object.freeze({
  readDate: "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.",
  readOrderMenu: "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.",
});

const separator = Object.freeze({
  menu: ",",
  menuAndCount: "-",
});

const INPUT = Object.freeze({
  message,
  errorMessage,
  separator,
});

export default INPUT;
