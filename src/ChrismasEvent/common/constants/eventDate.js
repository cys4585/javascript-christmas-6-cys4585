const year = 2023;

const realMonth = 12;
const programMonth = realMonth - 1;

// 2023, 12, 0 -> 2023년 13월 0일 -> 2024년 1월 0일 -> 2023년 12월 '마지막'일
const lastDayInMonth = new Date(year, programMonth + 1, 0).getDate();

const EVENT_DATE = Object.freeze({
  year,
  month: programMonth,
  lastDayInMonth,
});

export default EVENT_DATE;
