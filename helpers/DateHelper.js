// https://stackoverflow.com/a/65548035/13128152
import moment from "moment";

export function parseToDDMMYYYY(timestamp) {
  return moment
    .unix(timestamp) // https://stackoverflow.com/a/20943421/13128152
    .format("DD.MM.YYYY"); // https://momentjs.com/
}

export function parseToDDMMYYYYdashHHMM(timestamp) {
  return moment.unix(timestamp).format("DD.MM.YYYY - HH:mm");
}
