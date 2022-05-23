import axios from "axios";
import store from "../store";

export default function (){
    let server = axios.create({
        baseURL:store.getters.baseUrl
    })
    return server
}
