const { getEntriesForType, getEntriesForDate, getMinDate, getMaxDate } = require('.');
const dayjs = require('dayjs');

describe('getEntriesForType', () => {
    test('should validate entries', () => {
        expect(() => getEntriesForType(null, null)).toThrow('Invalid entries');
    })

    test('should validate entryType', () => {
        expect(() => getEntriesForType([], null)).toThrow('Invalid entry type');
    })

    test('should filter by entryType', () => {
        const entries = [{
            entryType: 'food'
        }, {
            entryType: 'active'
        }]
        expect(getEntriesForType(entries, 'food').length).toBe(1);
    })
})

describe('getEntriesForDate', () => {
    test('should validate entries', () => {
        expect(() => getEntriesForDate(null, null)).toThrow('Invalid entries');
    })

    test('should validate date', () => {
        expect(() => getEntriesForDate([], null)).toThrow('Invalid date');
    })

    test('should filter by date', () => {
        const entries = [{
            date: dayjs('2022-01-01')
        }, {
            date: dayjs('2022-01-02')
        }]
        expect(getEntriesForDate(entries, dayjs('2022-01-01')).length).toBe(1);
    })
})

describe('getMinDate', () => {
    test('should return null for empty array', () => {
        expect(getMinDate([])).toBe(null);
    })

    test('should return correct date', () => {
        const entries = [{
            date: dayjs('2022-01-01')
        }, {
            date: dayjs('2022-01-02')
        }]
        expect(getMinDate(entries).isSame(dayjs('2022-01-01'), 'day')).toBeTruthy();
    })
})

describe('getMaxDate', () => {
    test('should return null for empty array', () => {
        expect(getMaxDate([])).toBe(null);
    })

    test('should return correct date', () => {
        const entries = [{
            date: dayjs('2022-01-01')
        }, {
            date: dayjs('2022-01-02')
        }]
        expect(getMaxDate(entries).isSame(dayjs('2022-01-02'), 'day')).toBeTruthy();
    })
})