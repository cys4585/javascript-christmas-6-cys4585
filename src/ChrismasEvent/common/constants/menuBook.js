import MENU from "./menu.js";

const MENU_BOOK_INFORMATION = Object.freeze({
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

export default MENU_BOOK_INFORMATION;
