import { StatusBar } from 'expo-status-bar';
import { Button, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import LoginForm from '../components/loginForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (text) => {
        setUsername(text);
    }

    const handlePasswordChange = (text) => {
        setPassword(text);
    }
  
    const handleLogin = () => {
      console.log('Username: ', username);
      console.log('Password: ', password);
  
      if (username === '' && password === '') {
        console.log('Login Success');
        AsyncStorage.clear();
        AsyncStorage.setItem('username', username);
        AsyncStorage.setItem('passw', password);
        router.replace('todolist/list');
      }
    }
  
    return (
      <SafeAreaView style={styles.container}>
        
        <LoginForm 
        onUsernameChange={handleUsernameChange} 
        onPasswordChange={handlePasswordChange} 
        handleSubmit={handleLogin} 
        />
  
        {/* <StatusBar style="auto" /> */}
  
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
    
  });
  