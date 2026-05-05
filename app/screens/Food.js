import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

// A page to display information about the food selected on the nutrition page

const Food = ({ route }) => {
  const { pdData } = route.params;
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const apiKey = process.env.EXPO_PUBLIC_SPOONACULAR_KEY; //Put your API Key here

  // Contain the fetch function to call an api
  useEffect(() => {
    fetch(
      "https://api.spoonacular.com/food/ingredients/" +
        pdData.id +
        "/information?amount=1",
      {
        //An API key is required
        headers: {
          "X-API-Key": apiKey,
        },
      },
    )
      .then((res) => res.json())

      .then(
        (result) => {
          setIsLoading(false);
          setResponse(result);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        },
      );
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      {isLoading && <ActivityIndicator size="large" />}

      {response &&
        response.name &&
        response.nutrition &&
        response.nutrition.nutrients && (
          <View>
            <Text style={styles.title}>Name : {response.name}</Text>
            <ScrollView style={styles.container}>
              {response.nutrition.nutrients.map((nutrient, index) => (
                <View key={index} style={styles.nutrientContainer}>
                  <Text style={styles.name}>{nutrient.name}:</Text>
                  <Text style={styles.amount}>
                    {nutrient.amount} {nutrient.unit}
                  </Text>
                  <Text style={styles.percent}>
                    {nutrient.percentOfDailyNeeds}%
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  nutrientContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
    marginRight: 10,
  },
  amount: {},
  percent: {
    color: "green",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 8,
    alignSelf: "center",
  },
});

export default Food;
