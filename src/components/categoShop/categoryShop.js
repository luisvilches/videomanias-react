import React, { Component } from 'react';
import './categoryShop.css';
import {Tabs,Tab,Button,Grid,Row,Col,Carousel} from 'react-bootstrap';
import {Link} from 'react-router';
import '.././icons/css/font-awesome.css';


let dev = 'http://localhost:4000';
let prod = 'https://dowhile-videomania.herokuapp.com';

class Item extends Component {
    render(){
        return(
             <Link to={location.hash.substr(2) + '/' + this.props.url}>
                <Col xs={12} md={4} className="marginBottom card">
                    <Col xs={12} md={12} className="">
                        <img src={this.props.image} className="cover" />
                        <br/>
                        <Col>
                            <Col xs={12} md={this.props.premiere ? 6:12}className={this.props.offer ? 'visibleOffer':'hide'}>
                                 <img src="img/offert.png" className="img-responsive" alt="" title="Producto en oferta"/>
                            </Col>
                            <Col xs={12} md={this.props.offer ? 6:12} className={this.props.premiere ? 'visiblePremiere':'hide'}>
                                <img src="img/premiere.png" className="img-responsive" alt="" title="Producto en estreno"/>
                            </Col>
                        </Col>
                        <br/>
                        <h4 className="text-center name">{this.props.name}</h4>
                        <h4 className="text-center price">$ {this.props.price}.-</h4>
                    </Col>
                </Col>
            </Link>
        )
    }
}


class CategoryShop extends Component {

    constructor(){
        super();

        this.state = {
           api: prod,
           all:[],
           datos: [],
           subcategory:[],
           premiere:[],
           offer:[],
           banner:'',
           filter:[],
           gallery:[],
        }
    }

    banner(){
        fetch(`${this.state.api}/category/${this.props.params.category}/banner`)
        .then(res => {
            return res.json()
        })
        .then(response => {
            if(response.status === 'error'){
                alert(response.message);
            } 
            else {
                this.setState({
                    banner: response.data.img
                })
            }
        })
    }

    premiere(){
        fetch(`${this.state.api}/category/${this.props.params.category}/premiere`)
        .then(res => {
            return res.json()
        })
        .then(response => {
            if(response.status === 'error'){
                alert(response.message);
            } 
            else {
                this.setState({
                    premiere: response.data
                })
            }
        })
    }

    offer(){
        fetch(`${this.state.api}/category/${this.props.params.category}/offer`)
        .then(res => {
            return res.json()
        })
        .then(response => {
            if(response.status === 'error'){
                alert(response.message);
            } 
            else {
                this.setState({
                    offer: response.data
                })
            }
        })
    }

    all(){
        fetch(`${this.state.api}/category/${this.props.params.category}`)
        .then(res => {
            return res.json()
        })
        .then(response => {
            if(response.status === 'error'){
                alert(response.message);
            } 
            else {
                this.setState({
                    all: response.data
                })
            }
        })
    }

    _Handler(e){
        fetch(`${this.state.api}/category/${this.props.params.category}/${e}`)
        .then(res => {
            return res.json()
        })
        .then(response => {
            if(response.status === 'error'){
                alert(response.message);
            } 
            else {
                this.setState({
                    datos: response.data
                })
            }
        })
    }

    gallery(){
        fetch(`${this.state.api}/banner/category/${this.props.params.category}`)
        .then(res => res.json())
        .then(response => {
            this.setState({
                gallery: response.data
            })
        })
    }
    

    componentWillReceiveProps(){
        this.banner();
        this.all();
        this.premiere();
        this.offer();
        this.gallery();
    }
    up(){
        window.scrollTo(0, -15);
    }

    componentDidMount(){
        this.up();
    }

    componentWillMount(){
        this.up();
        fetch(`${this.state.api}/family`)
        .then(res => {
            return res.json()
        })
        .then(response => {
            if(response.status === 'error'){
                alert(response.message);
            } 
            else {
                this.setState({
                    subcategory: response.data,
                })

                const array = this.state.datos.filter((item) => item.premiere)
                this.banner();
                this.all();
                this.premiere();
                this.offer();
                this.gallery();
                console.log(array)
            }
        })
    }

    
    render() {
        return (
            <Grid className="CategoryShop" fluid={true}>
                <Row className="">
                    <Col xs={12} md={12}>
                        <Carousel>
                            {this.state.gallery.map((item,index) => {
                                return(
                                    <Carousel.Item key={index}>
                                            <img className="banners" src={item.img}/>
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                    </Col>
                </Row>
                <Row className="">
                    <Col xs={12} md={12}>
                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab eventKey={1} title="Todos" className="paddingTabs">
                                {this.state.all.map((item,index) => {
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
                                    return (
                                        <Item 
                                            key={index} 
                                            image={item.image} 
                                            name={item.name} 
                                            price={format(item.price)} 
                                            url={item.nameUrl}
                                            offer={item.offer}
                                            premiere={item.premiere}
                                        />
                                    )
                                    }
                                )}
                            </Tab>
                            <Tab eventKey={2} title="Estrenos" className="paddingTabs">
                               {this.state.premiere.map((item,index) => {
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
                                    return (
                                        <Item 
                                            key={index} 
                                            image={item.image} 
                                            name={item.name}
                                            price={format(item.price)} 
                                            offer={item.offer}
                                            premiere={item.premiere}
                                        />
                                    )
                                    }
                                )}
                            </Tab>
                            <Tab eventKey={3} title="Ofertas" className="paddingTabs">
                                {this.state.offer.map((item,index) => {
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
                                    return (
                                        <Item 
                                            key={index} 
                                            image={item.image}
                                            name={item.name} 
                                            price={format(item.price)}
                                            offer={item.offer}
                                            premiere={item.premiere}
                                        />
                                    )
                                    }
                                )}
                            </Tab>
                            {this.state.subcategory.map((item,index) => {
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
                                    <Tab key={index} eventKey={4+index} title={item.name} className="paddingTabs" onEntering={this._Handler.bind(this,item.name)}>
                                        {this.state.datos.map((item,index) => {
                                            return (
                                                <Item 
                                                    key={index} 
                                                    image={item.image}
                                                    name={item.name} 
                                                    price={format(item.price)}
                                                    offer={item.offer}
                                                    premiere={item.premiere}
                                                />
                                            )
                                            }
                                        )}
                                    </Tab>
                                )
                            })}
                        </Tabs>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default CategoryShop;