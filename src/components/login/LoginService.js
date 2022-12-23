import api from "../../services/api"



class LoginService {
    constructor() {
        this.api = new api()
    }
    
    
    async Logar(username, password ) {
        return await this.api.axios.post(`token/`, {username, password})
    }
    
}


export default LoginService