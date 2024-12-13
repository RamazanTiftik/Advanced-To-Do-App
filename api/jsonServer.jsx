import axios from "axios"

export default axios.create({
    //baseURL: "https://651c-178-240-158-184.ngrok-free.app"
    //baseURL: "http://localhost:5210"
    //baseURL: "http://127.0.0.1:5210"
    baseURL: "http://10.0.2.2:5210"
})