import React, { Component } from "react"
import HomeService from "./HomeService"
import './../../css/home.css'



class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {products: [], cart: [], message: ''}
        this.Service = new HomeService()      
    }
    
    async componentDidMount() {
        this.getProducts()
        await this.getUser()
    }

    async getUser() {
        await this.Service.getUser().then(
            ({ data }) => this.setState({user: data}),
            (error) => console.log(error)
        )
    }

    async getProducts() {
        this.Service.getProdutos().then(
            ({ data }) => this.setState({products: data}),
            (error) => console.log(error)
        )
    }

    addInCart(produto) {
        if (this.productExistsInCart(produto)) return 
        this.setState({message: ''})


        let newCart = [...this.state.cart]
        newCart.unshift(produto)
        this.setState({cart: newCart})
    }

    productExistsInCart(product) {
        if (this.state.cart.filter(item => item.id === product.id).length > 0) {
            this.setState({message: `O produto ${product.descricao} já existe no carrinho`})
            return true
        }
        return false
    }

    removeProductFromCart(produto) {
        let newCart = this.state.cart.filter((item) => item.id !== produto.id)
        this.setState({cart: newCart})
        this.setState({message: ''})
    }

    toMoneyFormat(value) {
        return `R$${value.toFixed(2)}`
    }

    salvarCompra() {
        this.Service.salvarCompra(this.state.user.id).then(
            ({ data }) => {
                this.salvarItensCompra(data.id)
            }
        )
    }

    salvarItensCompra(compra_id) {
        this.Service.salvarItensCompra(this.state.cart, compra_id, this.state.user.id).then(
            ({ data }) => {
                this.setState({cart: []})
                console.log(data)
            },
            (error) => console.log(error)
        )
    }


    render() {
        return (
            <div className="container mt-4 mb-4">

                <div className="row">
                    <div className="col">
                        <h3 className="mb-4">Produtos</h3>

                        <div className="table-responsive">
                            <table className="table table-striped">
                                <tr>
                                    <th scope="col">Imagem</th>
                                    <th scope="col">Descrição</th>
                                    <th scope="col">Preço</th>
                                </tr>

                              {this.state.products.map(
                                (produto, index) => (
                                <tr key={index}>
                                    <td><img src={produto.foto} width={50} height={50} alt="" /></td>
                                    <td>{produto.descricao}</td>
                                    <td>{this.toMoneyFormat(produto.preco)}</td>
                                    <td onClick={() => this.addInCart(produto)}><i className="fa-solid fa-plus icon-add"></i></td>
                                </tr> 
                                )
                              )}

                            </table>
                        </div>
                        <h3>Carrinho</h3>
                        <h4>{this.state.message}</h4>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <tr>
                                    <th scope="col">Imagem</th>
                                    <th scope="col">Descrição</th>
                                    <th scope="col">Preço</th>
                                </tr>

                              {this.state.cart.map(
                                (produto, index) => (
                                <tr key={index}>
                                    <td><img src={produto.foto} width={50} height={50} alt="" /></td>
                                    <td>{produto.descricao}</td>
                                    <td>{this.toMoneyFormat(produto.preco)}</td>
                                    <td onClick={() => this.removeProductFromCart(produto)}><i className="fa-solid fa-trash icon-trash"></i></td>
                                </tr> 
                                )
                              )}

                            </table>
                        </div>
                        <button type="button" onClick={() => this.salvarCompra()} className="btn btn-success">Finalizar a compra</button>

                    </div>

                </div>
            </div>
        )
    }
}

export default Home