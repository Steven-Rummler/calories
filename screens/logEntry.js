import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Pressable, TextInput, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addEntry, getEntries } from '../store';
import EntryTypePicker from '../components/entryTypePicker';
import { entryTypeUnit } from '../util';
const dayjs = require('dayjs')

export default function LogEntryScreen({ navigation }) {
    const dispatch = useDispatch();
    const entries = useSelector(getEntries);
    const [entryType, setEntryType] = useState('food');
    const [date, setDate] = useState(dayjs());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [number, setNumber] = useState(null);
    const [label, setLabel] = useState(null);

    const dateFormat = entryType === 'active' ? 'dddd, MMMM D' : 'dddd, MMMM D, h:mm a';

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
        dispatch(addEntry({ entryType, date: date.format(dateFormat), number, ...(entryType === 'food' && { label }) }))
    }

    return (
        <KeyboardAvoidingView>
            <EntryTypePicker entryType={entryType} setEntryType={setEntryType} />
            <View style={styles.toggleButtonSection}>
                <Pressable style={styles.toggleButton} onPress={showDatepicker}>
                    <Text style={styles.toggleButtonText}>{date.format(dateFormat).replace(/,\s/g, '\n')}</Text>
                </Pressable>
                <TextInput autoFocus keyboardType='numeric' value={number} style={styles.toggleButton}
                    placeholder={entryTypeUnit(entryType)} onChangeText={setNumber} />
                {entryType === 'food' ? <TextInput style={styles.toggleButton} value={label}
                    placeholder='Label' onChangeText={setLabel} /> :
                    entryType === 'active' ? <Text style={styles.toggleButton}>Current Active Calories{'\n'}500</Text> :
                        <Text style={styles.toggleButton}>Info for Weight?</Text>}
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