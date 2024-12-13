import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Context } from '../context/ToDoContext'
import { Feather } from "@expo/vector-icons"

const HomeScreen = ({ navigation }) => {

  const { state, addToDoPost, deleteToDoPost, getToDoPost } = useContext(Context)

  //useEffect -> ekradaki veriyi bir kere çekmesini sağlıyor, fokus olduğunda
  useEffect(() => {
    getToDoPost()

    navigation.addListener("focus", () => {
      getToDoPost()
    })
    //sildikten sonra liste güncellenmiyor
  }, [])

  return (
    <View>

      <FlatList
        data={state}
        keyExtractor={(toDoPost) => toDoPost.id}
        renderItem={({ item }) => {
          console.log("5 "+ item)
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Detail Screen", { id: item.id })
              }}
            >

              <View style={styles.row}>

                <Text style={styles.titleStyle}>{item.name}</Text>

                <TouchableOpacity
                  onPress={() => {
                    deleteToDoPost(item.id)
                  }}
                >
                  <Feather name="trash" size={24} color="black" />
                </TouchableOpacity>

              </View>

            </TouchableOpacity>
          )
        }}
      />

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderColor: "gray"
  },
  titleStyle: {

  }
})