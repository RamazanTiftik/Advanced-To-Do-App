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
      initialValues={{ title: toDoPost.title, content: toDoPost.content }}
      onSubmit={(title, content) => {
        editToDoPost(id, title, content, () => {
          navigation.navigate("Home Screen")
        })
      }}
    />
  )
}

export default EditScreen

const styles = StyleSheet.create({})