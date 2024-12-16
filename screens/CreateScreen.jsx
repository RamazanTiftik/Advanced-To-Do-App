import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ToDoPostForm from '../component/ToDoPostForm'
import { Context } from '../context/ToDoContext'

const CreateScreen = ({ navigation }) => {

  const { addToDoPost, postToDoPost } = useContext(Context)

  return (
    <ToDoPostForm
      onSubmit={(title, content) => {
        /*
        postToDoPost(title, content, () => {
          navigation.navigate("Home Screen")
        })
          */

        
        console.log("girdi")
        postToDoPost(6, "test", [], () => {
          navigation.navigate("Home Screen")
        })
      }}
    />
  )
}

export default CreateScreen

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#f7f6f6",
    flex: 1
  }
})