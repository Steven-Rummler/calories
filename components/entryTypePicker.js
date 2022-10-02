import { View, Pressable, StyleSheet, Dimensions, Text } from "react-native";

export default function EntryTypePicker(props) {
    const { entryType, setEntryType } = props;

    const onEntryTypeChange = (event, newType) => {
        setEntryType(newType);
    }

    const foodButtonStyle = { ...styles.toggleButton, backgroundColor: entryType === 'food' ? 'lightgreen' : 'lightgray' }
    const activeButtonStyle = { ...styles.toggleButton, backgroundColor: entryType === 'active' ? 'lightgreen' : 'lightgray' }
    const weightButtonStyle = { ...styles.toggleButton, backgroundColor: entryType === 'weight' ? 'lightgreen' : 'lightgray' }

    return <View style={styles.toggleButtonSection}>
        <Pressable style={foodButtonStyle} onPress={e => onEntryTypeChange(e, 'food')}>
            <Text style={styles.toggleButtonText}>Food{'\n'}Calories</Text>
        </Pressable>
        <Pressable style={activeButtonStyle} onPress={e => onEntryTypeChange(e, 'active')}>
            <Text style={styles.toggleButtonText}>Active{'\n'}Calories</Text>
        </Pressable>
        <Pressable style={weightButtonStyle} onPress={e => onEntryTypeChange(e, 'weight')}>
            <Text style={styles.toggleButtonText}>Weight</Text>
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    toggleButtonSection: {
        height: Dimensions.get('window').height * .15,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row'
    },
    toggleButton: {
        height: Dimensions.get('window').height * .15,
        width: Dimensions.get('window').width * .33,
        textAlign: 'center',
    },
    toggleButtonText: {
        height: Dimensions.get('window').height * .15,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})