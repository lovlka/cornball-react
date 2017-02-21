import moment from 'moment/min/moment-with-locales';

module.exports = {

   formatDate(date, format) {
      moment.locale('sv');
      return moment(date).format(format);
   },

   getDate() {
      moment.locale('sv');
      return moment();
   }
};