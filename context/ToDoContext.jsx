import React, { act, Children, createContext, useReducer, useState } from "react";
import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

//const ToDoContext = React.createContext()

const toDoReducer = (state, action) => {
    switch (action.type) {

        /*
        case "add_toDoAction":
            return [
         ...state,
           {
                                    id: Math.floor(Math.random() * 999999),
                                    title: action.payload.title,
                                    content: action.payload.content
            }
            ]
        */

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

        case "get_toDoPosts":
            console.log("4 ", action.payload);
            const categories = action.payload.map((item) => ({
                id: item.categoryId,
                name: item.categoryName,
            }));
            console.log("Categories:", categories);
            return categories;

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


/*
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
*/

//API
const postToDoPost = (dispatch) => {
    return async (title, content, callback) => {
        const response = await jsonServer.post("/toDoPost", { title, content })
        if (callback) {
            callback()
        }
    }
}

const getToDoPost = (dispatch) => {
    /*
        return async () => {
            const response = await jsonServer.get("/toDoPost")
            dispatch({ type: "get_toDoPosts", payload: response.data })
        }
    */
    return async () => {
        try {

            const response = await jsonServer.get("/api/Category/")
            console.log("Item:", response.data);
            dispatch({ type: "get_toDoPosts", payload: response.data })

            /*
            response.data.forEach((item) => {
                console.log("Item:", item);
                dispatch({ type: "get_toDoPosts", payload: item })
            });
            */

            /* if (dispatch) {
                 dispatch({ type: "get_toDoPosts", payload: response.data });
             } else {
                 console.warn("Dispatch işlevi tanımlı değil!");
             }
             dispatch({ type: "get_toDoPosts", payload: response.data })
             */

        } catch (error) {
            console.log(error)
        }

    }
}

const editToDoPost = (dispatch) => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/toDoPost/${id}`, { title, content })

        dispatch({ type: "edit_toDoAction", payload: { id, title, content } })
        if (callback) {
            callback()
        }
    }
}

const deleteToDoPost = (dispatch) => {
    return async (id) => {
        const response = await jsonServer.delete(`/toDoPost/${id}`)
        dispatch({ type: "delete_toDoPosts", payload: response.data })
    }
}


export const { Context, Provider } = createDataContext(
    toDoReducer,
    { addToDoPost, deleteToDoPost, editToDoPost, getToDoPost, postToDoPost },
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