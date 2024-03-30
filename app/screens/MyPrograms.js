import { View, Text, Button } from "react-native";
import React from 'react';
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const MyPrograms = (route) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Name : Prog number 1</Text>
        </View>
    );

};

export default MyPrograms;
