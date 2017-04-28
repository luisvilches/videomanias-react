import React, { Component } from 'react';
import './categoryShop.css';
import {Tabs,Tab,Button,Grid,Row,Col} from 'react-bootstrap';
import {Link} from 'react-router';


let dev = 'http://localhost:4000';
let prod = 'https://dowhile-videomania.herokuapp.com';

class Item extends Component {
    render(){
        return(
            <Col xs={12} md={4}>
                <Col xs={12} md={6}>
                    <Link to={location.hash.substr(2) + '/' + this.props.url}>
                        <img src={this.props.image} className="cover" />
                    </Link>
                </Col>
                <Col xs={12} md={6}>
                    <Link to={location.hash.substr(2) + '/' + this.props.url}>
                        <h4>{this.props.name}</h4>
                    </Link>
                    <br/>
                    <h4>$ {this.props.price}.-</h4>
                    <Button>Agregar</Button>
                </Col>
            </Col>
        )
    }
}


class CategoryShop extends Component {

    constructor(){
        super();

        this.state = {
           api: dev,
           all:[],
           datos: [],
           subcategory:[],
           premiere:[],
           offer:[],
           banner:'',
           filter:[]
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
    

    componentWillReceiveProps(){
        this.banner();
        this.all();
        this.premiere();
        this.offer();
    }

    componentDidMount(){
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
                console.log(array)
            }
        })
    }
    render() {
        return (
            <div className="CategoryShop">
                <div className="container-full">
                    <div className="rown minH">
                         <img src={this.state.banner} alt="" className="banners"/>
                    </div>
                    <br/>
                    <br/>
                    <div className="rown">
                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab eventKey={1} title="Todos" className="paddingTabs">
                                {this.state.all.map((item,index) => {
                                    return (
                                        <Item key={index} image={item.image} name={item.name} price={item.price} url={item.nameUrl}/>
                                    )
                                    }
                                )}
                            </Tab>
                            <Tab eventKey={2} title="Estrenos" className="paddingTabs">
                               {this.state.premiere.map((item,index) => {
                                    return (
                                        <Item key={index} image={item.image} name={item.name} price={item.price}/>
                                    )
                                    }
                                )}
                            </Tab>
                            <Tab eventKey={3} title="Ofertas" className="paddingTabs">
                                {this.state.offer.map((item,index) => {
                                    return (
                                        <Item key={index} image={item.image} name={item.name} price={item.price}/>
                                    )
                                    }
                                )}
                            </Tab>
                            {this.state.subcategory.map((item,index) => {
                                 
                                return(
                                    <Tab key={index} eventKey={4+index} title={item.name} className="paddingTabs" onEntering={this._Handler.bind(this,item.name)}>
                                        {this.state.datos.map((item,index) => {
                                            return (
                                                <Item key={index} image={item.image} name={item.name} price={item.price}/>
                                            )
                                            }
                                        )}
                                    </Tab>
                                )
                            })}
                        </Tabs>

                        <br/>
                        <br/>

            
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryShop;