import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

const LoginForm = ({onUsernameChange, onPasswordChange, handleSubmit}) => {

  return (
    <View style={styles.loginContainer}>
        <View style={styles.loginSection}>
            <Image style={styles.logo} source={require('../assets/logo-social-sq.png')} />

            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={onUsernameChange}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={onPasswordChange}
            />

            {/* <Button style={styles.button} title="Log In" onPress={handleLogin} /> */}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default LoginForm

const styles = StyleSheet.create({
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
        width: '80%',
        alignItems: 'center',
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
})