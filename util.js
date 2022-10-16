const entryTypes = ['food', 'active', 'weight'];

const validateEntryType = entryType => {
    if (!entryTypes.includes(entryType)) throw Error('Invalid Entry Type');
}

const entryTypeUnits = {
    food: 'Calories',
    active: 'Calories',
    weight: 'Pounds'
}

const entryTypeUnit = entryType => {
    validateEntryType(entryType);
    return entryTypeUnits[entryType];
}

const entryTypeLabels = {
    food: 'Food\nCalories',
    active: 'Active\nCalories',
    weight: 'Weight'
}

const entryTypeLabel = entryType => {
    validateEntryType(entryType);
    return entryTypeLabels[entryType];
}

const entryTypeDateFormats = {
    food: 'dddd, MMMM D, h:mm a',
    active: 'dddd, MMMM D',
    weight: 'dddd, MMMM D, h:mm a'
}

const displayDate = (date, entryType) => {
    validateEntryType(entryType);
    return date.format(entryTypeDateFormats[entryType]);
}

export { entryTypes, entryTypeUnits, entryTypeLabels, entryTypeDateFormats, entryTypeUnit, entryTypeLabel, displayDate };