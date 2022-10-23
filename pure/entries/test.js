const { getEntriesForType } = require('.');

describe('getEntriesForType', () => {
    test('should validate entries', () => {
        expect(() => getEntriesForType(null, null)).toThrow();
    })

    test('should validate entryType', () => {
        expect(() => getEntriesForType([], null)).toThrow();
    })
})
