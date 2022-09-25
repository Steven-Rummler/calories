import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { store, getEntries } from '../store';

export default function HistoryScreen({ navigation }) {
    const entries = useSelector(getEntries);

    console.log(entries);

    return (
        <View>
            <Text>History</Text>
        </View>
    );
}