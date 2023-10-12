import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { globalStyles } from '../Style';
const Joi = require('../verif'); // Importez le schéma JOI que vous avez créé

const Connexion = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://musee-6ea91-default-rtdb.europe-west1.firebasedatabase.app/user.json')
      .then((response) => {
        const data = response.data;
        const utilisateursArray = Object.keys(data).map((key) => ({
          ...data[key],
          _id: key,
        }));
        setUtilisateurs(utilisateursArray);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        setIsLoading(false);
      });

  }, []);

  const handleConnexion = () => {
    const { error } = Joi.validate({ email, motDePasse }, Joi.object({
      email: Joi.string().email().required(),
      motDePasse: Joi.string().min(8).required(),
    }));

    if (error) {
      // S'il y a une erreur de validation, affichez un message d'erreur.
      Alert.alert('Erreur', error.details[0].message);
    } else {
      const user = utilisateurs.find(
        (u) => u.email === email && u.motDePasse === motDePasse
      );

      if (user) {
        // Connexion réussie, vous pouvez implémenter la redirection en fonction du rôle de l'utilisateur
        if (user.role === 'administrateur') {
          // Redirection vers l'espace de gestion des administrateurs
          navigation.navigate('GestionProfils');
        } else if (user.role === 'redacteur') {
          // Redirection vers l'espace de gestion des rédacteurs
          navigation.navigate('GestionOeuvres');
        }
      } else {
        // Affichez une alerte en cas d'échec de la connexion
        Alert.alert('Erreur', 'Identifiants incorrects. Veuillez réessayer.');
      }
    }
  };

  if (isLoading) {
    return (
      <View>
        <Text>Chargement en cours...</Text>
      </View>
    );
  }

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={[globalStyles.input, { marginTop: '2%', marginBottom: '2%' }]}
      />
      <TextInput
        placeholder="Mot de passe"
        onChangeText={(text) => setMotDePasse(text)}
        value={motDePasse}
        style={[globalStyles.input, { marginBottom: '2%' }]
        }
        secureTextEntry
      />
      <TouchableOpacity
        style={globalStyles.btn}
        onPress={handleConnexion}
      >
        <Text style={globalStyles.btnText}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={globalStyles.btn}
        onPress={() => navigation.navigate('MotDePasseOublie')}
      >
        <Text style={globalStyles.btnText}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Connexion;
