import { Text, ScrollView, TextInput, View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import RNPickerSelect from 'react-native-picker-select';

//The main page about nutrition, here you can calculate your caloric needs and search for ingredient/dishes

const Nutrition = ({ navigation }) => {
    const [product, setProduct] = useState("banana");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [response, setResponse] = useState();
    const [intermediate, setIntermediate] = useState("");
    //Variables for the daily needs calculator
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

    const apiKey = ''; //Put your API Key here

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
        fetch("https://api.spoonacular.com/food/ingredients/search?query=" + product + "&number=30&sort=calories&sortDirection=desc", {

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

    }, [product]);


    //Allow to display a list of button leading to food details
    function GetContent() {
        if (isLoading) {
            return <ActivityIndicator size="large" />;
        }

        if (error || response == undefined) {
            return <Text>{error}</Text>;
        }


        return response[0].map((pd, index) => <Text style={styles.button} key={index} title={pd.name} onPress={() => navigation.navigate('food', { pdData: pd })}>{pd.name}</Text>);

    };
    //The daily Caloric needs calculator
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
        <View style={{ marginTop: 20, textAlign: 'center', alignItems: 'center' }}>
            <Text style={styles.title}>Enter information</Text>
            <Text style={styles.subTitle}>Age :</Text>
            <View style={styles.drop}>
                <TextInput
                    placeholder="Enter your age"
                    onChangeText={text => setAgeTemp(text)}
                    keyboardType="numeric"
                />
            </View>
            <Text style={styles.subTitle}>Height :</Text>
            <View style={styles.drop}>
                <TextInput
                    placeholder="Enter your height (cm)"
                    onChangeText={text => setHeightTemp(text)}
                    keyboardType="numeric"
                />
            </View>
            <Text style={styles.subTitle}>Weight :</Text>
            <View style={styles.drop}>
                <TextInput
                    placeholder="Enter your weight (kg)"
                    onChangeText={text => setWeightTemp(text)}
                    keyboardType="numeric"
                />
            </View>
            <Text style={styles.subTitle}>Sex :</Text>
            <View style={styles.drop}>
                <Text>Select a sex:</Text>
                <RNPickerSelect
                    placeholder={"Sex"}
                    items={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' }
                    ]}
                    onValueChange={(value) => setSexTemp(value)}


                />
            </View>
            <Text style={styles.subTitle}>Activity level :</Text>
            <View style={styles.drop}>
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
            </View>
            <Text style={[styles.button, { backgroundColor: "red", marginTop: 20 }]} title='Calculate macros' onPress={() => {
                setActivityLevel(activityLevelTemp);
                setSex(sexTemp);
                setAge(ageTemp);
                setWeight(weightTemp);
                setHeight(heightTemp);
            }} >Calculate macros</Text>
            <Text>Your macros needs :{dailyCaloricNeeds(age, height, weight, sex, activityLevel)} cal</Text>
        </View>
        <View style={styles.separator} />
        <Text style={styles.title}>Search an ingredient : </Text>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput style={styles.input} placeholder='Name of your product' onChangeText={(text) => {
                setIntermediate(text);

            }} />
            <Text style={[styles.button, { backgroundColor: "red", marginTop: 20 }]} title='Search' onPress={() => {
                setProduct(intermediate);

            }} >Search</Text>
            <View><Text style={{ marginBottom: 20, marginTop: 20 }}>Matching ingredients :</Text></View>

            <GetContent />

        </View>
    </ScrollView >
    );

};

export default Nutrition;


const styles = StyleSheet.create({
    drop: {
        fontSize: 16,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        width: '80%',
        marginBottom: 10,
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: 200,
        alignItems: 'center',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subTitle: {
        alignSelf: 'flex-start',
        marginBottom: 15,
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 45
    },
    title: {
        alignSelf: 'center',
        marginBottom: 15,
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '80%',
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'center'
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
        marginBottom: 10
    }
});