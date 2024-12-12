import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../context/ToDoContext'

const DetailScreen = ({ route }) => {

  const { state } = useContext(Context) //distructing & state -> toDo dizisi

  const toDoPost = state.find((toDoItem) => {
    return toDoItem.id === route.params.id
  })

  return (
    <View style={styles.mainContainer}>

      <View style={styles.container}>
        <Text style={styles.labelStyle}>Başlık:</Text>
        <Text style={styles.contentStyle}>{toDoPost.title}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.labelStyle}>İçerik:</Text>
        <Text style={styles.contentStyle}>{toDoPost.content}</Text>
      </View>

    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    marginTop: 10
  },
  container: {
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 30,
    alignItems: "center",
    width: "80%"
  },
  labelStyle: {
    fontSize: 25
  },
  content: {
    fontSize: 18
  }
})