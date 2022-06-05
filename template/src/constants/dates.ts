const monthNames = [
  'Januar',
  'Februar',
  'Mart',
  'April',
  'Maj',
  'Juni',
  'Juli',
  'August',
  'Septembar',
  'Oktobar',
  'Novembar',
  'Decembar',
];
const monthNamesShort = ['Jan', 'Feb', 'Mart', 'April', 'Maj', 'Juni', 'Juli', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const dayNamesShort = ['Ned', 'Pon', 'Uto', 'Sri', 'Cet', 'Pet', 'Sub'];
const dayNames = ['Nedelja', 'Ponedeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'];
// today: 'Danas',
import moment from 'moment';
export const getDayName = date => {
  let today = moment(date);
  let dayId = today.day();
  return dayNames[dayId];
};

export const getMonthAndYear = date => {
  let today = moment(date);
  let year = today.year();
  let monthID = today.month();
  let month = monthNamesShort[monthID];

  return month + ' ' + year;
};

export const getDayAndMonth = date => {
  let today = moment(date);
  let day = today.date();
  let monthID = today.month();
  let month = monthNamesShort[monthID];

  return day + ' ' + month;
};
