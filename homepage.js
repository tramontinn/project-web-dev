import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import background from './assets/backgroud.jpg'

const Homepage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = () => {
      // Lógica para processar o login
      console.log('Username:', username);
      console.log('Password:', password);
      // Adicione sua lógica de autenticação aqui
    };
  
return (
        <ImageBackground source={background} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>FTK Doações</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        onChangeText={(text) => setUsername(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View> 
        </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'black',
    },
    input: {
      height: 40,
      width: '80%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      backgroundColor: 'white',
      borderRadius: 10,
      paddingLeft: 10,
      paddingBottom: 5,
      marginTop: 10,
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 10,
      marginTop: 15,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });
  
  export default Homepage;