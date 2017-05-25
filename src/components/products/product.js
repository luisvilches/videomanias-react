import React, {Component} from 'react';
import {Link} from 'react-router';
import {Grid,Row,Col,Button,Alert} from 'react-bootstrap';
import './product.css';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import '.././icons/css/font-awesome.css';
//import YouTubeCustomPlayer from 'react-custom-youtube-player';
import YouTube from 'react-youtube';



let dev = 'http://localhost:4000';
let prod = 'https://dowhile-videomania.herokuapp.com';

var arriba;

class Product extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: [],
            api:dev,
            usuario:[],
            login: false,
            price: '',
            alertVisible: false
        }
    }

    //TRAE TODA LA INFORMACION DEL USUARIO

    users(){
        fetch(`${this.state.api}/app/user/${localStorage.getItem('user')}`, {
            headers: {
                'Authorization': `Bearer ${ localStorage.getItem('token')}`, 
                'Content-Type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(data => {
            this.setState({
                usuario: data
            })
        })
    }

    intervalCartUser(){
        var api = this.state.api;
            fetch(`${api}/app/user/${localStorage.getItem('user')}`, {
            headers: {
                'Authorization': `Bearer ${ localStorage.getItem('token')}`, 
                'Content-Type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(data => {
            return data;
        })
        .then(user => {
            fetch(`${api}/user/cart/total/${user._id}`)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    shop: result.total
                })
                console.log(result)
            })
        })
    }
    // AGREGAR AL CARRO DE COMPRAS

    addToCart(){
        if(localStorage.getItem("success") === false || localStorage.getItem("success") === null){
            this.setState({alertVisible: true});
        } else {
            if(this.refs.cantidad.value === null || this.refs.cantidad.value === '' || this.refs.cantidad.value === '0'){
                alert('debes ingresar una cantidad')
            } else {
                
                let item = this.state.data.name;
                let cant = this.refs.cantidad.value;
                let price = this.state.data.price;
                let sku = this.state.data.sku;

                const formData = new FormData()
                formData.append('sku',sku)
                formData.append('cant',cant)
                formData.append('item',item)
                formData.append('price',price)

                fetch(`${this.state.api}/user/cart/${localStorage.getItem('user')}`, {
                method: 'POST',
                body: formData
                })
                .then(r => r.json())
                .then(data => {
                    this.props.reload();
                })
            }
        }
    }

    // VALIDA SI LA SESSION ESTA INICIADA

    validationSession(){
        if(localStorage.getItem("success") === false || localStorage.getItem("success") === null){
            this.setState({
                alertVisible:false
            })
        } else {
            this.setState({
                alertVisible:true
            })
        }
    }

    getProducts(){
        fetch(`${this.state.api}/products/${this.props.params.category}/${this.props.params.product}`)
        .then(res => {
            return res.json()
        })
        .then(response => {
            if(response.status === 'error'){
                alert(response.message);
            } 
            else {
                this.setState({
                    data: response.data,
                    price: response.price
                })
                console.log(response.data)
            }
        })
    }
    handleAlertDismiss() {
        this.setState({alertVisible: false});
    }

     componentWillMount(){
       this.users();
       this.getProducts();
       this.validationSession(); 
       this.up();   
    }
    
    up(){
        window.scrollTo(0, -15);
    }

    render(){

        const opts = {
        height: '500',
        width: '100%'
        }

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
            <div>
                <Grid className="Product">
                    <Row>
                        
                        <Col xs={12} md={5}  className="gbGallery">
                            <h3>{this.state.data.name}</h3>
                            <br/>
                            <img src={this.state.data.image} className="imagenCover"  alt=""/>
                            <br/>
                            <br/>
                            <br/>
                            <Col xs={12} md={5}>
                                <br/>
                                <h4>$ {format(String(this.state.data.priceIva))}.-</h4>
                                <br/>
                            </Col>
                            <Col xs={12} md={7}>
                                <Row>
                                    <Col xs={12} md={6} className="noPadding">
                                        <br/>
                                        <input 
                                            type="number" 
                                            ref="cantidad"
                                            className={`form-control plus ${this.state.alertVisible ? 'visible':'hidde'}`} 
                                            placeholder="Cantidad"
                                        />
                                    </Col>
                                    <Col xs={12} md={6}  className="noPadding">
                                        <br/>
                                        <Button 
                                            block 
                                            bsStyle="danger" 
                                            className={this.state.alertVisible ? 'visible':'hidde'} 
                                            onClick={this.addToCart.bind(this)}>
                                            <i className="fa fa-cart-plus"></i>
                                        </Button>
                                    </Col>
                                    <Col xs={12} md={12}  className={`noPadding ${this.state.alertVisible ? 'visible':'hidde'}`}>
                                        <p>*todos los precios sin iva incluido</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} md={12}>
                                <p className="sku">SKU: {this.state.data.sku}</p>
                            </Col>
                            {this.state.alertVisible ? null : <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}><h4>Debes Iniciar session para continuar!</h4></Alert>}
                        </Col>
                        <Col xs={12} md={7}>
                            <ImageGallery
                                items={this.state.data.gallery}
                                slideInterval={2000}
                                thumbnailPosition="right"
                                onImageLoad={this.handleImageLoad}
                            />
                        </Col>
                         <Col xs={12} md={12}>
                            <br/>
                            <br/>
                            <br/>
                            <h3 className="fortitle">{this.state.data.name}</h3>
                            <p>Genero: {this.state.data.gender}</p>
                            <br/>
                            <h4>Descripción:</h4>
                            <br/>
                            <div dangerouslySetInnerHTML={{__html: this.state.data.description}} />
                            <br/>
                            <br/>
                            <br/>
                             <YouTube videoId={this.state.data.videoId} opts={opts} />
                            <br/>
                            <br/>
                            <br/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}


export default Product;