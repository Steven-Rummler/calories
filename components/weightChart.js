import { useSelector } from "react-redux";
import { getEntries } from "../store";
import { View, Text } from "react-native";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";
import dayjs from "dayjs";

export default function WeightChart() {
    const entries = useSelector(getEntries);

    const weightEntries = entries.filter(e => e.entryType === 'weight');

    console.log(weightEntries)

    const weightData = weightEntries.map(e => ({
        x: dayjs(e.date).toDate(),
        y: Number.parseFloat(e.number)
    }));

    console.log(weightData)

    return <View>{weightEntries.length === 0 ? <Text>No Data</Text> :
        <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
                style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc" }
                }}
                data={weightData}
            />
        </VictoryChart>
    }
    </View >
}