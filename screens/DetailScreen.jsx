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
      {/* 
      {state.forEach(element => {
              {console.log("array "+element)}
      })}
*/}
      {/*
      {state.map((element, index) => (
        <Text key={index}>array {JSON.stringify(element.title)}</Text>
      ))}
 */}

      <View style={styles.container}>
        <Text style={styles.labelStyle}>Başlık:</Text>
        <Text style={styles.contentStyle}>{toDoPost.title}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.labelStyle}>İçerik:</Text>
        <Text style={styles.contentStyle}>{toDoPost.description}</Text>
      </View>

      <View style={styles.timeMainContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeLabelStyle}>Başlangıç Tarihi:</Text>
          <Text style={styles.timeStyle}>{toDoPost.startDate}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeLabelStyle}>Bitiş Tarihi:</Text>
          <Text style={styles.timeStyle}>{toDoPost.endDate}</Text>
        </View>
      </View>



    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#f7f6f6"
  },
  container: {
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 30,
    alignItems: "center",
    width: "90%"
  },
  labelStyle: {
    fontSize: 25
  },
  contentStyle: {
    fontSize: 18
  },
  timeContainer: {
    marginRight: 70
  },
  timeLabelStyle: {

  },
  timeStyle: {

  },
  timeMainContainer: {
    flexDirection: "row",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 30,
    alignItems: "center",
    width: "90%",
    justifyContent: "flex-start",
    paddingVertical: 5,
    paddingLeft: 20
  }
})