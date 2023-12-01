import React, { useState } from 'react';
import { ImageBackground, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function LoginPage() {
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
        navigate('/homepage'); // Substitua pelo caminho da sua página de CRUD
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
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white', // Text color
  },
  input: {
    width: '80%',
    backgroundColor: 'white', // Input background color
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    width: '80%',
    backgroundColor: '#007AFF', // Button background color
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Button text color
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LoginPage;