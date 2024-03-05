import { Button, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { Stack, router } from 'expo-router'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { itemHandler, toDoItemsKey } from '../../db/itemHandler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { observer } from 'mobx-react-lite'

const list = () => {
  const addItem = () => {
    console.log('Add Item')
    router.navigate('todolist/addItem')
  }

  const [todoItems, setTodoItems] = useState([]);

  const [count, setCount] = useState(0);


  useEffect(() => {
    console.log("List Page Loaded")
    itemHandler.setObservableOnInit();
  }, []);

  const ObserveTodo = observer(({ itemHandler }) => 
    <View>
      {itemHandler.getObservableToDoLists() === null? <Text style={styles.todoTitle}> No To Do Items </Text> : null}
      {itemHandler.getObservableToDoLists()?.map((item, index) => (
        <>
        <TouchableOpacity style={[styles.itemCard, item.status === 'done'? styles.cardGreen : '' ,]} onPress={() => router.navigate({pathname: "todolist/details", params:{id: index}})} > 
          <Text style={[styles.itemTitle, item.status === 'done'? styles.titleWhite : '' ,]}> {`${index+1}. `} </Text>
          <Text style={[styles.itemTitle, item.status === 'done'? styles.titleWhite : '' ,]}> {item.title} </Text>
          
        </TouchableOpacity> 
        </>
      ))}
    </View>
  );

  return (
    <>
    <Stack.Screen 
      options={{
        title: ' ',
        headerShown: true,
        headerRight: () => <Button title="+ Add Item" onPress={addItem} />,

      }}
    />
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <ObserveTodo itemHandler={itemHandler} />
        {/* { todoItems !== null? <ObserveTodo itemHandler={itemHandler} /> : <Text style={styles.todoTitle}> No To Do Items </Text> } */}
      </ScrollView>

    </SafeAreaView>
    </>
    
  )
}

export default list

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollViewContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
  },

  itemCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  itemTitle: {
    fontSize: 20,
  },

  itemDesc: {
    fontSize: 15,
  },

  button: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
  },

  todoTitle: {
    fontSize: 20,
    marginBottom: 10,
  },

  cardGreen: {
    backgroundColor: '#4cd964',
  },

  titleWhite: {
    color: '#fff',
  }

})