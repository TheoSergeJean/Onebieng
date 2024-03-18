import { Text, TextInput, View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useState, useEffect } from 'react';


const GetInfo = ({ navigation, url }) => {

    function handleData(json) {
        var result = [];


        for (var i in json) {

            result.push(json[i]);
        }
        console.log("AAAAAAAA");
        setResponse(result);

    }

    useEffect(() => {
        fetch(url, {

            //An API key is required
            headers: {
                'X-API-Key': 'V8cANfk+Xn2/4J17C3dJNw==JmYixHZ3jBoUBZth'
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

    }, [type,muscle,difficulty]);
    

};

export default GetInfo;
