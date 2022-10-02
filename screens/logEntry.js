import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Pressable, TextInput, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addEntry } from '../store';
const dayjs = require('dayjs')

export default function LogEntryScreen({ navigation }) {
    const dispatch = useDispatch();
    const [entryType, setEntryType] = useState('food');
    const [date, setDate] = useState(dayjs());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [number, setNumber] = useState(null);
    const [label, setLabel] = useState(null);

    const dateFormat = 'dddd,MMMM D';
    const timeFormat = 'dddd,MMMM D,h:mm a';

    const onEntryTypeChange = (event, newType) => {
        setEntryType(newType);
    }

    const onDateChange = (event, newDate) => {
        setShowDatePicker(false);
        if (entryType === 'active') setDate(dayjs(newDate));
        else setShowTimePicker(true);
    }

    const onTimeChange = (event, newDate) => {
        setShowTimePicker(false);
        setDate(dayjs(newDate));
    }

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const submit = (e) => {
        navigation.pop();
        navigation.navigate('History');
        dispatch(addEntry({ entryType, date: date.format(), number, label }))
    }

    const foodButtonStyle = { ...styles.toggleButton, backgroundColor: entryType === 'food' ? 'lightgreen' : 'lightgray' }
    const activeButtonStyle = { ...styles.toggleButton, backgroundColor: entryType === 'active' ? 'lightgreen' : 'lightgray' }
    const weightButtonStyle = { ...styles.toggleButton, backgroundColor: entryType === 'weight' ? 'lightgreen' : 'lightgray' }

    return (
        <KeyboardAvoidingView>
            <View style={styles.toggleButtonSection}>
                <Pressable style={foodButtonStyle} onPress={e => onEntryTypeChange(e, 'food')}>
                    <Text style={styles.toggleButtonText}>Log{'\n'}Food{'\n'}Calories</Text>
                </Pressable>
                <Pressable style={activeButtonStyle} onPress={e => onEntryTypeChange(e, 'active')}>
                    <Text style={styles.toggleButtonText}>Update{'\n'}Active{'\n'}Calories</Text>
                </Pressable>
                <Pressable style={weightButtonStyle} onPress={e => onEntryTypeChange(e, 'weight')}>
                    <Text style={styles.toggleButtonText}>Weigh{'\n'}In</Text>
                </Pressable>
            </View>
            <View style={styles.toggleButtonSection}>
                <Pressable style={styles.toggleButton} onPress={showDatepicker}>
                    <Text style={styles.toggleButtonText}>{date.format(entryType === 'active' ? dateFormat : timeFormat).replace(/,/g, '\n')}</Text>
                </Pressable>
                <TextInput autoFocus keyboardType='numeric' value={number} style={styles.toggleButton}
                    placeholder={entryTypeUnit[entryType]} onChangeText={setNumber} />
                <TextInput style={styles.toggleButton} value={label}
                    placeholder='Label' onChangeText={setLabel} />
            </View>
            <View style={styles.actionButtonSection}>
                <Pressable disabled={!number} onPress={submit} style={number ? styles.actionButton : styles.actionButtonDisabled}>
                    <Text style={{ textAlign: 'center' }}>Submit{'\n'}Entry</Text>
                </Pressable>
            </View>
            {showDatePicker && (
                <DateTimePicker
                    value={date.toDate()}
                    mode='date'
                    onChange={onDateChange}
                />
            )}
            {showTimePicker && (
                <DateTimePicker
                    value={date}
                    mode='time'
                    onChange={onTimeChange}
                />
            )}
        </KeyboardAvoidingView>
    );
}

const entryTypeUnit = {
    'food': 'Calories',
    'active': 'Calories',
    'weight': 'Pounds'
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
    },
    actionButtonSection: {
        height: Dimensions.get('window').height * 0.40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    actionButton: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').width * 0.6,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButtonDisabled: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').width * 0.6,
        backgroundColor: '#e0e0e0',
        color: '#a0a0a0',
        justifyContent: 'center',
        alignItems: 'center'
    },
});