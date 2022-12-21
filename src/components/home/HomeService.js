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
    async salvarCompra(user_id) {
        return await this.api.axios.post(`compra/`, {user_id})
    }

    async salvarItensCompra(itens, compra_id) {
        return await this.api.axios.post(`compraprodutos/save_compras_and_itens/`, {itens, compra_id})
    }
    

}


export default HomeService