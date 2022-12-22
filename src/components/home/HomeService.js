import api from "../../services/api"


class HomeService {
    constructor() {
        this.api = new api()
    }
    async getUser() {
        return await this.api.axios.get(`user/get_user/`)
    }
    
    async getProdutos() {
        return await this.api.axios.get(`produto/`)
    }
    async salvarCompra(user) {
        return await this.api.axios.post(`compra/`, {user})
    }

    async salvarItensCompra(itens, compra_id, user_id) {
        return await this.api.axios.post(`compraproduto/save_itens_compra/`, {itens, compra_id, user_id})
    }
    

}


export default HomeService