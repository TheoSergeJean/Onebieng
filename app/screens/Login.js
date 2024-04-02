import { Text, TextInput, View, StyleSheet, ActivityIndicator, Button, Image, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_APP, FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

//The login Page used to either sign up or sign in

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isUser, setIsUser] = useState(true);
    const auth = FIREBASE_AUTH;


    //Allow a user to log in the app if the mail and password are correct
    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
            alert('Sign in failed : ' + error.message);
        } finally {
            setLoading(false);
        }
    }
    //Allow a user to create an account on the app
    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
            alert('Sign in failed : ' + error.message);
        } finally {
            setLoading(false);
        }
    }
    // Change a state to dertermine whether the user want to sign up or sign in
    function changeIsUserState() {
        setIsUser(!isUser)
    }

    return (
        <KeyboardAvoidingView behavior="height">
            <View style={styles.containerApp}>
                <Image style={styles.logo} source={require('../../assets/sport.png')} ></Image>
                <Text style={styles.appTitle}>OnéBieng</Text>
                <Text style={styles.subAppTitle}>Sport and nutrition application</Text>

            </View >
            <View style={styles.container}>

                {
                    isUser && <Text style={styles.title}>Log In page</Text>
                }
                {
                    !isUser && <Text style={styles.title}>Sign Up page</Text>
                }
                <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
                <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>

                {loading ? <ActivityIndicator size="large" color="#0000ff" />
                    : <>
                        {
                            isUser && <Text style={styles.button} title="Login" onPress={signIn} >Login</Text>
                        }
                        {
                            !isUser && <Text style={styles.button} title="Create account" onPress={signUp} >Create account</Text>
                        }
                        {
                            isUser && <Text style={styles.subText} onPress={() => { changeIsUserState() }}>Don't have an account yet ? click here ! </Text>
                        }
                        {
                            !isUser && <Text style={styles.subText} onPress={() => { changeIsUserState() }} >Already have an account ? click here !</Text>
                        }
                    </>}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    containerApp: {
        marginTop: 60,
        justifyContent: 'center',
        marginBottom: -200,
    },
    container: {
        marginHorizontal: 20,
        marginTop: 250,
        justifyContent: 'center',
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    appTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 2,
        textAlign: 'center'
    }
    ,
    subAppTitle: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
    },
    subText: {
        color: 'blue',
        marginTop: 15,
        fontWeight: 'bold'
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
        width: 300,
        alignItems: 'center',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        alignSelf: 'center'
    }
});