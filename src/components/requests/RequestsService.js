import api from "../../services/api"



class RequestService {
    constructor() {
        this.api = new api()
    }

    
    async getUser() {
        return await this.api.axios.get(`user/get_user/`)
    }
    
    async getRequestsByUser(user_id) {
        return await this.api.axios.post(`compra/get_requests_by_user/`, {user_id})
    }

    async getItensByRequestId(request_id) {
        return await this.api.axios.post(`compraproduto/get_itens_by_request_id/`, {request_id})
    }
    
}


export default RequestService