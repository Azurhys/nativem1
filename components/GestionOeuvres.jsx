import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../Style';
import { StyleSheet } from 'react-native';
const Joi = require('joi');

const GestionOeuvres = () => {
  const [oeuvres, setOeuvres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nouvelleOeuvre, setNouvelleOeuvre] = useState({
    nom: '',
    description: '',
    image: '',
    auteur: '',
    dt_creation: '', 
  });
  const [editingOeuvre, setEditingOeuvre] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const editOeuvre = (oeuvre) => {
    setEditingOeuvre(oeuvre);
    setIsModalVisible(true);
  };
  
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const navigation = useNavigation();
  
  useEffect(() => {
    axios
      .get(`https://musee-6ea91-default-rtdb.europe-west1.firebasedatabase.app/oeuvre.json`)
      .then((reponse) => {
        const resultat = [];
        for (const key in reponse.data) {
          if (reponse.data[key]) resultat.push({ ...reponse.data[key], id: key });
        }
        setOeuvres(resultat);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des œuvres :", error);
        setIsLoading(false);
      });
  }, []);

  const ajouterOeuvre = () => {
    const { error } = oeuvreSchema.validate(nouvelleOeuvre);
  
    if (error) {
      Alert.alert('Erreur', error.details[0].message);
      return;
    }
  
    // Envoyer la nouvelle oeuvre au serveur
    axios
      .post('https://musee-6ea91-default-rtdb.europe-west1.firebasedatabase.app/oeuvre.json', nouvelleOeuvre)
      .then((response) => {
        setOeuvres([...oeuvres, { ...nouvelleOeuvre, _id: response.data.name }]); // Utilisation de response.data.name comme ID
        setNouvelleOeuvre({
          nom: '',
          description: '',
          image: '',
          auteur: '',
          dt_creation: '', // Assurez-vous que dt_creation est au format date approprié
        });
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'œuvre :", error);
      });
  };
  

  const updateOeuvre = () => {
    const { error } = oeuvreSchema.validate(nouvelleOeuvre);

    if (error) {
      Alert.alert('Erreur', error.details[0].message);
      return;
    }

    if (editingOeuvre) {
      // Envoyer une requête PUT pour mettre à jour l'œuvre sur le serveur
      axios
        .put(`https://musee-6ea91-default-rtdb.europe-west1.firebasedatabase.app/oeuvre/${editingOeuvre._id}.json`, editingOeuvre)
        .then(() => {
          const updatedOeuvres = oeuvres.map((oeuvre) =>
            oeuvre.id === editingOeuvre.id ? editingOeuvre : oeuvre
          );
          setOeuvres(updatedOeuvres);
          setEditingOeuvre(null);
        })
        .catch((error) => {
          console.error("Erreur lors de la modification de l'œuvre :", error);
        });
    }
  };

  const supprimerOeuvre = (id) => {
    console.log(id)
    // Ici, vous devriez envoyer une requête DELETE pour supprimer l'œuvre de votre base de données réelle
    // Après la suppression réussie, mettez à jour l'état local avec les données réelles
    axios
      .delete(`https://musee-6ea91-default-rtdb.europe-west1.firebasedatabase.app/oeuvre/${id}.json`)
      .then(() => {
        const oeuvresRestantes = oeuvres.filter((oeuvre) => oeuvre.id !== id);
        setOeuvres(oeuvresRestantes);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'œuvre :", error);
      });
  };

  if (isLoading) {
    return (
      <View>
        <Text>Chargement en cours...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Text style={globalStyles.title}>Liste des œuvres :</Text>
      <FlatList
        data={oeuvres}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
                onPress={() => navigation.navigate('Single', { oeuvre: item })}
            >
                
                <View style={globalStyles.listItem}>
                  <Image
                    source={{ uri: item.image }}
                    style={globalStyles.img}
                  />
                  <Text style={globalStyles.text}>{item.nom}</Text>
                </View>
                    
                
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={() => editOeuvre(item)}>
              <Text style={styles.buttonText}>Editer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={() => supprimerOeuvre(item.id)}>
              <Text style={styles.buttonText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
      />
            

      <Text style={globalStyles.title}>Ajouter une nouvelle œuvre :</Text>
      <TextInput
        placeholder="Nom de l'œuvre"
        value={nouvelleOeuvre.nom}
        onChangeText={(text) => setNouvelleOeuvre({ ...nouvelleOeuvre, nom: text })}
        style={globalStyles.input}
      />
      <TextInput
        placeholder="Description de l'œuvre"
        value={nouvelleOeuvre.description}
        onChangeText={(text) => setNouvelleOeuvre({ ...nouvelleOeuvre, description: text })}
        multiline
        numberOfLines={4}
        style={globalStyles.input}
      />
      <TextInput
        placeholder="URL de l'image"
        value={nouvelleOeuvre.image}
        onChangeText={(text) => setNouvelleOeuvre({ ...nouvelleOeuvre, image: text })}
        style={globalStyles.input}
      />
      <TextInput
        placeholder="Auteur de l'œuvre"
        value={nouvelleOeuvre.auteur}
        onChangeText={(text) => setNouvelleOeuvre({ ...nouvelleOeuvre, auteur: text })}
        style={globalStyles.input}
      />
      <TextInput
        placeholder="Date de création (format YYYY-MM-DD)"
        value={nouvelleOeuvre.dt_creation}
        onChangeText={(text) => setNouvelleOeuvre({ ...nouvelleOeuvre, dt_creation: text })}
        style={globalStyles.input}
      />
      <TouchableOpacity
        title="Ajouter"
        onPress={ajouterOeuvre}
        style={styles.addButton}
      >
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>

      {editingOeuvre && (
          <Modal
            animationType="slide"
            transparent={false}
            visible={isModalVisible}
            onRequestClose={closeModal}
          >
            <View>
              <Text style={[globalStyles.title, { marginBottom: '2%' }]}>Éditer l'œuvre :</Text>
              <TextInput
                placeholder="Nouveau nom"
                value={editingOeuvre.nom}
                onChangeText={(text) => setEditingOeuvre((prevOeuvre) => ({ ...prevOeuvre, nom: text }))}
                style={[globalStyles.input, { marginBottom: '2%' }]}
              />
              <TextInput
                placeholder="Nouvelle description"
                value={editingOeuvre.description}
                onChangeText={(text) => setEditingOeuvre((prevOeuvre) => ({ ...prevOeuvre, description: text }))}
                multiline
                numberOfLines={4}
                style={[globalStyles.input, { marginBottom: '2%' }]}
              />
              <TextInput
                placeholder="Nouvelle URL de l'image"
                value={editingOeuvre.image}
                onChangeText={(text) => setEditingOeuvre((prevOeuvre) => ({ ...prevOeuvre, image: text }))}
                style={[globalStyles.input, { marginBottom: '2%' }]}
              />
              <TextInput
                placeholder="Nouvel auteur"
                value={editingOeuvre.auteur}
                onChangeText={(text) => setEditingOeuvre((prevOeuvre) => ({ ...prevOeuvre, auteur: text }))}
                style={[globalStyles.input, { marginBottom: '2%' }]}
              />
              <TextInput
                placeholder="Nouvelle date de création (format YYYY-MM-DD)"
                value={editingOeuvre.dt_creation}
                onChangeText={(text) => setEditingOeuvre((prevOeuvre) => ({ ...prevOeuvre, dt_creation: text }))}
                style={[globalStyles.input, { marginBottom: '2%' }]}
              />
              <TouchableOpacity onPress={updateOeuvre}>
                <Text style={styles.editButton}>Enregistrer les modifications</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.deleteButton}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  editButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default GestionOeuvres;
