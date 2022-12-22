import React, { Component } from "react"
import RequestService from "./RequestsService"
import './../../css/requests.css'
import { Navigate } from "react-router-dom"


class Requests extends Component {
    constructor(props) {
        super(props)

        this.state = {
            requests: [], 
            requestItens: [], 
            request_id: null,
            myCart: false
        }
        this.Service = new RequestService() 
        this.url = 'http://127.0.0.1:10000'
    }

    componentDidMount() {
        this.getUser()
    }


    async getUser() {
        await this.Service.getUser().then(
            ({ data }) => {
                this.setState({user: data})
                this.getRequests(data.id)
            },
            (error) => console.log(error)
        )
    }

    getRequests(user_id) {
        this.Service.getRequestsByUser(user_id).then(
            ({ data }) => this.setState({requests: data})
        )
    }

    async viewRequest(request_id) {
        await this.getItensByRequestId(request_id)
    }

    async getItensByRequestId(request_id) {
        
        await this.Service.getItensByRequestId(request_id).then(
            ({ data }) => {
                console.log(data)
                this.setState({requestItens: data})
            }
            )
        console.log(this.state.requestItens)
        this.setState({request_id: request_id})
    }

    toMoneyFormat(value) {
        return `R$${value.toFixed(2)}`
    }

    render() {
        return (
            
            <div className="container mt-4 mb-4">
                {this.state.myCart && (<Navigate to={'/'} />)}
                <div className="table-responsive">
                    <h3>Seus Pedidos</h3>
                    <button type="button" onClick={() => this.setState({myCart: true})} className="btn btn-primary">Seu carrinho</button>

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
                            <thead>
                                <tr>
                                    <th scope="col">Imagem</th>
                                    <th scope="col">Descrição</th>
                                    <th scope="col">Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.requestItens.map(
                                (produto, index) => (
                                    <tr key={index}>
                                        <td><img src={this.url + produto.foto} width={50} height={50} alt="" /></td>
                                        <td>{produto.descricao}</td>
                                        <td>{this.toMoneyFormat(produto.preco)}</td>
                                    </tr>
                                )
                                )
                            }
                            </tbody>
                        
                        </table>
                    </div>
                </div>)
                }
            </div>
        )
    }
}

export default Requests