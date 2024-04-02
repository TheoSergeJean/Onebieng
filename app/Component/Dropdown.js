import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text, StyleSheet } from 'react-native';

//A dropdown menu used in the 

const Dropdown = ({ someList, handleState }) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const placeholder = {
        label: 'Select an option...',
        value: null,
    };


    const options = someList.map(item => ({
        label: item,
        value: item,
    }));

    return (
        <View style={styles.drop}>
            <Text>Select an option:</Text>
            <RNPickerSelect
                placeholder={placeholder}
                items={options}
                onValueChange={(value) => { setSelectedValue(value); handleState(value); }}
                value={selectedValue}

            />
            {selectedValue && <Text>Selected: {selectedValue}</Text>}
        </View>
    );
};
export default Dropdown;

const styles = StyleSheet.create({
    drop: {
        fontSize: 16,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        width: '80%',
        marginBottom: 10,
        alignSelf: 'center'
    },
});