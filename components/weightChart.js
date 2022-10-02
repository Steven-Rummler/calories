import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { getEntries } from "../store";
import LineChart from "react-native-chart-kit/dist/line-chart";
import { Dimensions } from "react-native";

export default function WeightChart() {
    const entries = useSelector(getEntries);

    const weightEntries = entries.filter(e => e.entryType === 'weight');

    console.log(weightEntries)

    return <LineChart
        data={{
            datasets: [
                {
                    label: 'Measured Weight',
                    data: weightEntries.map(e => ({
                        x: new Date(e.date),
                        y: e.number
                    }))
                }
            ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        //yAxisLabel="$"
        yAxisSuffix=" lbs"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 16
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
            }
        }}
        bezier
        style={{
            marginVertical: 8,
            borderRadius: 16
        }}
    />
}