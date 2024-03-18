import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text } from 'react-native';

const Dropdown = ({ someList, handleState }) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const placeholder = {
        label: 'Select an option...',
        value: null,
    };

    // Transformation de someList en un tableau d'options approprié
    const options = someList.map(item => ({
        label: item,
        value: item,
    }));

    return (
        <View>
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