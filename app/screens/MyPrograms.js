import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { getPrograms } from "../Service/FirebaseService";

//The page where a specific user's programs are displayed.

const MyPrograms = ({ route, navigation }) => {
    const [programs, setPrograms] = useState([]);
    //Fetch the programs according to the logged user id
    useEffect(() => {
        const userId = FIREBASE_AUTH.currentUser.uid
        getPrograms(userId).then((docsSnap) => {
            docsSnap.forEach(doc => {
                setPrograms(oldArray => [...oldArray, doc.data().program]);
            })
        })
    }, [])


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.title} >Here is the list of your programs :</Text>
            <ScrollView >
                {
                    programs.map((program, index) =>                        
                        <Text key={index} style={styles.button} title={program[0].name} onPress={() => navigation.navigate('Program', {
                            programData: program
                        })}>{program[0].name} </Text>
                        
                    )
                }
            </ScrollView>

        </View>
    );

};

export default MyPrograms;


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