import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { deleteProgram } from "../Service/FirebaseService";

//Page where you can see a program with his name and exercises.

const Program = ({ route, navigation }) => {
  const { programData, programId } = route.params;

  //Separate the name from the exercises in the answer given by programData
  const name = programData[0].name;
  const exercises = programData.slice(1);

  // Delete the current program from the database and navigate back
  async function handleDeleteProgram() {
    Alert.alert(
      "Delete program",
      "Are you sure you want to delete this program ?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteProgram(programId);
            navigation.navigate("My Programs");
          },
        },
      ],
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.title}>My program name : {name}</Text>
      <Text style={styles.title}>List of exercises:</Text>
      <ScrollView>
        {exercises.map((ex, index) => (
          <Text
            style={styles.button}
            key={index}
            title={ex.name}
            onPress={() => navigation.navigate("Exercise", { exData: ex })}
          >
            {ex.name}
          </Text>
        ))}
        <Text style={styles.supprButton} onPress={handleDeleteProgram}>
          Delete program
        </Text>
      </ScrollView>
    </View>
  );
};

export default Program;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    alignItems: "center",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
  },
  supprButton: {
    backgroundColor: "#af4c4c",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    alignItems: "center",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});
