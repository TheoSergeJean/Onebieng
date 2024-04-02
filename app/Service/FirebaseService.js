import { FIRESTORE_DB } from '../../FirebaseConfig';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";


//Add a program to the firebase database

export async function AddProgramToDatabase(program, userId) {
    try {
        await addDoc(collection(FIRESTORE_DB, "programs"), { program: program, userId: userId });
        return true
    } catch (e) {
        console.error("Error adding document: ", e);
    }

    return false

}

// Allow to get programs specific to one user

export async function GetPrograms(userId) {
    return await getDocs(query(collection(FIRESTORE_DB, "programs"), where("userId", "==", userId)))

}