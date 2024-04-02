import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from 'react';
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const Program = ({ route, navigation }) => {
    const [name, setName] = useState("");
    const [exercises, setExercises] = useState([]);
    const { programData } = route.params;

    useEffect(() => {
        setName(programData[0].name);
        setExercises(programData.slice(1, programData.length))
    }, []);



    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.title}>My program name : {name}</Text>
            <Text style={styles.title}>List of exercises:</Text>
            <ScrollView>{
                exercises.map((ex, index) => <Text style={styles.button} key={index} title={ex.name} onPress={() => navigation.navigate('exercice', { exData: ex })
                } >{ex.name}</Text>)
            }
            </ScrollView>
        </View >
    );

};

export default Program;

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