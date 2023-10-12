import React from 'react';
import { View, Text, Image } from 'react-native';
import { globalStyles } from '../Style';

const Single = ({ route }) => {
  const { oeuvre } = route.params;

  return (
    <View>
      <Image source={{ uri: oeuvre.image }} style={{ width: '100%', height: 200 }} />
      <Text style={{fontSize: 24}}>Nom: </Text><Text>{oeuvre.nom}</Text>
      <Text style={{fontSize: 24}}>Description:</Text><Text> {oeuvre.description}</Text>
      <Text style={{fontSize: 24}}>Auteur: </Text><Text>{oeuvre.auteur}</Text>
      <Text style={{fontSize: 24}}>Date de création: </Text><Text>{oeuvre.dt_creation}</Text>
    </View>
  );
};

export default Single;
