import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, router } from 'expo-router'
import { addTodoItem, getItem, itemHandler } from '../../db/itemHandler'

import ItemComponent from '../../components/itemComponent'

export default function addItem(){
    const [title, setTitle] = useState('New To Do Item Title');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('uncategorized');

    const handleTitleChange = (text) => {
        setTitle(text);
    }

    const handleDescChange = (text) => {
        setDesc(text);
    }

    const handleCategoryChange = (text) => {
        setCategory(text);
    }

    const saveHandler = () => {
        console.log('Title: ', title);
        console.log('Description: ', desc);
        const item = {
            title: title,
            desc: desc,
            status: 'open',
            category: category,
        }
        
        itemHandler.addTodoItem(item).then((res) => {
            console.log('Item Added: ', res);
            router.dismiss();
        }).catch((e) => {
            console.log('Error on addTodoItem: ', e);
        });
    }
    
    return (
        <>
        <Stack.Screen options={{
            title: 'Add Item',
            headerRight: () => <Button title="Save" onPress={saveHandler} />,
            }} />
        <View style={styles.container}>
            {/* form of to do list with button to save */}
            
            <ItemComponent title={title}
            desc={desc} 
            cat={category}
            onTitleChange={handleTitleChange} 
            onDescChange={handleDescChange} 
            onCategoryChange={handleCategoryChange}
            />

        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
    },
})