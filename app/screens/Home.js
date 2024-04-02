import { View, Text, Button, StyleSheet, ActivityIndicator, TextInput, Image } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useState, useEffect } from 'react';

const Home = ({ navigation }) => {

    const [username, setUsername] = useState("user");

    useEffect(() => {
        handleUsername()
    }, []);

    function handleUsername() {
        email = FIREBASE_AUTH.currentUser.email;
        setUsername(email.split('@')[0])
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', marginBottom: 35 }}>
                <Text style={styles.welcome}>Hello {username} ! </Text>
                <Image style={styles.logo} source={require('../../assets/smile.png')} ></Image>
            </View>

            <View style={{ alignItems: 'center', width: '100%', }}>
                <Text style={styles.title}>Sport </Text>
                <Text style={styles.button} onPress={() => navigation.navigate('My Programs')} title="My Programs">My Programs</Text>
                <Text style={styles.button} onPress={() => navigation.navigate('New Program')} title="Create Program">Create Program</Text>
                <View style={styles.separator} />
                <Text style={styles.title}>Nutrition and health </Text>
                <Text style={styles.button} onPress={() => navigation.navigate('Nutrition')} title="Nutrition">Nutrition </Text>
                <Text style={styles.button} onPress={() => alert('Soon to be implemented')} title="Further informations ..." >Further informations...</Text>
            </View>
        </View>
    );

};

export default Home;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        alignItems: 'center'
    },
    welcome: {
        fontSize: 24,
        fontWeight: 'normal',
        marginTop: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    separator: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '80%',
        marginBottom: 20,
        marginTop: 20,
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
    logo: {
        width: 40,
        height: 40,
        alignSelf: 'center'
    },
});