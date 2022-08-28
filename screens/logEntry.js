import { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';


export default function LogEntryScreen() {
    const [entryType, setEntryType] = useState('food');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [number, setNumber] = useState(null);
    const [label, setLabel] = useState(null);

    const onEntryTypeChange = (type) => {
        setEntryType(type);
    }

    const onDateChange = (event, newDate) => {
        setShowDatePicker(false);
        setShowTimePicker(true);
        setDate(newDate);
    }

    const onTimeChange = (event, newDate) => {
        setShowTimePicker(false);
        setDate(newDate);
    }

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const onNumberChange = (e) => {
        setNumber(e.value);
    }

    const onLabelChange = (e) => {
        setLabel(e.value);
    }

    return (
        <View>
            <View style={styles.toggleButtonSection}>
                <Pressable style={styles.toggleButton} onPress={() => onEntryTypeChange('food')}>
                    <Text style={styles.toggleButtonText}>Log{'\n'}Food{'\n'}Calories</Text>
                </Pressable>
                <Pressable style={styles.toggleButton} onPress={() => onEntryTypeChange('active')}>
                    <Text style={styles.toggleButtonText}>Update{'\n'}Active{'\n'}Calories</Text>
                </Pressable>
                <Pressable style={styles.toggleButton} onPress={() => onEntryTypeChange('weight')}>
                    <Text style={styles.toggleButtonText}>Weigh{'\n'}In</Text>
                </Pressable>
            </View>
            <View style={styles.toggleButtonSection}>
                <Pressable style={styles.toggleButton} onPress={showDatepicker}>
                    <Text style={styles.toggleButtonText}>{Moment(date).format('dddd,MMMM d,h:mm a').replace(/,/g, '\n')}</Text>
                </Pressable>
                <TextInput autoFocus keyboardType='numeric' value={number} style={styles.toggleButton}
                    placeholder={entryTypeUnit[entryType]} onChange={onNumberChange} />
                <TextInput style={styles.toggleButton} value={label}
                    placeholder='Label' onChange={onLabelChange} />
            </View>
            <View style={styles.actionButtonSection}>
                <Pressable disabled={number} onPress={e => { }} style={number ? styles.actionButton : styles.actionButtonDisabled}>
                    <Text style={{ textAlign: 'center' }}>Submit{'\n'}Entry</Text>
                </Pressable>
            </View>
            {showDatePicker && (
                <DateTimePicker
                    value={date}
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
        </View>
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
        //flexGrow: 1,
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
        backgroundColor: 'blue',
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