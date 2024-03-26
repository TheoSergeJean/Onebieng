import { Text, ScrollView, TextInput, View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import RNPickerSelect from 'react-native-picker-select';

const Nutrition = ({ navigation }) => {
    const [product, setProduct] = useState("banana");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [response, setResponse] = useState();
    const [intermediate, setIntermediate] = useState("");

    const [age, setAge] = useState();
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();
    const [sex, setSex] = useState("");
    const [activityLevel, setActivityLevel] = useState("");

    const [ageTemp, setAgeTemp] = useState();
    const [weightTemp, setWeightTemp] = useState();
    const [heightTemp, setHeightTemp] = useState();
    const [sexTemp, setSexTemp] = useState("");
    const [activityLevelTemp, setActivityLevelTemp] = useState("");


    function handleData(json) {
        var result = [];


        for (var i in json) {

            result.push(json[i]);
        }

        setResponse(result);
    }

    useEffect(() => {
        fetch("https://api.spoonacular.com/food/ingredients/search?query=" + product + "&number=30&sort=calories&sortDirection=desc", {

            //An API key is required
            headers: {
                'X-API-Key': '4d2a59e1f761497d89010365e17d2084'
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

    }, [product]);



    function GetContent() {
        if (isLoading) {
            return <ActivityIndicator size="large" />;
        }

        if (error || response == undefined) {
            return <Text>{error}</Text>;
        }


        return response[0].map((pd, index) => <Button key={index} title={pd.name} onPress={() => navigation.navigate('food', { pdData: pd })}></Button>);

    };

    function dailyCaloricNeeds(age, height, weight, gender, activityLevel) {
        let caloricNeeds = 0;

        // Calculate Basal Metabolic Rate (BMR) based on gender
        if (gender === 'male') {
            caloricNeeds = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else if (gender === 'female') {
            caloricNeeds = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }

        // Multiply BMR by activity factor
        switch (activityLevel) {
            case 'sedentary':
                caloricNeeds *= 1.2;
                break;
            case 'lightly active':
                caloricNeeds *= 1.375;
                break;
            case 'moderately active':
                caloricNeeds *= 1.55;
                break;
            case 'very active':
                caloricNeeds *= 1.725;
                break;
            case 'extra active':
                caloricNeeds *= 1.9;
                break;
            default:
                return;
        }

        return caloricNeeds;
    }

    return (<ScrollView>
        <View>
            <TextInput
                placeholder="Enter your age"
                onChangeText={text => setAgeTemp(text)}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Enter your height (cm)"
                onChangeText={text => setHeightTemp(text)}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Enter your weight (kg)"
                onChangeText={text => setWeightTemp(text)}
                keyboardType="numeric"
            />
            <Text>Select a sex:</Text>
            <RNPickerSelect
                placeholder={"Sex"}
                items={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' }
                ]}
                onValueChange={(value) => setSexTemp(value)}


            />
            <Text>Select an activity level:</Text>
            <RNPickerSelect
                placeholder={"Activity level"}
                items={[
                    { label: 'Sedentary', value: 'sedentary' },
                    { label: 'Lightly Active', value: 'lightly active' },
                    { label: 'Moderately Active', value: 'moderately active' },
                    { label: 'Very Active', value: 'very active' },
                    { label: 'Extra Active', value: 'extra active' }
                ]}
                onValueChange={(value) => setActivityLevelTemp(value)}


            />
            <Button title='Calculate macros' onPress={() => {
                setActivityLevel(activityLevelTemp);
                setSex(sexTemp);
                setAge(ageTemp);
                setWeight(weightTemp);
                setHeight(heightTemp);
            }} />
            <Text>Your macros needs :{dailyCaloricNeeds(age, height, weight, sex, activityLevel)} cal</Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput placeholder='Name of your product' onChangeText={(text) => {
                setIntermediate(text);

            }} />
            <Button title='Search' onPress={() => {
                setProduct(intermediate);

            }} />
            <View><Text>Ingrédients correspondants :</Text></View>

            <GetContent />

        </View>
    </ScrollView>
    );

};

export default Nutrition;


