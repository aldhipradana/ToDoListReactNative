import { StatusBar } from 'expo-status-bar';
import { Button, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import React, { useState } from 'react';

// let [username, setUsername] = useState('');
// let [password, setPassword] = useState('');

export default function App() {
  const [username, setUsername] = useState('username');
  const [password, setPassword] = useState('password');

  const handleLogin = () => {
    console.log('Username: ', username);
    console.log('Password: ', password);

    if (username === 'Admin' && password === 'admin132$') {
      console.log('Login Success');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.loginSection}>
          <Image style={styles.logo} source={require('./assets/logo-social-sq.png')} />

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

          {/* <Button style={styles.button} title="Log In" onPress={handleLogin} /> */}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
          
      </View>


      <StatusBar style="auto" />

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  // login section style
  loginContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  loginSection: {
    width: '80%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    borderRadius: 30,
  },

  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },

  button: {
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    // borderColor: '#007AFF',
    // borderWidth: 1,
  },

  buttonText: {
    color: '#007AFF',
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 20
  }
});
