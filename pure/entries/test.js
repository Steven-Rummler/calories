const { getEntriesForType } = require('.');

test('', () => {
    expect(getEntriesForType([], null)).toThrow();
})