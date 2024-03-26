import { Text, ScrollView, TextInput, View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useState, useEffect } from 'react';
import Dropdown from '../Component/Dropdown';


const ProgramSport = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [response, setResponse] = useState();
    const [type, setType] = useState("");
    const [muscle, setMuscle] = useState("");
    const [difficulty, setDifficulty] = useState("");


    const typeList = ["cardio", "olympic_weightlifting", "plyometrics", "powerlifting", "strength", "stretching", "strongman"];
    const muscleList = ["abdominals", "abductors", "adductors", "biceps", "calves", "chest", "forearms", "glutes", "hamstrings", "lats", "lower_back", "middle_back", "neck", "quadriceps", "traps", "triceps"];
    const difficultyList = ["beginner", "intermediate", "expert"];

    const url = "https://api.api-ninjas.com/v1/exercises?type=" + type + "&muscle=" + muscle + "&difficulty=" + difficulty;
    const apiKey = 'V8cANfk+Xn2/4J17C3dJNw==JmYixHZ3jBoUBZth';

    // Function that take a json file (response from an api for example) and set it as the response state

    // This function is used to handle each type of research parameters for the exercice api
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

    //This fonction is made to put a json as the response state
    function handleData(json) {
        var result = [];


        for (var i in json) {

            result.push(json[i]);
        }

        setResponse(result);

    }

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

    }, [type, muscle, difficulty]);



    function GetContent() {
        if (isLoading) {
            return <ActivityIndicator size="large" />;
        }

        if (error || response == undefined) {
            return <Text>{error}</Text>;
        }


        return response.map((ex, index) => <Button key={index} title={ex.name} onPress={() => navigation.navigate('exercice', { exData: ex })}></Button>);
    };
    const testaf=["alo","hola"]
    return (
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Search an exercice :</Text>
            {/* <TextInput
                style={styles.input}
                onChangeText={e => setExercise(e)}
                placeholder="Select an exercise"
                defaultValue={exercise}

            />

            <Text>{exercise}</Text> */}
            <Button title='allo' onPress={() => SaveProgram('ayo',testaf)} />
            <Dropdown someList={typeList} handleState={(value) => handleState('type', value)} />
            <Dropdown someList={muscleList} handleState={(value) => handleState('muscle', value)} />
            <Dropdown someList={difficultyList} handleState={(value) => handleState('difficulty', value)} />


            <GetContent />
        </ScrollView>
    );

    function SaveProgram(name,[listEx]) {
        console.log(name);
        console.log(listEx[2]);
    }

};



export default ProgramSport;

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});