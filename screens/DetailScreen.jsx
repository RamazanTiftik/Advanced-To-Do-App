import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/ToDoContext'

const DetailScreen = ({ route }) => {

  const { state, getToDoCategory } = useContext(Context) //distructing & state -> toDo dizisi
  const [category, setCategory] = useState({});

  const toDoPost = state.find((toDoItem) => {
    return toDoItem.id === route.params.id
  })
  
  useEffect(() => {
    const fetchCategory = async () => {
      if (toDoPost?.id) {
        const categoryData = await getToDoCategory(toDoPost.id); // Veriyi al
        setCategory(categoryData); // Kategoriyi state'e ata
      }
    };

    fetchCategory();
  }, [toDoPost?.id, getToDoCategory]); 
console.log(category)

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.labelStyle}>Başlık:</Text>
        <Text style={styles.contentStyle}>{toDoPost.title}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.labelStyle}>İçerik:</Text>
        <Text style={styles.contentStyle}>{toDoPost.description}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.labelStyle}>Kategori:</Text>
        <Text style={styles.contentStyle}>{"Kariyer"}</Text>
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
    backgroundColor: "#f7f6f6",
    flex: 1, // Ekranı daha iyi sarması için
  },
  container: {
    borderWidth: 1,
    marginBottom: 15, // Daha sıkışık
    borderRadius: 15, // Daha yuvarlak kenarlar
    alignItems: "flex-start", // Textleri sola hizala
    width: "90%",
    paddingVertical: 10, // İçeriklerin etrafında yeterli boşluk
    paddingHorizontal: 15, // Yanlardan boşluk ekle
    backgroundColor: "#fff", // Arka plan rengi beyaz
  },
  labelStyle: {
    fontSize: 22, // Başlık boyutunu biraz küçült
    fontWeight: "bold", // Daha belirgin başlık
    color: "#333", // Daha net bir renk
  },
  contentStyle: {
    fontSize: 18,
    color: "#555", // Yazıyı daha okunabilir yapmak için gri ton
    marginTop: 5, // Başlık ile içerik arasında boşluk
  },
  timeMainContainer: {
    flexDirection: "row",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 15,
    alignItems: "center",
    width: "90%",
    justifyContent: "flex-start",
    paddingVertical: 10,
    paddingLeft: 20,
    backgroundColor: "#fff", // Arka planı beyaz tut
  },
  timeContainer: {
    marginRight: 20, // Zaman etiketleri arasındaki boşluğu ayarla
  },
  timeLabelStyle: {
    fontSize: 18,
    color: "#333", // Zaman etiketleri için daha koyu bir renk
    fontWeight: "500", // Etiketleri daha belirgin yapmak için
  },
  timeStyle: {
    fontSize: 18,
    color: "#555", // Zaman değerini daha hafif tut
  },
})
