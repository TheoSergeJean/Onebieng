import { View, Text, Button } from "react-native";
import React from 'react';
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const Program = ([]) => {

    const { exData } = route.params;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Name : {exData.name}</Text>
            <Text>Type : {exData.type}</Text>
            <Text>Muscle : {exData.muscle}</Text>
            <Text>Details : {exData.instructions}</Text>
        </View>
    );

};

export default Exercice;
