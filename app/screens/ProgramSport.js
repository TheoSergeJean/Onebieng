import {
  Text,
  ScrollView,
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useState, useEffect } from "react";
import Dropdown from "../Component/Dropdown";
import ExerciseList from "../Component/ExerciseList";
import { addProgramToDatabase } from "../Service/FirebaseService";
import { handleData, sanitizeInput } from "../Service/Utils";

// Main sport page where you can create programs, select params for exercises and navigate to exercises details.

const ProgramSport = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [response, setResponse] = useState();
  const [type, setType] = useState("");
  const [muscle, setMuscle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [exercises, setExercises] = useState([]);
  const [nameProgram, setNameProgram] = useState("");

  const typeList = [
    "cardio",
    "olympic_weightlifting",
    "plyometrics",
    "powerlifting",
    "strength",
    "stretching",
    "strongman",
  ];
  const muscleList = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
  ];
  const difficultyList = ["beginner", "intermediate", "expert"];

  const url =
    "https://api.api-ninjas.com/v1/exercises?type=" +
    type +
    "&muscle=" +
    muscle +
    "&difficulty=" +
    difficulty;

  const apiKey = process.env.EXPO_PUBLIC_API_NINJA_KEY; //Put your API Key here

  // Function that take a json file (response from an api for example) and set it as the response state

  // This function is used to handle each type of research parameters for the exercise api
  const handleState = (key, value) => {
    switch (key) {
      case "type":
        setType(value);
        break;
      case "muscle":
        setMuscle(value);
        break;
      case "difficulty":
        setDifficulty(value);
        break;
      default:
        break;
    }
  };

  // Contain the fetch function to call an api
  useEffect(() => {
    fetch(url, {
      headers: {
        "X-API-Key": apiKey,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setResponse(handleData(result));
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        },
      );
  }, [type, muscle, difficulty]);

  useEffect(() => {
    if (route?.params?.selectedExercise) {
      addNewExercise(route.params.selectedExercise);
    }
  }, [route?.params?.selectedExercise]);

  // Allow to navigate to an exercise page, and wait for information from the targeted page
  function checkExercise(exo) {
    navigation.navigate("Exercise", {
      exData: exo,
      addMode: true, // simple booléen pour signaler qu'on est en mode ajout
    });
  }

  //Set the name of the new program
  function handleNameProgram(inputText) {
    setNameProgram(sanitizeInput(inputText));
  }
  //Add an exercise to the future program
  function addNewExercise(data) {
    setExercises((oldArray) => [...oldArray, data]);
  }

  //Give all the information to the AddProgram to send the program to the database
  function saveProgram() {
    if (nameProgram != "") {
      const nameObj = { name: nameProgram };
      exercises.unshift(nameObj);
      if (addProgramToDatabase(exercises, FIREBASE_AUTH.currentUser.uid)) {
        setExercises([]);
      }
      navigation.navigate("My Programs");
    }
  }

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingRight: 25, paddingLeft: 25 }}>
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <Text style={styles.title}>Search an exercise :</Text>
          <Text style={styles.subTitle}>Type of exercise :</Text>
          <Dropdown
            someList={typeList}
            handleState={(value) => handleState("type", value)}
          />
          <Text style={styles.subTitle}>Body part :</Text>
          <Dropdown
            someList={muscleList}
            handleState={(value) => handleState("muscle", value)}
          />
          <Text style={styles.subTitle}>Sport level:</Text>
          <Dropdown
            someList={difficultyList}
            handleState={(value) => handleState("difficulty", value)}
          />
          <Text style={styles.subTitle}>List of exercises :</Text>
          <ExerciseList
            isLoading={isLoading}
            error={error}
            response={response}
            onPress={checkExercise}
            styles={styles}
          />
        </ScrollView>
        <View style={styles.separator} />
        <View contentContainerStyle={{ height: "100%" }}>
          <Text style={styles.title}>Program :</Text>
          <Text style={styles.subTitle}>Name of the program :</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleNameProgram}
            value={nameProgram}
            placeholder="Enter the name..."
          />
          <Text style={styles.subTitle}>Selected exercises :</Text>
          {exercises?.map((exercise, index) => (
            <Text key={index} style={{ alignSelf: "center" }}>
              {exercise?.name}
            </Text>
          ))}

          <Text
            style={[
              styles.button,
              { backgroundColor: "red", marginTop: 20, marginBottom: 40 },
            ]}
            title="Save program"
            onPress={() => saveProgram()}
          >
            Save program
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default ProgramSport;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 300,
    alignItems: "center",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    alignSelf: "center",
  },
  separator: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    width: "80%",
    marginBottom: 20,
    marginTop: 20,
    alignSelf: "center",
  },
  subTitle: {
    fontSize: 15,
    alignSelf: "center",
    marginBottom: 15,
    marginTop: 10,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: "50%",
    borderColor: "gray",
    borderWidth: 1,
    alignSelf: "center",
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
