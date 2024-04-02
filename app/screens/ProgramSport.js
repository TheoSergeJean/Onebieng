import { Text, ScrollView, TextInput, View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useState, useEffect } from 'react';
import Dropdown from '../Component/Dropdown';
import { AddProgramToDatabase } from '../Service/FirebaseService'

// Main sport page where you can create programs, select params for exercises and navigate to exercises details.

const ProgramSport = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [response, setResponse] = useState();
    const [type, setType] = useState("");
    const [muscle, setMuscle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [exercises, setExercises] = useState([]);
    const [nameProgram, setNameProgram] = useState("");


    const typeList = ["cardio", "olympic_weightlifting", "plyometrics", "powerlifting", "strength", "stretching", "strongman"];
    const muscleList = ["abdominals", "abductors", "adductors", "biceps", "calves", "chest", "forearms", "glutes", "hamstrings", "lats", "lower_back", "middle_back", "neck", "quadriceps", "traps", "triceps"];
    const difficultyList = ["beginner", "intermediate", "expert"];

    const url = "https://api.api-ninjas.com/v1/exercises?type=" + type + "&muscle=" + muscle + "&difficulty=" + difficulty;

    const apiKey = ''; //Put your API Key here

    // Function that take a json file (response from an api for example) and set it as the response state

    // This function is used to handle each type of research parameters for the exercise api
    const handleState = (key, value) => {
        switch (key) {
            case 'type':
                setType(value);
                break;
            case 'muscle':
                setMuscle(value);
                break;
            case 'difficulty':
                setDifficulty(value);
                break;
            default:
                break;
        }
    }

    //Push diffrent JSON parts into an array to be used as an array
    function handleData(json) {
        var result = [];


        for (var i in json) {

            result.push(json[i]);
        }

        setResponse(result);

    }

    // Contain the fetch function to call an api
    useEffect(() => {
        fetch(url, {

            //An API key is required
            headers: {
                'X-API-Key': apiKey
            }

        })
            .then(res => res.json())

            .then(
                (result) => {
                    setIsLoading(false);
                    handleData(result);
                },
                (error) => {
                    setIsLoading(false);
                    setError(error);
                }
            )

    }, [type, muscle, difficulty, exercises]);


    //Allow to display a list of button leading to exercises details
    function GetContent() {
        if (isLoading) {
            return <ActivityIndicator size="large" />;
        }

        if (error || response == undefined) {
            return <Text>{error}</Text>;
        }

        return response.map((ex, index) => <Text style={styles.button} key={index} title={ex.name} onPress={() => CheckExercise(ex)}>{ex.name}</Text >);
    };


    // Allow to navigate to an exercise page, and wait for information from the targeted page
    function CheckExercise(exo) {
        navigation.navigate('Exercise', {
            exData: exo,
            onGoBack: (data) => {
                AddNewExercise(data)
            }
        })
    }

    //Set the name of the new program
    function handleNameProgram(inputText) {
        setNameProgram(inputText);
    }
    //Add an exercise to the future program
    function AddNewExercise(data) {
        setExercises(oldArray => [...oldArray, data]);
    }

    //Give all the information to the AddProgram to send the program to the database
    function SaveProgram() {
        if (nameProgram != "") {
            nameObj = new Object();
            nameObj.name = nameProgram
            exercises.unshift(nameObj)
            if (AddProgramToDatabase(exercises, FIREBASE_AUTH.currentUser.uid)) {
                setExercises([])
            }
            navigation.navigate('My Programs')
        }

    }

    return (
        <>
            <ScrollView contentContainerStyle={{ paddingRight: 25, paddingLeft: 25 }}>

                <ScrollView contentContainerStyle={{ height: '100%' }}>
                    <Text style={styles.title}>Search an exercise :</Text>
                    <Text style={styles.subTitle}>Type of exercise :</Text>
                    <Dropdown someList={typeList} handleState={(value) => handleState('type', value)} />
                    <Text style={styles.subTitle}>Body part :</Text>
                    <Dropdown someList={muscleList} handleState={(value) => handleState('muscle', value)} />
                    <Text style={styles.subTitle}>Sport level:</Text>
                    <Dropdown someList={difficultyList} handleState={(value) => handleState('difficulty', value)} />
                    <Text style={styles.subTitle}>List of exercises :</Text>
                    <GetContent />
                </ScrollView>
                <View style={styles.separator} />
                <View contentContainerStyle={{ height: '100%' }}>
                    <Text style={styles.title}>Program :</Text>
                    <Text style={styles.subTitle}>Name of the program :</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleNameProgram}
                        value={nameProgram}
                        placeholder="Enter the name..."
                    />
                    <Text style={styles.subTitle}>Selected exercises :</Text>
                    {
                        exercises?.map((exercise) => (
                            <Text style={{ alignSelf: 'center' }}>{exercise?.name}</Text>
                        ))
                    }


                    <Text style={[styles.button, { backgroundColor: "red", marginTop: 20, marginBottom: 40 }]} title='Save program' onPress={() => SaveProgram()} >Save program</Text>
                </View>

            </ScrollView>

        </>
    );



};



export default ProgramSport;

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 8
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: 300,
        alignItems: 'center',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    separator: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '80%',
        marginBottom: 20,
        marginTop: 20,
        alignSelf: 'center'
    },
    subTitle: {
        fontSize: 15,
        alignSelf: 'center',
        marginBottom: 15,
        marginTop: 10,
        fontWeight: 'bold',
    },
    input:
    {
        height: 40,
        width: '50 %',
        borderColor: 'gray',
        borderWidth: 1,
        alignSelf: 'center',
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    }
});