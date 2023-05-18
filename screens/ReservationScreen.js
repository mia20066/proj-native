import { useState } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Switch,
    Button,
    Alert
    
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';



const ReservationScreen = () => {
    const [visitors, setVisitors] = useState(1);
    const [confirm, setconfirm] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowCalendar(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const handleReservation = () => {
      
       
        Alert.alert('Begin Search?',
       'Number of visitors:'+ visitors +'\n'
      +'Confirm Attendance?' + confirm +'\n'
       +'Date:' + date ,
                    [
                        {
                            text: 'Cancel',
                            onPress: () => resetForm(),
                            style: 'cancel'
                        },
                        {
                            text: 'OK',
                            onPress: () => resetForm()
                        }
                    ],
                    { cancelable: false }

                
                    )  
    
};

    const resetForm = () => {
        setVisitors(1);
        setconfirm(false);
        setDate(new Date());
        setShowCalendar(false);
    };

    return (
        <ScrollView>
            <Animatable.View
            animation='zoomIn'
            duration={2000}
            delay={1000}
            >
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Visitors:</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={visitors}
                    onValueChange={(itemValue) => setVisitors(itemValue)}
                >
                    <Picker.Item label='1' value={1} />
                    <Picker.Item label='2' value={2} />
                    <Picker.Item label='3' value={3} />
                    <Picker.Item label='4' value={4} />
                    <Picker.Item label='5' value={5} />
                    <Picker.Item label='6' value={6} />
                </Picker>
            </View>
          
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Confirm Attendance</Text>
                <Switch
                    style={styles.formItem}
                    value={confirm}
                    trackColor={{ true: '#ff7f50', false: null }}
                    onValueChange={(value) => setconfirm(value)}
                />
            </View>
            
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date:</Text>
                <Button
                    onPress={() => setShowCalendar(!showCalendar)}
                    title={date.toLocaleDateString('en-US')}
                    color='#ff7f50'
                    accessibilityLabel='Tap me to select a reservation date'
                />
            </View>
         
            {showCalendar && (
                <DateTimePicker
                    style={styles.formItem}
                    value={date}
                    mode='date'
                    display='default'
                    onChange={onDateChange}
                />
            )}
           
            <View style={styles.formRow}>
                <Button
                    onPress={() => handleReservation()}
                    title='Search Availability'
                    color='#ff7f50'
                    accessibilityLabel='Tap me to search for available dates to reserve'
                />
            </View>
            
           
            </Animatable.View>
        </ScrollView>
    );
            };
            

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
    
});

export default ReservationScreen;