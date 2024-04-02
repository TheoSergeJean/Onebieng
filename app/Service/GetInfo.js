import { Text, TextInput, View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { useState, useEffect } from 'react';


export default function GetInfo(url, apiKey, setState) {

    //This fonction is made to put a json as the response state
    function handleData(json) {
        var resp = [];


        for (var i in json) {

            resp.push(json[i]);
        }

        return (resp);

    }

    fetch(url, {

        //An API key is required
        headers: {
            'X-API-Key': apiKey
        }

    })
        .then(res => res.json())

        .then(
            (result) => {
                return (handleData(result));
            }
        )
}

