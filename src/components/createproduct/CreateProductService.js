import api from "../../services/api"
import axios from "axios"
import { getToken } from "../../services/auth"


class Service {

    constructor() {
        this.api = new api()
    }

    async getUser() {
        return await this.api.axios.get(`user/get_user/`)
    }

    async salvarItem(item) {
        const instance = axios.create({
            baseURL: process.env.REACT_APP_API_CORE_URL,
            headers: {
              'Content-Type': "multipart/form-data",
              Accept: 'application/json',
              Authorization: `Bearer ${getToken()}` 
            }
        })
        return await instance.post(`produto/`, item)
    }
}

export default Service