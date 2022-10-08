import { View, Pressable, StyleSheet, Dimensions, Text } from "react-native";
import { entryTypeLabel, entryTypes } from "../util";

export default function EntryTypePicker(props) {
    const { entryType, setEntryType } = props;

    const onEntryTypeChange = (event, newType) => {
        setEntryType(newType);
    }

    const onButtonStyle = { ...styles.toggleButton, backgroundColor: 'lightgreen' }
    const offButtonStyle = { ...styles.toggleButton, backgroundColor: 'lightgray' }

    return <View style={styles.toggleButtonSection}>
        {entryTypes.map(type =>
            <Pressable
                key={type}
                style={type === entryType ? onButtonStyle : offButtonStyle}
                onPress={e => onEntryTypeChange(e, type)}>
                <Text style={styles.toggleButtonText}>{entryTypeLabel(type)}</Text>
            </Pressable>)}
    </View>
}

const styles = StyleSheet.create({
    toggleButtonSection: {
        height: Dimensions.get('window').height * .15,
        width: Dimensions.get('window').width,
        flexDirection: 'row'
    },
    toggleButton: {
        height: Dimensions.get('window').height * .15,
        width: Dimensions.get('window').width * .3333,
        textAlign: 'center',
    },
    toggleButtonText: {
        height: Dimensions.get('window').height * .15,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})