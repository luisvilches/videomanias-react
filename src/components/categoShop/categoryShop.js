import React, { Component } from 'react';
import './categoryShop.css';
import {Tabs,Tab,Button,Grid,Row,Col} from 'react-bootstrap';
import {Link} from 'react-router';
import '.././icons/css/font-awesome.css';


let dev = 'http://localhost:4000';
let prod = 'https://dowhile-videomania.herokuapp.com';

class Item extends Component {
    render(){
        return(
             <Link to={location.hash.substr(2) + '/' + this.props.url}>
                <Col xs={12} md={3} className="marginBottom card noPadding">
                    <Col xs={12} md={12} className="">
                        <img src={this.props.image} className="cover" />
                        <br/>
                        <Col>
                            <Col xs={12} md={this.props.premiere ? 6:12}className={this.props.offer ? 'visibleOffer':'hide'}>
                                <span> Oferta </span>
                            </Col>
                            <Col xs={12} md={this.props.offer ? 6:12} className={this.props.premiere ? 'visiblePremiere':'hide'}>
                                <span> Estreno </span>
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

    componentWillMount(){
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
            <Grid className="CategoryShop" fluid={true}>
                <Row className="noPadding">
                    <Col xs={12} md={12}>
                        <img src={this.state.banner} alt="" className="banners"/>
                    </Col>
                </Row>
                <Row className="noPadding">
                    <Col xs={12} md={12}>
                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab eventKey={1} title="Todos" className="paddingTabs">
                                {this.state.all.map((item,index) => {
                                    return (
                                        <Item 
                                            key={index} 
                                            image={item.image} 
                                            name={item.name} 
                                            price={item.price} 
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
                                    return (
                                        <Item 
                                            key={index} 
                                            image={item.image} 
                                            name={item.name}
                                            price={item.price} 
                                            offer={item.offer}
                                            premiere={item.premiere}
                                        />
                                    )
                                    }
                                )}
                            </Tab>
                            <Tab eventKey={3} title="Ofertas" className="paddingTabs">
                                {this.state.offer.map((item,index) => {
                                    return (
                                        <Item 
                                            key={index} 
                                            image={item.image}
                                            name={item.name} 
                                            price={item.price}
                                            offer={item.offer}
                                            premiere={item.premiere}
                                        />
                                    )
                                    }
                                )}
                            </Tab>
                            {this.state.subcategory.map((item,index) => {
                                 
                                return(
                                    <Tab key={index} eventKey={4+index} title={item.name} className="paddingTabs" onEntering={this._Handler.bind(this,item.name)}>
                                        {this.state.datos.map((item,index) => {
                                            return (
                                                <Item 
                                                    key={index} 
                                                    image={item.image}
                                                    name={item.name} 
                                                    price={item.price}
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