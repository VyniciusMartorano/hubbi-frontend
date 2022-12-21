import api from "./api"
import axios from "axios"
import { getToken } from "./auth"


class HomeService {
    constructor() {
        this.api = new api()
    }
    
    
    async getProdutos() {
        return await this.api.axios.get(`produto/`)
    }
    
    async getUser() {
        return await this.api.axios.get(`user/get_user/`)
    }

    async salvarItem(item) {
        return await axios.post(`${process.env.REACT_APP_API_CORE_URL}produto/`, item, { 
            "Content-Type": "multipart/form-data", Authorization: `Bearer ${getToken()}`})
    }
}


export default HomeService