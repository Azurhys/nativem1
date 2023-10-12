import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Accueil from './components/Accueil';
import Single from './components/Single';
import Connexion from './components/Connexion';
import MotDePasseOublie from './components/MotDePasseOublie';
import GestionOeuvres from './components/GestionOeuvres';
import GestionProfils from './components/GestionProfils';
import ProfilDetails from './components/ProfilDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Accueil">
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="Single" component={Single} />
        <Stack.Screen name="Connexion" component={Connexion} />
        <Stack.Screen name="MotDePasseOublie" component={MotDePasseOublie} />
        <Stack.Screen name="ProfilDetails" component={ProfilDetails} />
         <Stack.Screen
          name="GestionOeuvres"
          component={GestionOeuvres}
        />
        <Stack.Screen
          name="GestionProfils"
          component={GestionProfils}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
