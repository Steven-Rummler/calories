import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { getEntries } from '../store';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import EntryTypePicker from '../components/entryTypePicker';
import EntryListItem from '../components/entryListItem';

export default function HistoryScreen({ navigation }) {
    const entries = useSelector(getEntries);
    const [entryType, setEntryType] = useState('food');

    const renderItem = ({ item }) => <EntryListItem item={item} />

    return (
        <View style={styles.container}>
            <EntryTypePicker entryType={entryType} setEntryType={setEntryType} />
            <FlatList data={entries.filter(e => e.entryType === entryType)}
                renderItem={renderItem}
                keyExtractor={item => item.date + item.entryType + item.label + item.number}
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