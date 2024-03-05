import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const ItemComponent = ({title, desc, cat, onTitleChange, onDescChange, onCategoryChange}) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter title"
                    value={title}
                    onChangeText={onTitleChange}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter category"
                    value={cat}
                    onChangeText={onCategoryChange}
                />
                <TextInput
                    style={[styles.input, styles.descInput]}
                    placeholder="Enter description"
                    value={desc}
                    multiline={true}
                    onChangeText={onDescChange}
                />
                
            </View>
        </View>
    )
}

export default ItemComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
        padding: 10
    },
    descInput: {
        height: 200,
    },
    button: {
        marginTop: 10,
    },
    formContainer: {
        width: '95%',
        backgroundColor: '#fff',
        paddingTop: 20,
    }
})