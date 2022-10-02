const entryTypes = ['food', 'active', 'weight'];

const entryTypeUnit = entryType => entryType === 'weight' ? 'Pounds' : 'Calories';

const entryTypeLabel = entryType => entryType === 'food' ? 'Food\nCalories' : entryType === 'active' ? 'Active\nCalories' : 'Weight';

export { entryTypes, entryTypeUnit, entryTypeLabel };