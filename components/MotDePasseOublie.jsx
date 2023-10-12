import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { globalStyles } from '../Style';
import axios from 'axios';
const Joi = require('../verif');

const MotDePasseOublie = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = () => {
    setIsLoading(true);

    const { error } = Joi.validate({ email, newPassword }, Joi.resetPasswordSchema);

    if (error) {
      Alert.alert('Erreur', error.details[0].message);
      setIsLoading(false);
      return;
    }

    // Recherchez l'email dans votre base de données
    axios
      .get('https://musee-6ea91-default-rtdb.europe-west1.firebasedatabase.app/user.json')
      .then((response) => {
        const usersData = response.data;
        const users = Object.values(usersData);

        // Vérifiez si l'email saisi existe dans la base de données
        const user = users.find((user) => user.email === email);

        if (user) {
          // L'email existe, vous pouvez maintenant envoyer une requête pour mettre à jour le mot de passe.
          axios
            .patch(`https://musee-6ea91-default-rtdb.europe-west1.firebasedatabase.app/user/${user._id}.json`, { motDePasse: newPassword })
            .then(() => {
              setIsLoading(false);
              Alert.alert('Réinitialisation du mot de passe', 'Votre mot de passe a été réinitialisé avec succès.');
              setNewPassword(''); // Efface le champ de mot de passe
            })
            .catch((error) => {
              setIsLoading(false);
              console.error('Erreur lors de la réinitialisation du mot de passe :', error);
              Alert.alert('Erreur', 'Une erreur s\'est produite lors de la réinitialisation du mot de passe.');
            });
        } else {
          setIsLoading(false);
          Alert.alert('Erreur', 'L\'email saisi n\'existe pas.');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Erreur lors de la recherche de l\'email :', error);
        Alert.alert('Erreur', 'Une erreur s\'est produite lors de la recherche de l\'email.');
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={[globalStyles.input, { marginTop: '2%' }]}
      />
      <TextInput
        placeholder="Nouveau mot de passe"
        onChangeText={(text) => setNewPassword(text)}
        value={newPassword}
        secureTextEntry
        style={[globalStyles.input, { marginTop: '2%' }]
        }
      />
      <TouchableOpacity
        style={globalStyles.btn}
        onPress={handleResetPassword}
        disabled={isLoading}
      >
        <Text style={globalStyles.btnText}>Réinitialiser le mot de passe</Text>
      </TouchableOpacity>
      {isLoading && <Text>Envoi en cours...</Text>}
    </View>
  );
};

export default MotDePasseOublie;
