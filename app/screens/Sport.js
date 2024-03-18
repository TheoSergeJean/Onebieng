import { View, Text, Button, ActivityIndicator, TextInput } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useState, useEffect } from 'react';

const Sport = ({ navigation }) => {
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button onPress={() => navigation.navigate('details')} title="Open Details" />
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
            <Button onPress={() => navigation.navigate('Program')} title="Create Program" />
            
        </View>
    );

};

export default Sport;

