import React, { Component } from "react"
import HomeService from "../services/HomeService"


class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {produtos: [], produto: {}}

        this.Service = new HomeService()      
        this.url = `http://127.0.0.1:10000`  
    }

    async componentDidMount() {
        await this.getUser()
        await this.getProdutos()
    }

    async getProdutos() {
        await this.Service.getProdutos().then(
            ({ data }) => this.setState({produtos: data}),
            (error) => console.log(error)
        ) 
    }

    async getUser() {
        await this.Service.getUser().then(
            ({ data }) => this.setState({user: data}),
            (error) => console.log(error)
        )
    }

    salvarItem() {
        console.log(this.state.foto)
        const formData = new FormData()
        formData.append("descricao", this.state.descricao)
        formData.append("preco", this.state.preco)
        formData.append("foto", this.state.foto[0])

        this.Service.salvarItem(formData).then(
            ({ data }) => {
                this.state.produtos.unshift(data)
                this.setState({produtos: this.state.produtos})
            },
            (error)    => console.log(error)
        )
    }


    render() {
        return (
            <div className="container mt-4 mb-4">
                <div className="p-grid">
                    <h3>Criar Produto</h3>
                    <div className="p-col-2">
                    <form >
                        <div  >
                            <div className="form-outline mb-4">
                            <input value={this.state.descricao} type="email" onChange={({ target }) => this.setState({descricao: target.value})} className="form-control" />
                            <label className="form-label" >Descrição</label>
                            </div>

                            <div className="form-outline mb-4">
                            <input value={this.state.preco} type="number" onChange={({ target }) => this.setState({preco: target.value})} className="form-control" />
                            <label className="form-label">Preço</label>
                            </div>
                            <div className="form-outline mb-4">
                            <input accept="image/*"  type="file" onChange={({ target }) => this.setState({foto: target.files})} className="form-control" />
                            <label className="form-label">Foto</label>
                            </div>
                            
                            <button type="button" onClick={() => this.salvarItem()} className="btn btn-primary btn-block mb-4">Salvar</button>
                        </div>
                    </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h3 className="mb-4">Produtos</h3>
                        <p>Abaixo todos os seus pedidos realizados na loja.</p>

                        <div className="table-responsive">
                            <table className="table table-striped">
                                <tr>
                                    <th scope="col">Imagem</th>
                                    <th scope="col">Descrição</th>
                                    <th scope="col">Preço</th>
                                </tr>

                              {this.state.produtos.map(
                                (produto, index) => (
                                <tr key={index}>
                                    <td><img src={produto.foto} width={50} height={50} alt="" /></td>
                                    <td>{produto.descricao}</td>
                                    <td>{produto.preco}</td>
                                </tr> 
                                )
                              )}

                            </table>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Home