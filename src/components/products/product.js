import React, {Component} from 'react';
import {Link} from 'react-router';
import {Grid,Row,Col,Button} from 'react-bootstrap';
import './product.css';


class Product extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: []
        }
    }
     componentWillMount(){
       fetch(`http://localhost:4000/products/${this.props.params.category}/${this.props.params.product}`)
        .then(res => {
            return res.json()
        })
        .then(response => {
            if(response.status === 'error'){
                alert(response.message);
            } 
            else {
                this.setState({
                    data: response.data
                })
                console.log(response.data)
            }
        })
    }
    render(){
        return(
            <div>
                    <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Grid>
                    <Row>
                        <Col xs={12} md={9}>
                            <h2>{this.state.data.name}</h2>
                        </Col>
                        <Col xs={12} md={3}>
                            <img src={this.state.data.image} alt=""/>
                            <br/>
                            <h4 className="text-center">${this.state.data.price} + IVA</h4>
                            <br/>
                            <Button>Comprar ahora</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}


export default Product;