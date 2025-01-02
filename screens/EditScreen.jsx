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
    <View style={styles.backgroundStyle}>
      <ToDoPostForm
        initialValues={{
          title: toDoPost.title,
          content: toDoPost.description,
          startDate: toDoPost.startDate,
          endDate: toDoPost.endDate,
          categoryId: toDoPost.categoryId
        }}
        onSubmit={(title, description) => {
          editToDoPost(id, title, description, () => {
            navigation.navigate("Home Screen")
          })
        }}
      />
    </View>
  )
}

export default EditScreen

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#f7f6f6",
    flex: 1,
    paddingHorizontal: 20, // Sol ve sağ kenarlardan boşluk
    paddingTop: 20, // Üstten biraz boşluk
  }
})
