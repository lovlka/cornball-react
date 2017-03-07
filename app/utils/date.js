import moment from 'moment/min/moment-with-locales';

export function formatDate(date, format) {
   moment.locale(navigator.language);
   return moment(date).format(format);
}

export function getDate() {
   moment.locale(navigator.language);
   return moment();
}
