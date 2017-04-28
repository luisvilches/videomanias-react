import React, {Component} from 'react';
import {Link} from 'react-router';
import {Grid,Row,Col,Button,ResponsiveEmbed,embed} from 'react-bootstrap';
import './product.css';
import {Carousel as Carousel} from 'react-responsive-carousel';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const images = [
      {
        original: 'http://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      }
    ]


let dev = 'http://localhost:4000';
let prod = 'https://dowhile-videomania.herokuapp.com';

class Product extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: [],
            api:dev
        }
    }
     componentWillMount(){
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
                    data: response.data
                })
                console.log(response.data)
            }
        })
    }
    render(){
        return(
            <div>
                <Grid className="Product">
                    <Row>
                        <Col xs={12} md={6}>
                            <br/>
                            <ImageGallery
                            items={images}
                            slideInterval={2000}
                            onImageLoad={this.handleImageLoad}/>
                        </Col>
                        <Col xs={12} md={6}>
                            <h2>{this.state.data.name}</h2>
                            <br/>
                            <img src={this.state.data.image}  alt=""/>
                            <br/>
                            <h4>${this.state.data.price} + IVA</h4>
                            <br/>
                            <Button>Comprar ahora</Button>
                        </Col>
                         <Col xs={12} md={12}>
                            <br/>
                            <h5>Descripción:</h5>
                            <br/>
                            <p>${this.state.data.description} + IVA</p>
                            <br/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}


export default Product;