//import firebase from "firebase/compat/app";
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { FIRESTORE_DB } from '../../FirebaseConfig';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
//import { ref, set } from "firebase/database";
//import { ref as sRef } from 'firebase/storage';

export async function AddProgramToDatabase(program, userId) {
    try {
        await addDoc(collection(FIRESTORE_DB, "programs"), { program: program, userId: userId });
        return true
    } catch (e) {
        console.error("Error adding document: ", e);
    }

    return false

}


export async function GetPrograms(userId) {
    return await getDocs(query(collection(FIRESTORE_DB, "programs"), where("userId", "==", userId)))

}