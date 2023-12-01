import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper'; // Importe o Button do React Native Paper

function HomePage() {
  const navigation = useNavigation();

  const navigateToList = () => {
    navigation.navigate('ListPage'); // Nomeie a página de listagem como 'ListPage' no React Navigation
  };

  const navigateToCrud = () => {
    navigation.navigate('CrudPage'); // Nomeie a página de CRUD como 'CrudPage' no React Navigation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à sua página principal</Text>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={navigateToList}>
          Ver Lista
        </Button>
        <Button mode="contained" onPress={navigateToCrud}>
          CRUD
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default HomePage;