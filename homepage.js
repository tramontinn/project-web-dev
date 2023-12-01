import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-native-paper'; 
function HomePage() {
  const navigate = useNavigate();

  const navigateToList = () => {
    navigate('/ListDonators');
  };

  const navigateToCrud = () => {
    navigate('/CrudDonators'); 
  };

  const navigateToMarket = () => {
    navigate('/ListSuppliers')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à sua página principal</Text>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={navigateToList}>
          Doadores
        </Button>
        <Button mode="contained" onPress={navigateToCrud}>
          Doe agora
        </Button>
        <Button mode="contained" onPress={navigateToMarket}>
          Campanhas
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