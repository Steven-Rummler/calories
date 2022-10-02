import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { store, getEntries } from '../store';
import { StatusBar } from 'expo-status-bar';

export default function HistoryScreen({ navigation }) {
    const entries = useSelector(getEntries);

    console.log(entries);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text>Date: {item.date}</Text>
            <Text>Type: {item.entryType}</Text>
            {item.label ? (<Text>Label: {item.label}</Text>) : null}
            <Text>Number: {item.number}</Text>
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