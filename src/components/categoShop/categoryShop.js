import React, { Component } from 'react';
import './categoryShop.css';
import {Tabs,Tab,Button} from 'react-bootstrap'

class Item extends Component {
    render(){
        return(
            <div className="cell-33">
                <div className="cell-35">
                    <img src={this.props.image} className="cover" />
                </div>
                <div className="cell-65 pd10">
                    <h4>{this.props.name}</h4>
                    <br/>
                    <h4>$ {this.props.price}.-</h4>
                    <Button>Agregar</Button>                 
                </div>
            </div>
        )
    }
}


class CategoryShop extends Component {

    constructor(){
        super();

        this.state = {
           datos: [],
           premiere:[]
        }
    }

    _filter(array){
        return array.premiere.search(true === -1);
    }

    componentWillReceiveProps(){
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
                    datos: response.data
                })
            }
        })
    }

    componentDidMount(){
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
                    datos: response.data
                })
            }
        })
    }
    render() {
        return (
            <div className="CategoryShop">
                <div className="container-lg">
                    <div className="rown">
                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab eventKey={1} title="Juegos" className="paddingTabs">
                                {this.state.datos.map((item,index) => {
                                    return (
                                        <Item key={index} image={item.image} name={item.name} price={item.price}/>
                                    )
                                    }
                                )}
                            </Tab>
                            <Tab eventKey={2} title="Accesorios" className="paddingTabs">Tab 2 content</Tab>
                            <Tab eventKey={3} title="Estrenos" className="paddingTabs">
                               
                            </Tab>
                            <Tab eventKey={4} title="Ofertas" className="paddingTabs">Tab 4 content</Tab>
                            <Tab eventKey={5} title="Juegos en Linea" className="paddingTabs">Tab 5 content</Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryShop;