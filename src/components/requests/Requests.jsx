import React, { Component } from "react"
import RequestService from "./RequestsService"
import './../../css/requests.css'


class Requests extends Component {
    constructor(props) {
        super(props)

        this.state = {requests: [], requestItens: [], request_id: null}
        this.Service = new RequestService() 
    }

    async componentDidMount() {
        await this.getUser()
        await this.getRequests()
    }


    async getUser() {
        await this.Service.getUser().then(
            ({ data }) => this.setState({user: data}),
            (error) => console.log(error)
        )
    }

    async getRequests() {
        await this.Service.getRequestsByUser(this.state.user.id).then(
            ({ data }) => this.setState({requests: data})
        )
    }

    viewRequest(request_id) {
        this.getItensByRequestId(request_id)
    }

    async getItensByRequestId(request_id) {
        this.setState({request_id: request_id})
        await this.Service.getItensByRequestId(request_id).then(
            ({ data }) => this.setState({requestItens: data})
        )
    }


    render() {
        return (
            
            <div className="container mt-4 mb-4">
                <div className="table-responsive">
                    <h3>Seus Pedidos</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Nº</th>
                            </tr>
                        </thead>
                        {this.state.requests.map(
                        (item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td><i onClick={() => this.viewRequest(item.id)} className="fa-solid icon-eye fa-eye"></i></td>
                        </tr>
                        )
                        )}
                    </table>
                </div>
                {this.state.request_id && (<div>
                    <h3 className="mb-4">{this.state.request_id}º pedido detalhado</h3>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <tr>
                                <th scope="col">Imagem</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Preço</th>
                            </tr>
                        {this.state.requestItens.map(
                            (produto, index) => (
                            <tr key={index}>
                                <td><img src={produto.foto} width={50} height={50} alt="" /></td>
                                <td>{produto.descricao}</td>
                                <td>{this.toMoneyFormat(produto.preco)}</td>
                            </tr>
                            )
                        )}
                        </table>
                    </div>
                </div>)
                }
            </div>
        )
    }
}

export default Requests