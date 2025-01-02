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
            //{ console.log("editting") }
            return state.map((toDoPost) => { //mapleyerek içine giriyoruz
                return toDoPost.id === action.payload.id ?  //şuanki elemanın id'si ile payload'daki aynı ise
                    action.payload : //payload'ın içindeki değerleri ata
                    toDoPost //değilse toDoPost yani elemanın kendisini dön
            })


        //******GET******

        //quest'lerin çekildiği yer
        case "get_toDoPosts":
            //alttaki dizinin elemanlarını id,name vs değiştereerk istediğin veriler kullanılabilir
            const quests = action.payload.map((item) => ({
                id: item.questsId,
                title: item.title,
                description: item.description,
                categoryId: item.categoryId,
                priorityId: item.priorityId,
                status: item.status,
                typeID: item.typeID,
                startDate: item.startDate,
                endDate: item.endDate,
                questType: item.questType
            }));
            return quests;


        case "get_priority":
            const prioritys = action.payload.map((item) => ({
                priorityId: item.priorityId,
                priorityName: item.priorityName,
            }));
            return prioritys;


        case "get_categorys":
            const categorys = action.payload.map((item) => ({
                categoryId: item.categoryId,
                categoryName: item.categoryName,
                quests: item.quests
            }));
            return categorys;

        //////
        case "get_toDoCategory":
            const category = action.payload
            console.log("12312", category)
            return category;


        case "get_timers":
            const timers = action.payload.map((item) => ({
                timersId: item.timersId,
                time: item.time,
                startTime: item.startTime,
                endTime: item.endTime,
                questsId: item.questsId
            }));
            return timers;


        case "get_type":
            const types = action.payload.map((item) => ({
                typeID: item.typeID,
                typeName: item.typeName,
            }));
            return types;


        default:
            return state || []
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
/*
const postToDoPost = (dispatch) => {
    return async (title, content, callback) => {
        const response = await jsonServer.post("/toDoPost", { title, content })
        if (callback) {
            callback()
        }
    }
}
*/

const postToDoPost = (dispatch) => {
    return async (categoryId, categoryName, quests, callback) => {
        const response = await jsonServer.post("/api/Category", { categoryId, categoryName, quests })
        if (callback) {
            callback()
        }
    }
}


const postToDoCategory = (dispatch) => {
    return async (categoryId, categoryName, quests, callback) => {
        const response = await jsonServer.post("/api/Category", { categoryId, categoryName, quests })
        if (callback) {
            callback()
        }
    }
}


const postToDoType = (dispatch) => {
    return async (typeID, typeName, callback) => {
        const response = await jsonServer.post("/api/Type", { typeID, typeName })
        if (callback) {
            callback()
        }
    }
}


const postToDoPriority = (dispatch) => {
    return async (priorityId, priorityName, callback) => {
        const response = await jsonServer.post("/api/Priority", { priorityId, priorityName })
        if (callback) {
            callback()
        }
    }
}


const postToDoQuests = (dispatch) => {
    return async (questsId, title, description, categoryId, priorityId, status, typeID, startDate, endDate, questType, callback) => {
      try {
        const response = await jsonServer.post("/api/Quests", {
          title,
          description,
          categoryId,
          priorityId,
          status,
          typeID,
          startDate,
          endDate,
          questType
        })
        console.log('Quest successfully created:', response.data);
        if (callback) {
          callback()
        }
      } catch (error) {
        console.error('Error creating quest:', error)
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

            const response = await jsonServer.get("/api/Quests")
            //  console.log("Item:", response.data);
            dispatch({ type: "get_toDoPosts", payload: response.data })

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

const getToDoCategory = (dispatch) => {
    return async (id) => {
        try {
            console.log("girdi")
            const response = await jsonServer.get(`/api/category/${id}`); 
            dispatch({ type: "get_category", payload: response.data });
            console.log("girdi3")
            return response.data; // Kategoriyi döndür
        } catch (error) {
            console.error(error);
        }
    };
};

const editToDoPost = (dispatch) => {
    return async (id, title, description, callback) => {
        console.log("func")
        try {
            // Mevcut veriyi API'dan çek
            const response = await jsonServer.get(`/api/Quests/${id}`);
            const existingData = response.data;

            // Güncelle ve gönder
            await jsonServer.put(`/api/Quests/${id}`, {
                ...existingData,
                title,
                description
            });

            if (callback) {
                callback()
            }

        } catch (error) {
            console.error("API isteğinde bir hata oluştu:", error.message)
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
    { addToDoPost, deleteToDoPost, editToDoPost, getToDoPost, postToDoPost, getToDoCategory, postToDoQuests },
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