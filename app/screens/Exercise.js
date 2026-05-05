import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

//A page where an exercise's details are shown

const Exercise = ({ route, navigation }) => {
  const { exData, addMode } = route.params;

  useEffect(() => {
    if (addMode) {
      navigation.setOptions({
        headerRight: () => (
          <Button
            title="Add exercise"
            onPress={() => {
              navigation.navigate("New Program", { selectedExercise: exData });
            }}
            color="#000000"
          />
        ),
      });
    }
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 20,
        marginRight: 20,
      }}
    >
      <Text style={styles.title}>Name : {exData.name}</Text>
      <Text>Type : {exData.type}</Text>
      <Text>Muscle : {exData.muscle}</Text>
      <Text>Details : {exData.instructions}</Text>
    </View>
  );
};

export default Exercise;

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
});
