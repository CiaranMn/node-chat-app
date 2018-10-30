const moment = require('moment');

date = moment()
console.log(date.format('h:mma, dddd Do MMMM Y'))

date2 = moment(1234)
console.log(date2.format('h:mma'))

console.log(moment().valueOf())