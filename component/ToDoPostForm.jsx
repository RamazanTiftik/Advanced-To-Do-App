import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const ToDoPostForm = ({ onSubmit, initialValues }) => {

    const [title, setTitle] = useState(initialValues ? initialValues.title : "")
    const [content, setContent] = useState(initialValues ? initialValues.content : "")

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