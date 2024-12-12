import React, { act, Children, createContext, useReducer, useState } from "react";
import createDataContext from "./createDataContext";

//const ToDoContext = React.createContext()

const toDoReducer = (state, action) => {
    switch (action.type) {
        case "add_toDoAction":
            return [
                ...state,
                {
                    id: Math.floor(Math.random() * 999999),
                    title: action.payload.title,
                    content: action.payload.content
                }
            ]

        case "delete_toDoAction":
            return state.filter((toDoPost) => {
                toDoPost.id !== action.payload // gönderdiğimiz payload içerisindeki id olmayanları listeye ekle
                //yani id aynı olanları eklemeyerek silmiş oluyoruz
            })

        case "edit_toDoAction":
            return state.map((toDoPost) => { //mapleyerek içine giriyoruz
                return toDoPost.id === action.payload.id ?  //şuanki elemanın id'si ile payload'daki aynı ise
                action.payload : //payload'ın içindeki değerleri ata
                toDoPost //değilse toDoPost yani elemanın kendisini dön
            })

        default:
            return state
    }
}

const addToDoPost = (dispatch) => {
    return (title, content, callback) => { //callback func -> yolladığımız geri dön methodunu burda çağıyoruz
        dispatch({ type: "add_toDoAction", payload: { title, content } })
        if (callback) {
            callback()
        }
    }
}

const deleteToDoPost = (dispatch) => {
    return (id) => {
        dispatch({ type: "delete_toDoAction", payload: id })
    }
}

const editToDoPost = (dispatch) => {
    return (id, title, content, callback) => {
        dispatch({ type: "edit_toDoAction", payload: { id, title, content } })
        if (callback) {
            callback()
        }
    }
}

export const { Context, Provider } = createDataContext(
    toDoReducer,
    { addToDoPost, deleteToDoPost, editToDoPost },
    []
)


/*
export const ToDoProvider = ({ children }) => {

    //const [toDoPosts, setToDoPosts] = useState([{ title: "JavaScript" }, { title: "React" }])

    const [toDoPosts, dispatch] = useReducer(toDoReducer, [
        { title: "JavaScript" },
        { title: "React" }
    ])

    const addToDoPost = () => {
        // setToDoPosts([...toDoPosts, { title: "Vue.js" }])
        dispatch({ type: "add_toDoAction" })
    }

    return <ToDoContext.Provider value={{ data: toDoPosts, addToDoPost }}> {children} </ToDoContext.Provider>
}

export default ToDoContext

*/