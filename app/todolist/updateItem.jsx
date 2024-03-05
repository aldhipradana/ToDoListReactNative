import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { itemHandler } from '../../db/itemHandler';
import ItemComponent from '../../components/itemComponent';

export default function updateItem () {
    const params = useLocalSearchParams()
    const [itemId, setItemId] = useState(params.id);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');

    const handleTitleChange = (text) => {
        setTitle(text);
    }

    const handleDescChange = (text) => {
        setDesc(text);
    }

    const handleCategoryChange = (text) => {
        setCategory(text);
    }

    useEffect(() => {
        console.log('Details Page Loaded');
        getDetail(itemId);
    }, []);

    const getDetail = () => {
    console.log('Item Id: ', itemId);
    itemHandler.getItemByIndex(itemId).then((item) => {
        console.log('Item: ', item);
        setTitle(item.title);
        setDesc(item.desc);
        setCategory(item.category);
        setStatus(item.status);
    }).catch((e) => {
        console.log('Error on getItemByIndex: ', e);
    });
    }

    const updateHandler = () => {
        console.log('Update');
        const item = {
            title: title,
            desc: desc,
            category: category,
            status: status,
        }

        itemHandler.updateItemByIndex(itemId, item).then((res) => {
            console.log('Item Updated: ', res);
            router.dismiss();
        }).catch((e) => {
            console.log('Error on updateTodoItem: ', e);
        });
    }

  return (
    <>
        <Stack.Screen options={{
            title: 'Update Item',
            headerRight: () => <Button title="Save" onPress={updateHandler} />,
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