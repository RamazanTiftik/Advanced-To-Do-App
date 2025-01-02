import { Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/ToDoContext'
import { Feather } from "@expo/vector-icons"
import jsonServer from '../api/jsonServer'

const HomeScreen = ({ navigation }) => {
  const { state, addToDoPost, deleteToDoPost, getToDoPost } = useContext(Context)

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categories, setCategories] = useState([]) // Kategoriler state'i
  const [loading, setLoading] = useState(true) // Loading durumu

  // Kategorileri API'den çekme
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await jsonServer.get('/api/category');
        setCategories(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
    getToDoPost()

    navigation.addListener("focus", () => {
      getToDoPost()
    })
  }, [])

  // Kategoriyi seçtiğinde state güncelle
  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  const filteredQuests = selectedCategory
    ? state.filter(quest => quest.categoryId === selectedCategory) // Seçilen kategoriye ait tüm quests'leri al
    : []; // Seçili kategori yoksa boş bir liste döndür

  return (
    <View style={styles.backgroundStyle}>
      {loading ? (
        <Text>Yükleniyor...</Text>
      ) : (
        <ScrollView
          horizontal
          contentContainerStyle={styles.categoryContainer}
          showsHorizontalScrollIndicator={false} // Kaydırma çubuğunu gizler
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === category.categoryId && styles.selectedCategoryButton
              ]}
              onPress={() => handleCategorySelect(category.categoryId)} // Kategoriyi seç
            >
              <Text style={styles.categoryText}>{category.categoryName}</Text> {/* Kategori ismi */}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Todo Liste */}
      <FlatList
        data={filteredQuests}
        keyExtractor={(toDoPost) => toDoPost.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Detail Screen", { id: item.id })
              }}
            >
              <View style={styles.row}>
                <Text style={styles.titleStyle}>{item.title}</Text>

                <TouchableOpacity
                  onPress={() => {
                    deleteToDoPost(item.id)
                  }}
                >
                  <Feather name="trash" size={24} color="black" style={styles.trashIcon} />
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
  categoryContainer: {
    flexDirection: 'row',
    paddingVertical: 5, // Daha az dikey boşluk
    paddingHorizontal: 5, // Daha az yatay boşluk
    backgroundColor: '#fff',
    justifyContent: 'space-between', // Aralarındaki boşluğu azalt
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 45, // Yüksekliği azalt
  },
  selectedCategoryButton: {
    backgroundColor: '#007bff'
  },
  categoryButton: {
    paddingVertical: 5, // Daha az dikey padding
    paddingHorizontal: 15, // Yatay paddingi optimize et
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    height: 30, // Buton yüksekliğini küçült
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    paddingHorizontal: 10, // Daha küçük yatay padding
    paddingVertical: 10, // Dikey paddingi azalt
    borderColor: "#ddd",
    backgroundColor: "#fff", // Arka planı beyaz tut,
    alignItems: "center"
  },
  titleStyle: {
    fontSize: 16, // Başlık font büyüklüğünü biraz küçült
    color: '#333', 
    fontWeight: '500',
  },
  trashIcon: {
    padding: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    marginLeft: 8, // Çöp kutusunun sol boşluğunu biraz azalt
  },
})

