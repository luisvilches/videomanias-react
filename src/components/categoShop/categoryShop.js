import React, { Component } from 'react';
import './categoryShop.css';
import {Tabs,Tab,Button,Grid,Row,Col} from 'react-bootstrap';

class Item extends Component {
    render(){
        return(
            <Col xs={12} md={4}>
                <Col xs={12} md={6}>
                    <img src={this.props.image} className="cover" />
                </Col>
                <Col xs={12} md={6}>
                    <h4>{this.props.name}</h4>
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
           all:[],
           datos: [],
           subcategory:[],
           premiere:[],
           offer:[],
           banner:''
        }
    }

    banner(){
        fetch(`http://localhost:4000/category/${this.props.params.category}/banner`)
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

                 console.log(response.data.img)
            }
        })
    }

    premiere(){
        fetch(`http://localhost:4000/category/${this.props.params.category}/premiere`)
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
        fetch(`http://localhost:4000/category/${this.props.params.category}/offer`)
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
        fetch(`http://localhost:4000/category/${this.props.params.category}`)
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
        fetch(`http://localhost:4000/category/${this.props.params.category}/${e}`)
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
     fetch(`http://localhost:4000/family`)
        .then(res => {
            return res.json()
        })
        .then(response => {
            if(response.status === 'error'){
                alert(response.message);
            } 
            else {
                this.setState({
                    subcategory: response.data
                })
                this.banner();
                this.all();
                this.premiere();
                this.offer();
                console.log(this.state.banner)
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
                                        <Item key={index} image={item.image} name={item.name} price={item.price}/>
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