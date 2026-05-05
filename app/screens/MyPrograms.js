import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { getPrograms } from "../Service/FirebaseService";
import { useFocusEffect } from "@react-navigation/native";

//The page where a specific user's programs are displayed.

const MyPrograms = ({ route, navigation }) => {
  const [programs, setPrograms] = useState([]);
  const userId = FIREBASE_AUTH.currentUser.uid;
  const [isLoading, setIsLoading] = useState(true);

  //Fetch the programs according to the logged user id
  useFocusEffect(
    React.useCallback(() => {
      setPrograms([]);
      setIsLoading(true);
      getPrograms(userId).then((docsSnap) => {
        docsSnap.forEach((doc) => {
          setPrograms((oldArray) => [
            ...oldArray,
            { data: doc.data().program, id: doc.id },
          ]);
        });
        setIsLoading(false);
      });
    }, []),
  );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.title}>Here is the list of your programs :</Text>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          programs.map((program, index) => (
            <Text
              key={index}
              style={styles.button}
              title={program.data[0].name}
              onPress={() =>
                navigation.navigate("Program", {
                  programData: program.data,
                  programId: program.id,
                })
              }
            >
              {program.data[0].name}{" "}
            </Text>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default MyPrograms;

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
