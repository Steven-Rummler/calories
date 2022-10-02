import { View, Text, Pressable, Alert } from "react-native";
import { Trash2 } from "react-native-feather";
import { removeEntry } from "../store";
import { useDispatch } from "react-redux";
import { entryTypeUnit } from "../util";

export default function EntryTypePicker(props) {
    const { item } = props;
    const dispatch = useDispatch();

    const onDelete = (entry) => {
        return Alert.alert(
            "Delete Entry?",
            "Entry will be gone forever (a long time)",
            [
                {
                    text: "Delete",
                    onPress: () => {
                        dispatch(removeEntry(entry));
                    },
                },
                {
                    text: "Cancel",
                },
            ]
        );
    };

    return <View style={styles.item}>
        <View>
            <Text>{item.label && item.label + ': '}{item.number} {entryTypeUnit(item.entryType)}</Text>
            <Text>{item.date}</Text>
        </View>
        <Pressable onPress={e => onDelete(item)}><Trash2 color='black' /></Pressable>
    </View>
}

const styles = {
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}