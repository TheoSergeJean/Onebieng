import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import ProgramSport from './app/screens/ProgramSport';
import Exercise from './app/screens/Exercise';
import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { Text, TextInput, View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import Nutrition from './app/screens/Nutrition';
import Food from './app/screens/Food';
import MyPrograms from './app/screens/MyPrograms';
import Program from './app/screens/Program';

//The main app file

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();



function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home" component={Home} options={{ headerRight: () => (<Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" color="#000000" />), }} />
      <InsideStack.Screen name="Nutrition" component={Nutrition} options={{ headerRight: () => (<Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" color="#000000" />), }} />
      <InsideStack.Screen name="New Program" component={ProgramSport} options={{ headerRight: () => (<Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" color="#000000" />), }} />
      <InsideStack.Screen name="Exercise" component={Exercise} options={{ headerRight: () => (<Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" color="#000000" />), }} />
      <InsideStack.Screen name="Food" component={Food} options={{ headerRight: () => (<Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" color="#000000" />), }} />
      <InsideStack.Screen name="My Programs" component={MyPrograms} options={{ headerRight: () => (<Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" color="#000000" />), }} />
      <InsideStack.Screen name="Program" component={Program} options={{ headerRight: () => (<Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" color="#000000" />), }} />

    </InsideStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    })
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name='Inside' component={InsideLayout} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}