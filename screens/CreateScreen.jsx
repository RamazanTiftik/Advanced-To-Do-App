import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ToDoPostForm from '../component/ToDoPostForm'
import { Context } from '../context/ToDoContext'

const CreateScreen = ({ navigation }) => {

  const { postToDoQuests } = useContext(Context)

//kayıt olmuyor en son burda kaldım bir de delete kaldı

  return (
    <View style={styles.backgroundStyle}>
      <ToDoPostForm
        onSubmit={(title, description, startDate, endDate, categoryId, priorityId, status, typeID, questType) => {
          console.log("Form data received", { title, description, startDate, endDate, categoryId, priorityId, status, typeID, questType })
          categoryId=3
          priorityId=1
          status=true
          typeID=1
          questType=null
          startDate='123'
          endDate='2324'

          console.log("data received", { title, description, startDate, endDate, categoryId, priorityId, status, typeID, questType })

          postToDoQuests( title, description, categoryId, priorityId, status, typeID, startDate, endDate, questType, () => {
            navigation.navigate("Home Screen") // Başarıyla kaydettikten sonra anasayfaya yönlendir
          })
        }}
      />
    </View>
  )
}

export default CreateScreen

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "#f7f6f6",
    flex: 1,
    paddingHorizontal: 20, // Sol ve sağ kenarlardan boşluk
    paddingTop: 20, // Üstten biraz boşluk
  }
})
