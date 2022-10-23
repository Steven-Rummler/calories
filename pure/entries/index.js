const dayjs = require('dayjs');
const { entryTypes } = require('../entryTypes');

const getEntriesForType = (entries, entryType) => {
    if (!entryTypes.includes(entryType)) throw Error('Invalid entry type');
    return entries.filter(entry => entry.entryType === entryType);
}
const getEntriesForDate = (entries, date) => entries.filter(entry => date.isSame(entry.date, 'day'));
const getMinDate = entries => entries.reduce((min, next) => (!min || next.date.isBefore(min)) ? next.date : min, null) || dayjs();
const getMaxDate = entries => entries.reduce((max, next) => (!max || next.date.isAfter(max)) ? next.date : max, null) || dayjs();

module.exports = { getEntriesForType };