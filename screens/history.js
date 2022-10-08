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
    const list = entries.filter(e => {
        const sameType = e.entryType === entryType;
        const sameDate = e.entryType === 'active' || date.isSame(e.date, 'day');
        return sameDate && sameType;
    });

    const renderItem = ({ item }) => <EntryListItem item={item} />

    const dateDown = () => {
        setDate(date.subtract(1, 'day'))
    }

    const dateUp = () => {
        setDate(date.add(1, 'day'))
    }

    return (
        <View style={styles.container}>
            <EntryTypePicker entryType={entryType} setEntryType={setEntryType} />
            {entryType !== 'active' && <View style={{ flexDirection: 'row', height: Dimensions.get('window').width * .15, width: Dimensions.get('window').width, backgroundColor: 'lightblue' }}>
                <Pressable style={{ width: Dimensions.get('window').width * .15 }} onPress={dateDown}>
                    <ChevronLeft color='white' height={Dimensions.get('window').width * .15} width={Dimensions.get('window').width * .15} />
                </Pressable>
                <Pressable style={{ width: Dimensions.get('window').width * .7, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>{displayDate(date, entryType)}</Text>
                </Pressable>
                <Pressable style={{ width: Dimensions.get('window').width * .15 }} onPress={dateUp}>
                    <ChevronRight color='white' height={Dimensions.get('window').width * .15} width={Dimensions.get('window').width * .15} />
                </Pressable>
            </View>}
            <FlatList data={list}
                renderItem={renderItem}
                keyExtractor={item => displayDate(item.date, item.entryType) + item.entryType + item.label + item.number}
            />
        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
}