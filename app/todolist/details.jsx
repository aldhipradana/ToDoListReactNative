import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { getItemByIndex, itemHandler, toDoItemsKey } from '../../db/itemHandler'
import { observer } from 'mobx-react-lite'
import { runInAction } from 'mobx'

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

  const handleUpdate = () => { 
    console.log('Update');
    router.navigate({pathname: 'todolist/updateItem', params: {id: itemId}});
   }

  const ObserveTodo = observer(({ itemHandler }) => 
    <View>
      <Text style={styles.detailTitle}>Title:</Text>
      <Text style={styles.itemTitle}>{itemHandler.getSelectedItem()?.title}</Text>

      <Text style={styles.detailTitle}>Description:</Text>
      <Text style={styles.itemDesc}>{itemHandler.getSelectedItem()?.desc}</Text>
    </View>
  );

  return (
    <>
    <Stack.Screen options={{ 
      title: 'Details',
      headerRight: () => <Button title="📝" onPress={handleUpdate} />,
     }} />
    <SafeAreaView style={styles.container}>
      {/* <Text>To do with id: {itemId}</Text> */}

      <ObserveTodo itemHandler={itemHandler} />
      
      {/* Make a floating button */}
      <TouchableOpacity style={styles.doneFloatingButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>


    </>
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