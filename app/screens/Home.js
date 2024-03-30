import { View, Text, Button, ActivityIndicator, TextInput } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useState, useEffect } from 'react';

const Home = ({ navigation }) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


            <Button onPress={() => navigation.navigate('Program')} title="Create Program" />
            <Button onPress={() => navigation.navigate('Nutrition')} title="Nutrition" />
            <Button onPress={() => navigation.navigate('details')} title="Open Details" />

        </View>
    );

};

export default Home;

