import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontWeight: 'bold', // Texte en gras
    fontSize: 16, // Taille de la police de caractères
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: '4%',
  },
  title: {
    fontSize: 30,
    marginBottom: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: 'lightblue',
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
          flexDirection: 'row',
          marginLeft : '5%',
          marginRight: '5%',
  },
  img:{
     width: '50%', 
     height: 100, 
     marginRight: 10 
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%',
  },
  // Ajoutez d'autres styles communs ici
});
