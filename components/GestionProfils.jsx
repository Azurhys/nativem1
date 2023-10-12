import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../Style';
import GestionOeuvres from './GestionOeuvres';

const GestionProfils = () => {
  const [profils, setProfils] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nouveauProfil, setNouveauProfil] = useState({
    nom: '',
    email: '',
    motDePasse: '',
  });
  const [editingProfil, setEditingProfil] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const editProfil = (profil) => {
    setEditingProfil(profil);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get('https://musee-6ea91-default-rtdb.europe-west1.firebasedatabase.app/user.json')
      .then((response) => {
        const profilsArray = Object.values(response.data);
        setProfils(profilsArray);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des profils :', error);
        setIsLoading(false);
      });
  }, []);

  const ajouterProfil = () => {
    if (nouveauProfil.nom && nouveauProfil.email && nouveauProfil.motDePasse) {
      axios
        .post('https://musee-6ea91-default-rtdb.europe-west1.firebasedatabase.app/user.json', nouveauProfil)
        .then((response) => {
          setProfils([...profils, { ...nouveauProfil, _id: response.data.name }]);
          setNouveauProfil({
            nom: '',
            email: '',
            motDePasse: '',
          });
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout du profil :", error);
        });
    }
  };

  const updateProfil = () => {
    if (editingProfil) {
      axios
        .put(`https://musee-6ea91-default-rtdb.europe-west1.firebasedatabase.app/user/${editingProfil._id}.json`, editingProfil)
        .then(() => {
          const updatedProfils = profils.map((profil) =>
            profil._id === editingProfil._id ? editingProfil : profil
          );
          setProfils(updatedProfils);
          setEditingProfil(null);
          setIsModalVisible(false);
        })
        .catch((error) => {
          console.error("Erreur lors de la modification du profil :", error);
        });
    }
  };

  const supprimerProfil = (id) => {
    axios
      .delete(`https://musee-6ea91-default-rtdb.europe-west1.firebasedatabase.app/user/${id}.json`)
      .then(() => {
        const profilsRestants = profils.filter((profil) => profil._id !== id);
        setProfils(profilsRestants);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du profil :", error);
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
    <View>
      <Text style={globalStyles.title}>Liste des profils :</Text>
      <FlatList
        data={profils}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View>
            <Button
              title={`Voir le profil de ${item.nom}`}
              onPress={() => navigation.navigate('ProfilDetails', { profil: item })}
            />
            <TouchableOpacity style={styles.editButton} onPress={() => editProfil(item)}>
              <Text style={styles.buttonText}>Editer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => supprimerProfil(item._id)}>
              <Text style={styles.buttonText}>Supprimer</Text>
            </TouchableOpacity>
            <View style={{ marginBottom: '5%' }} />

          </View>
        )}
      />
      <Text style={globalStyles.title}>Ajouter un nouveau profil :</Text>
      <TextInput
        placeholder="Nom"
        value={nouveauProfil.nom}
        onChangeText={(text) => setNouveauProfil({ ...nouveauProfil, nom: text })}
        style={globalStyles.input}
      />
      <TextInput
        placeholder="Email"
        value={nouveauProfil.email}
        onChangeText={(text) => setNouveauProfil({ ...nouveauProfil, email: text })}
        style={globalStyles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        value={nouveauProfil.motDePasse}
        onChangeText={(text) => setNouveauProfil({ ...nouveauProfil, motDePasse: text })}
        secureTextEntry
        style={globalStyles.input}
      />
      <Button title="Ajouter" onPress={ajouterProfil} />
      {editingProfil && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View>
            <Text style={globalStyles.title}>Éditer le profil :</Text>
            <TextInput
              placeholder="Nouveau nom"
              value={editingProfil.nom}
              onChangeText={(text) => setEditingProfil({ ...editingProfil, nom: text })}
              style={[globalStyles.input, { marginBottom: '2%' }]}
            />
            <TextInput
              placeholder="Nouvel email"
              value={editingProfil.email}
              onChangeText={(text) => setEditingProfil({ ...editingProfil, email: text })}
              style={[globalStyles.input, { marginBottom: '2%' }]}
            />
            <TextInput
              placeholder="Nouveau mot de passe"
              value={editingProfil.motDePasse}
              onChangeText={(text) => setEditingProfil({ ...editingProfil, motDePasse: text })}
              secureTextEntry
              style={[globalStyles.input, { marginBottom: '2%' }]}
            />
            <TouchableOpacity onPress={updateProfil} style={styles.editButton}>
              <Text style={styles.buttonText}>Enregistrer les modifications</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal} style={styles.deleteButton}>
              <Text style={styles.buttonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      <GestionOeuvres />
    </View>
  );
};

const styles = StyleSheet.create({
  editButton: {
    backgroundColor: 'green',
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
});

export default GestionProfils;
