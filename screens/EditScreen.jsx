import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../context/ToDoContext'
import ToDoPostForm from '../component/ToDoPostForm'

const EditScreen = ({ route, navigation }) => {

  const { state, editToDoPost } = useContext(Context) //distructing & state -> toDo dizisi
  const id = route.params.id

  const toDoPost = state.find((toDoItem) => {
    return toDoItem.id === route.params.id
  })

  return (
    <ToDoPostForm
      initialValues={{ title: toDoPost.title, content: toDoPost.description }}
      onSubmit={(title, description) => {
        editToDoPost(id, title, description, () => {
          navigation.navigate("Home Screen")
        })
      }}
    />
  )
}

export default EditScreen

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#f7f6f6",
    flex: 1
  }
})