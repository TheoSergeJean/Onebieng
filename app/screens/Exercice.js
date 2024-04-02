import { View, Text, Button, StyleSheet } from "react-native";
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginRight: 20 }}>
            <Text style={styles.title}>Name : {exData.name}</Text>
            <Text>Type : {exData.type}</Text>
            <Text>Muscle : {exData.muscle}</Text>
            <Text>Details : {exData.instructions}</Text>
            {route.params.onGoBack && <Text style={[styles.button, { backgroundColor: "red", marginTop: 20 }]} title='Add exercise' onPress={() => AddToProgram(exData)} >Add exercise</Text>}
        </View>
    );

};

export default Exercice;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: 200,
        alignItems: 'center',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 15
    },
});