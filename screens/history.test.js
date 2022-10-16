const { getEntriesForType } = require('./history');

test('', () => {
    expect(getEntriesForType([], null)).toThrow();
})