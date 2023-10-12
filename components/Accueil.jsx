import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import { globalStyles } from '../Style';

const Accueil = ({ navigation }) => {
  const [oeuvres, setOeuvres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <View>
        <Text>Chargement en cours...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={globalStyles.container} >
        <TouchableOpacity
        style={globalStyles.btn}
        onPress={() => navigation.navigate('Connexion')}
      >
        <Icon name="log-in" size={24} color="#000" />
        <Text style={{ marginLeft: 10 }}>Se connecter</Text>
      </TouchableOpacity>
      <Text style={globalStyles.title}>Liste des œuvres disponibles</Text>
      <ScrollView>
      <FlatList
        data={oeuvres}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
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
        )}
      />
      </ScrollView>
    </ScrollView>
  );
};


export default Accueil;
