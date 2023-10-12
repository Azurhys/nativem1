import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfilDetails = ({ route }) => {
  // Récupérez le profil passé en tant que paramètre de navigation
  const { profil } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails du profil</Text>
      <Text>Nom : {profil.nom}</Text>
      <Text>Email : {profil.email}</Text>
      <Text>Role : {profil.role}</Text>
      <Text>Date d'inscription : {profil.dateInscription}</Text>
      {/* Vous pouvez ajouter d'autres détails du profil ici */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ProfilDetails;
