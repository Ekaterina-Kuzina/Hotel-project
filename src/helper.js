import ruLocale from "date-fns/locale/ru";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import img3 from "./images/img3.png";
import img4 from "./images/img4.png";

export default [img1, img2, img3, img4];

const FILTER_UP_STARS = "FILTER_UP_STARS";
const FILTER_DOWN_STARS = "FILTER_DOWN_STARS";
const FILTER_UP_PRICE = "FILTER_UP_PRICE";
const FILTER_DOWN_PRICE = "FILTER_DOWN_PRICE";

const styleForCard = {
  card: "cardStyle",
  favouriteCard: "favouriteCardStyle",
};
const localeMap = {
  ru: ruLocale,
};

const maskMap = {
  ru: "__.__.____",
};

const currency = "rub";
const lang = "ru";
const locale = "ru";

const DAYS_IN_YEAR = 365;

export {
  FILTER_UP_STARS,
  FILTER_DOWN_STARS,
  FILTER_UP_PRICE,
  FILTER_DOWN_PRICE,
  styleForCard,
  localeMap,
  maskMap,
  currency,
  lang,
  locale,
  DAYS_IN_YEAR,
};

export function formatPrice(price) {
  return price.toLocaleString("ru-RU");
}

export const formatDate = (data) => {
  return data.toISOString().split("T")[0];
};

export function declinationOfNum(n, textForms) {
  const num = Math.abs(n) % 100;
  const num1 = num % 10;
  if (num > 10 && num < 20) {
    return textForms[2];
  }
  if (num1 > 1 && num1 < 5) {
    return textForms[1];
  }
  if (num1 === 1) {
    return textForms[0];
  }
  return textForms[2];
}

export function areHotelOffersEqual(hotelA, hotelB) {
  return (
    hotelA.checkIn === hotelB.checkIn &&
    hotelA.hotelId === hotelB.hotelId &&
    hotelA.locationId === hotelB.locationId &&
    hotelA.numberOfDays === hotelB.numberOfDays
  );
}

export const getCheckOutData = (checkIn, numberOfDays) => {
  const checkOut = new Date(checkIn.getTime());
  checkOut.setDate(checkOut.getDate() + parseInt(numberOfDays, 10));
  return formatDate(checkOut);
};
