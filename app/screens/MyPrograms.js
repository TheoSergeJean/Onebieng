import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from 'react';
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { GetPrograms } from "../Service/FirebaseService";

const MyPrograms = ({ route, navigation }) => {
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        userId = FIREBASE_AUTH.currentUser.uid
        GetPrograms(userId).then((docsSnap) => {

            docsSnap.forEach(doc => {
                // console.log(JSON.parse((JSON.stringify(doc.data().program))));
                // console.log(doc.data());
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
                        <React.Fragment key={index}>
                            <Text style={styles.button} title={program[0].name} onPress={() => navigation.navigate('Program', {
                                programData: program
                            })}>{program[0].name} </Text>
                        </React.Fragment>
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