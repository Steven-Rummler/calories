const { entryTypes, entryTypeUnits, entryTypeLabels, entryTypeDateFormats, entryTypeUnit, entryTypeLabel, displayDate } = require('.')
const dayjs = require('dayjs');

test('entryTypeUnit: invalid entryType error', () => {
    expect(() => entryTypeUnit()).toThrow();
});

test('entryTypeUnit: returns all results correctly', () => {
    entryTypes.forEach(entryType => {
        expect(entryTypeUnit(entryType)).toBe(entryTypeUnits[entryType]);
    })
})

test('entryTypeLabel: invalid entryType error', () => {
    expect(() => entryTypeLabel()).toThrow();
});

test('entryTypeLabel: returns all results correctly', () => {
    entryTypes.forEach(entryType => {
        expect(entryTypeLabel(entryType)).toBe(entryTypeLabels[entryType]);
    })
})

test('displayDate: invalid entryType error', () => {
    expect(() => displayDate()).toThrow();
});

test('displayDate: invalid date error', () => {
    expect(() => displayDate(null, entryTypes[0])).toThrow();
});

test('displayDate: returns all results correctly', () => {
    const testDate = dayjs();
    entryTypes.forEach(entryType => {
        expect(displayDate(testDate, entryType)).toBe(testDate.format(entryTypeDateFormats[entryType]));
    })
})