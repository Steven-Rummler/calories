import { View, FlatList, Pressable, Text, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { getEntries } from '../store';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import EntryTypePicker from '../components/entryTypePicker';
import EntryListItem from '../components/entryListItem';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'react-native-feather';
import { displayDate } from '../util';

export default function HistoryScreen({ navigation }) {
    const entries = useSelector(getEntries);
    const [entryType, setEntryType] = useState('food');
    const [date, setDate] = useState(getMaxDate(entries));

    const filterEntriesByTypeAndDate = e => {
        const sameType = e.entryType === entryType;
        const sameDate = e.entryType === 'active' || date.isSame(e.date, 'day');
        return sameDate && sameType;
    };
    const filteredEntries = entries.filter(filterEntriesByTypeAndDate);

    const decrementDate = () => setDate(date.subtract(1, 'day'));
    const incrementDate = () => setDate(date.add(1, 'day'));

    return (
        <View style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
            <EntryTypePicker entryType={entryType} setEntryType={setEntryType} />
            {entryType !== 'active' && <DateSlider {...{ decrementDate, date, incrementDate }} />}
            <FlatList data={filteredEntries}
                renderItem={({ item }) => <EntryListItem item={item} />}
                keyExtractor={item => displayDate(item.date, item.entryType) + item.entryType + item.label + item.number}
            />
        </View>
    );
}

function DateSlider({ decrementDate, date, incrementDate }) {
    return <View style={{ flexDirection: 'row', height: Dimensions.get('window').width * .15, width: Dimensions.get('window').width, backgroundColor: 'lightblue' }}>
        <DateArrow Icon={ChevronLeft} action={decrementDate} />
        <DateDisplay {...{ date }} />
        <DateArrow Icon={ChevronRight} action={incrementDate} />
    </View>;
}

function DateArrow({ Icon, action }) {
    return <Pressable style={{ width: Dimensions.get('window').width * .15 }} onPress={action}>
        <Icon color='white' height={Dimensions.get('window').width * .15} width={Dimensions.get('window').width * .15} />
    </Pressable>;
}

function DateDisplay({ date }) {
    return <Pressable style={{ width: Dimensions.get('window').width * .7, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{displayDate(date, 'active')}</Text>
    </Pressable>;
}

const getEntriesForType = (entries, entryType) => entries.filter(entry => entry.entryType === entryType);
const getEntriesForDate = (entries, date) => entries.filter(entry => date.isSame(entry.date, 'day'));
const getMinDate = entries => entries.reduce((min, next) => (!min || next.date.isBefore(min)) ? next.date : min, null) || dayjs();
const getMaxDate = entries => entries.reduce((max, next) => (!max || next.date.isAfter(max)) ? next.date : max, null) || dayjs();