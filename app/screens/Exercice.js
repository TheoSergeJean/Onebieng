import { View, Text, Button } from "react-native";
import React from 'react';
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const Exercice = ({ route, navigation }) => {

    function AddToProgram(exData) {
        route.params.onGoBack(exData);
        navigation.goBack();
    }

    const { exData } = route.params;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Name : {exData.name}</Text>
            <Text>Type : {exData.type}</Text>
            <Text>Muscle : {exData.muscle}</Text>
            <Text>Details : {exData.instructions}</Text>
            <Button color={"red"} title='Add exercise' onPress={() => AddToProgram(exData)} />
        </View>
    );

};

export default Exercice;
