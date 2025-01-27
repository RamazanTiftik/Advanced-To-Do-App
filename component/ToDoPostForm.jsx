import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from "@react-native-picker/picker";
import jsonServer from "../api/jsonServer";


const ToDoPostForm = ({ onSubmit, initialValues }) => {

    const [title, setTitle] = useState(initialValues ? initialValues.title : "")
    const [content, setContent] = useState(initialValues ? initialValues.content : "")
    const [startDate, setStartDate] = useState(initialValues ? initialValues.startDate : "")
    const [endDate, setEndDate] = useState(initialValues ? initialValues.endDate : "")
    const [categoryId, setCategoryId] = useState(initialValues ? initialValues.categoryId : "")
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([])


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await jsonServer.get("/api/category")
                //console.log("Item:", response.data);
                setCategories(response.data); // API'den dönen kategorileri state'e at
                //console.log("Item22: ", categories);
            } catch (error) {
                console.error("Kategoriler çekilirken bir hata oluştu:", error.message);
            }
        };
        fetchCategories();
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.labelStyle}>Başlğı Girin:</Text>
            <TextInput
                style={styles.inputStyle}
                value={title}
                onChangeText={(text) => {
                    setTitle(text)
                }}
            />

            <Text style={styles.labelStyle}>İçeriği Girin:</Text>
            <TextInput
                style={styles.inputStyle}
                value={content}
                onChangeText={(text) => {
                    setContent(text)
                }}
            />

            <Text style={styles.labelStyle}>Başlangıç Tarihini Girin:</Text>
            <TextInput
                style={styles.inputStyle}
                value={startDate}
                onChangeText={(text) => {
                    setStartDate(text)
                }}
            />

            <Text style={styles.labelStyle}>Bitiş Tarihini Girin:</Text>
            <TextInput
                style={styles.inputStyle}
                value={endDate}
                onChangeText={(text) => {
                    setEndDate(text)
                }}
            />


            <Text style={styles.labelStyle}>Kategori Seçin:</Text>
            <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Kategori Seçiniz" value="" />
                {categories.map((cat) => (
                    <Picker.Item key={cat.id} label={cat.categoryName} value={cat.id} />
                ))}
            </Picker>


            <TouchableOpacity style={styles.btnContainer} onPress={() => onSubmit(title, content)}>

                <View style={styles.btnView}>
                    {initialValues ? (
                        <Text style={styles.btnText}>Güncelle</Text>) : (

                        <Text style={styles.btnText}>Kaydet</Text>)
                    }
                </View>

            </TouchableOpacity>

        </View>
    )
}

export default ToDoPostForm

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    labelStyle: {
        fontSize: 20,
        marginLeft: 10
    },
    inputStyle: {
        borderWidth: 1,
        margin: 10,
        borderRadius: 20,
        padding: 5,
        fontSize: 18,
        marginBottom: 15,
        paddingLeft: 10
    },
    btnContainer: {
        padding: 30
    },
    btnView: {
        backgroundColor: "green",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20
    },
    btnText: {
        color: "white",
        fontSize: 20
    }
})