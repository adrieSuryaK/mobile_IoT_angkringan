import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { auth, signInWithEmailAndPassword } from '../../configs/myConfig';
import { Button } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        console.log(uid);
        console.log('User signed in successfully');
        navigation.navigate('Route', { uid });
      })
      .catch((error) => {
        console.log('Error signing in:', error);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a237e" />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.tInput}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.tInput}
      />
      <Button
      mode="contained" 
      onPress={handleLogin}
      style={styles.button}
      >
        <Text 
        style={styles.activeButtonText}
        >Login</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f3f9',
  },
  tInput: {
    padding: 10,
    width: '80%',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 4,
    color:'black',
  },
  button: {
    backgroundColor: '#1a237e',
    width:150,
    marginTop:20,
  },
  activeButtonText: {
    color: 'white',
  },

})

export default LoginScreen;