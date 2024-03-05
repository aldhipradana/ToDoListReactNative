import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { getItemByIndex, itemHandler, toDoItemsKey } from '../../db/itemHandler'

const details = () => {
  const params = useLocalSearchParams()
  const [itemId, setItemId] = useState(params.id);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');  

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

  const handleDone = () => {
    console.log('Done');
    const item = {
      title: title,
      desc: desc,
      category: category,
      status: 'done',
    }

    itemHandler.updateItemByIndex(itemId, item).then((res) => {
      console.log('Item Updated: ', res);
      router.dismiss();
    }).catch((e) => {
      console.log('Error on updateTodoItem: ', e);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>To do with id: {itemId}</Text> */}

      <Text style={styles.detailTitle}>Title:</Text>
      <Text style={styles.itemTitle}>{title}</Text>

      <Text style={styles.detailTitle}>Description:</Text>
      <Text style={styles.itemDesc}>{desc}</Text>
      
      {/* Make a floating button */}
      <TouchableOpacity style={styles.doneFloatingButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default details

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  detailTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  itemTitle: {
    fontSize: 20,
    marginBottom: 15,
  },

  itemDesc: {
    fontSize: 20,
  },

  doneFloatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4cd964',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  doneButtonText: {
    fontSize: 20,
    color: '#fff',
  }
})