import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ToDoPostForm from '../component/ToDoPostForm'
import { Context } from '../context/ToDoContext'

const CreateScreen = ({navigation}) => {

  const { addToDoPost } = useContext(Context)

  return (
    <ToDoPostForm
      onSubmit={(title, content) => {
        addToDoPost(title, content, () => {
          navigation.navigate("Home Screen")
        })
      }}
    />
  )
}

export default CreateScreen

const styles = StyleSheet.create({})