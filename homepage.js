import React, { useState } from 'react';
import { ImageBackground, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Homepage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Sucesso no login
        const user = userCredential.user;
        console.log(user);
        navigate('/MarketItemsCRUD'); // Substitua pelo caminho da sua página de CRUD
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Adicione aqui o tratamento de erros de login
        console.error(errorCode, errorMessage);
      });
  };

  // Substitua 'caminho-para-sua-imagem-de-fundo' pelo caminho correto da imagem
  const background = { uri: '/assets/backgroud.jpg' };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>FTK Doações</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View> 
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // ... (as mesmas definições de estilo que você já forneceu)
});

export default Homepage;