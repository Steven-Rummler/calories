const dayjs = require('dayjs');
const { entryTypes } = require('../entryTypes');

const getEntriesForType = (entries, entryType) => {
    if (!Array.isArray(entries)) throw Error('Invalid entries');
    if (!entryTypes.includes(entryType)) throw Error('Invalid entry type');
    return entries.filter(entry => entry.entryType === entryType);
}
const getEntriesForDate = (entries, date) => {
    if (!Array.isArray(entries)) throw Error('Invalid entries');
    if (!dayjs.isDayjs(date)) throw Error('Invalid date');
    return entries.filter(entry => date.isSame(entry.date, 'day'));
}
const getMinDate = entries => entries.reduce((min, next) => (!min || next.date.isBefore(min)) ? next.date : min, null);
const getMaxDate = entries => entries.reduce((max, next) => (!max || next.date.isAfter(max)) ? next.date : max, null);



module.exports = { getEntriesForType, getEntriesForDate, getMinDate, getMaxDate };