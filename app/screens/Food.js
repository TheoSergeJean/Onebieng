import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from 'react';
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const Food = ({ route }) => {
    const { pdData } = route.params;
    const [response, setResponse] = useState();

    // function handleData(json) {
    //     var result = [];


    //     for (var i in json) {

    //         result.push(json[i]);
    //     }

    //     setResponse(result);
    //     console.log(response);
    // }

    useEffect(() => {
        fetch("https://api.spoonacular.com/food/ingredients/" + pdData.id + "/information?amount=100", {

            //An API key is required
            headers: {
                'X-API-Key': '4d2a59e1f761497d89010365e17d2084'
            }

        })
            .then(res => res.json())

            .then(
                (result) => {

                    setResponse(result);
                }
            )


    }, [])





    return (

        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {response && response.name && response.nutrition && response.nutrition.nutrients && (
                <View>
                    <Text>Name : {response.name}</Text>
                    <ScrollView style={styles.container}>
                        {response.nutrition.nutrients.map((nutrient, index) => (
                            <View key={index} style={styles.nutrientContainer}>
                                <Text style={styles.name}>{nutrient.name}:</Text>
                                <Text style={styles.amount}>{nutrient.amount} {nutrient.unit}</Text>
                                <Text style={styles.percent}>{nutrient.percentOfDailyNeeds}%</Text>
                            </View>
                        ))}
                    </ScrollView>
                    <Button title='log' onPress={() => console.log(response.name)} />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    name: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    amount: {},
    percent: {
        color: 'green',
    },
});

export default Food;
