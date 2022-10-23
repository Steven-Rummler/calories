const { entryTypes, entryTypeUnits, entryTypeLabels, entryTypeDateFormats, entryTypeUnit, entryTypeLabel, displayDate } = require('.')
const dayjs = require('dayjs');

describe('entryTypeUnit', () => {
    test('should validate entryType', () => {
        expect(() => entryTypeUnit()).toThrow();
    });

    test('should return all results correctly', () => {
        entryTypes.forEach(entryType => {
            expect(entryTypeUnit(entryType)).toBe(entryTypeUnits[entryType]);
        })
    });
})

describe('entryTypeLabel', () => {
    test('should validate entryType', () => {
        expect(() => entryTypeLabel()).toThrow();
    });

    test('should return all results correctly', () => {
        entryTypes.forEach(entryType => {
            expect(entryTypeLabel(entryType)).toBe(entryTypeLabels[entryType]);
        })
    })
})

describe('displayDate', () => {
    test('should validate entryType', () => {
        expect(() => displayDate()).toThrow();
    });

    test('should validate date', () => {
        expect(() => displayDate(null, entryTypes[0])).toThrow();
    });

    test('should return all results correctly', () => {
        const testDate = dayjs();
        entryTypes.forEach(entryType => {
            expect(displayDate(testDate, entryType)).toBe(testDate.format(entryTypeDateFormats[entryType]));
        })
    })
})