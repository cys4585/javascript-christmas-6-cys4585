const englishToKoreanMap = Object.freeze({
  appetizer: "애피타이저",
  main: "메인",
  dessert: "디저트",
  beverage: "음료",

  mushroomSoup: "양송이수프",
  tapas: "타파스",
  caesarSalad: "시저샐러드",

  tBoneSteak: "티본스테이크",
  barbecueRib: "바비큐립",
  seafoodPasta: "해산물파스타",
  christmasPasta: "크리스마스파스타",

  chocolateCake: "초코케이크",
  iceCream: "아이스크림",

  zeroCoke: "제로콜라",
  redWine: "레드와인",
  champagne: "샴페인",
});

const koreanToEnglishMap = Object.fromEntries(
  Object.entries(englishToKoreanMap).map(([key, value]) => [value, key]),
);

const TRANSLATION = Object.freeze({
  englishToKoreanMap,
  koreanToEnglishMap,
});

export default TRANSLATION;
