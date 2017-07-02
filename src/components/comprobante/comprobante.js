import React,{Component} from 'react';
import {Link} from 'react-router'
import {Col,Grid,Row,Button,Table} from 'react-bootstrap';
import './comprobante.css'

let dev = 'http://localhost:4000';
let prod = 'https://dowhile-videomania.herokuapp.com';

class Search extends Component {
    constructor(props){
        super(props);

        this.state = {
            api:prod,
            commerce: {},
            cliente: {}
        }
    }

    obtenerDatosCompra(){
        fetch(`${this.state.api}/datoscomercio/${this.props.params.cod}`)
        .then(res => res.json())
        .then(response => {
            console.log(response)
            this.setState({
                commerce: response.commerce,
                cliente: response.client
            })
            console.log(this.state.commerce)
            console.log(this.state.cliente)
        })
    }

    up(){
        window.scrollTo(0, -15);
    }

    componentWillMount(){
        this.up();
        this.obtenerDatosCompra();
    }


    render(){
        function format(valor){
            if(valor === null){
                valor = 0;
                return valor;
            }
            else {
                var num = valor.toString().replace(/\./g,'');
                if(!isNaN(num)){
                    num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
                    num = num.split('').reverse().join('').replace(/^[\.]/,'');
                    valor = num;
                    return valor
                } else { 
                    console.log('Solo se permiten numeros');
                    valor = valor.replace(/[^\d\.]*/g,'');
                }
            }
        }
        return(
            <Grid className="Comprobante">
                <Row>
                    <Col xs={12} md={5} className="mgc">
                        <h2>Estimado {this.state.cliente.name} {this.state.cliente.apellido} </h2>
                        <br/>
                        <h4>Estos son los datos de su compra:</h4>
                        <br/>
                        <Table responsive>
                            <thead>
                                <tr className="text-center">
                                    <th>Cod. transaccion</th>
                                    <th>Cod. autorización</th>
                                    <th>Total de la compra</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.commerce.buyOrder}</td>
                                    <td>{this.state.commerce.authCode}</td>
                                    <td>{this.state.commerce.amount}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <br/>   
                        <h3>Gracias por su compra</h3>
                        <br/>
                        <br/>
                    </Col>
                    <Col xs={12} md={6}>
                        <img src="img/sello.png" alt="" className="img-responsive img-center img-top"/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Search;