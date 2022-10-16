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
    const [date, setDate] = useState(dayjs());

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
        <DateDown {...{ decrementDate }} />
        <DateDisplay {...{ date }} />
        <DateUp {...{ incrementDate }} />
    </View>;
}

function DateUp({ incrementDate }) {
    return <Pressable style={{ width: Dimensions.get('window').width * .15 }} onPress={incrementDate}>
        <ChevronRight color='white' height={Dimensions.get('window').width * .15} width={Dimensions.get('window').width * .15} />
    </Pressable>;
}

function DateDisplay({ date }) {
    return <Pressable style={{ width: Dimensions.get('window').width * .7, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{displayDate(date, 'active')}</Text>
    </Pressable>;
}

function DateDown({ decrementDate }) {
    return <Pressable style={{ width: Dimensions.get('window').width * .15 }} onPress={decrementDate}>
        <ChevronLeft color='white' height={Dimensions.get('window').width * .15} width={Dimensions.get('window').width * .15} />
    </Pressable>;
}