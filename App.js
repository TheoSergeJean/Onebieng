import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import Sport from './app/screens/Sport';
import Details from './app/screens/Details';
import ProgramSport from './app/screens/ProgramSport';
import Exercice from './app/screens/Exercice';
import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';


const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();



function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Programmes sportifs" component={Sport} />
      <InsideStack.Screen name="details" component={Details} />
      <InsideStack.Screen name="Program" component={ProgramSport} />
      <InsideStack.Screen name="exercice" component={Exercice} />
    </InsideStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      // console.log('user', user);
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