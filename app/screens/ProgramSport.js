import { Text, ScrollView, TextInput, View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useState, useEffect } from 'react';
import Dropdown from '../Component/Dropdown';
import { AddProgramToDatabase } from '../Service/FirebaseService'



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

    }, [type, muscle, difficulty, exercises]);



    function GetContent() {
        if (isLoading) {
            return <ActivityIndicator size="large" />;
        }

        if (error || response == undefined) {
            return <Text>{error}</Text>;
        }


        return response.map((ex, index) => <Button key={index} title={ex.name} onPress={() => CheckExercise(ex)}></Button>);
    };

    function CheckExercise(exo) {
        navigation.navigate('exercice', {
            exData: exo,
            onGoBack: (data) => {
                AddNewExercise(data)
            }
        })
    }

    function handleNameProgram(inputText) {
        setNameProgram(inputText);
    }

    function AddNewExercise(data) {
        setExercises(oldArray => [...oldArray, data]);
    }

    function SaveProgram() {
        if (nameProgram != "") {
            nameObj = new Object();
            nameObj.name = nameProgram
            exercises.unshift(nameObj)
            if (AddProgramToDatabase(exercises, FIREBASE_AUTH.currentUser.uid)) {
                setExercises([])
            }
            navigation.navigate('MyPrograms')
        }

    }



    const testaf = ["alo", "hola"]
    return (
        <>
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Search an exercice :</Text>
                <Dropdown someList={typeList} handleState={(value) => handleState('type', value)} />
                <Dropdown someList={muscleList} handleState={(value) => handleState('muscle', value)} />
                <Dropdown someList={difficultyList} handleState={(value) => handleState('difficulty', value)} />

                <GetContent />

                <Text>-----------------</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={handleNameProgram}
                    value={nameProgram}
                    placeholder="Enter the name..."
                />
                <Text>Selected exercises :</Text>
                {
                    exercises?.map((exercise) => (
                        <Text>{exercise?.name}</Text>
                    ))
                }


                <Button color={"red"} title='Save program' onPress={() => SaveProgram()} />

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
});