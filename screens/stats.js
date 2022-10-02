import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import WeightChart from '../components/weightChart';

export default function StatsScreen() {
    return (
        <View>
            <Text>Stats</Text>
            <WeightChart />
        </View>
    );
}