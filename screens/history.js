import { View, Text, FlatList, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getEntries, removeEntry } from '../store';
import { StatusBar } from 'expo-status-bar';
import { Delete, Trash, Trash2 } from 'react-native-feather';

export default function HistoryScreen({ navigation }) {
    const dispatch = useDispatch();
    const entries = useSelector(getEntries);

    console.log(entries);

    const onDelete = (entry) => {
        console.log(entry, removeEntry)
        dispatch(removeEntry(entry));
    }

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text>Date: {item.date}</Text>
            <Text>Type: {item.entryType}</Text>
            {item.label ? (<Text>Label: {item.label}</Text>) : null}
            <Text>Number: {item.number}</Text>
            <Pressable onPress={e => onDelete(item)}><Trash2 color='black' /></Pressable>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList data={entries}
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