import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Accueil from '../components/Accueil';
import Single from '../components/Single';
import Connexion from '../components/Connexion';
import MotDePasseOublie from '../components/MotDePasseOublie';
import GestionOeuvres from '../components/GestionOeuvres';
import GestionProfils from '../components/GestionProfils';
import ProfilDetails from '../components/ProfilDetails';

const AppNavigator = createStackNavigator(
  {
    Accueil,
    Single,
    Connexion,
    MotDePasseOublie,
    GestionOeuvres,
    GestionProfils,
    ProfilDetails,
  },
  {
    initialRouteName: 'Accueil', // Page d'accueil par défaut
  }
);

export default createAppContainer(AppNavigator);
