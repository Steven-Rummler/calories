const entryTypes = ['food', 'active', 'weight'];

const entryTypeUnit = entryType => entryType === 'weight' ? 'Pounds' : 'Calories';

const entryTypeLabel = entryType => entryType === 'food' ? 'Food\nCalories' : entryType === 'active' ? 'Active\nCalories' : 'Weight';

const displayDate = (date, entryType) => {
    const dateFormat = entryType === 'active' ? 'dddd, MMMM D' : 'dddd, MMMM D, h:mm a';
    return date.format(dateFormat);
}

export { entryTypes, entryTypeUnit, entryTypeLabel, displayDate };