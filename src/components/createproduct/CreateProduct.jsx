import React, { Component } from "react"
import Service from "./CreateProductService"
import './../../css/createproduct.css'


class CreateProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            produto: {}, 
            message: ''
        }
        this.Service = new Service()
    }

    async componentDidMount() {
        await this.getUser()        
    }

    async getUser() {
        await this.Service.getUser().then(
            ({ data }) => this.setState({user: data}),
            (error) => console.log(error)
        )
    }
    

    salvarItem() {
        const formData = new FormData()
        formData.append("descricao", this.state.descricao)
        formData.append("preco", this.state.preco)
        formData.append("foto", this.state.foto[0])

        this.Service.salvarItem(formData).then(
            ({ data }) => this.setState({message: `O produto ${data.descricao} foi salvo com sucesso!`}),
            (error) => console.log(error)
        )
    }


    render() {
        return (
            <div className="container-create-product">
                <div className="crud-box">
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
                                <h4>{this.state.message}</h4>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
    )
    }
}

export default CreateProduct