import React, {Component} from 'react';
import {Link} from 'react-router';
import {Grid,Row,Col,Button} from 'react-bootstrap';
import './product.css';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import '.././icons/css/font-awesome.css';
import YouTubeCustomPlayer from 'react-custom-youtube-player'



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
                console.log(response.data.gallery.img)
            }
        })
    }
    _onReady(event) {
    // access to player in all event handlers via event.target 
    event.target.pauseVideo();
  }
    render(){
        return(
            <div>
                <Grid className="Product">
                    <Row>
                        <Col xs={12} md={8}>
                            <ImageGallery
                            items={this.state.data.gallery}
                            slideInterval={2000}
                            thumbnailPosition="left"
                            onImageLoad={this.handleImageLoad}/>
                        </Col>
                        <Col xs={12} md={4}>
                            <h3>{this.state.data.name}</h3>
                            <br/>
                            <img src={this.state.data.image} className="imagenCover"  alt=""/>
                            <br/>
                            <br/>
                            <br/>
                            <Col xs={12} md={5}>
                                <br/>
                                <h4>$ {this.state.data.price}.-</h4>
                                <br/>
                            </Col>
                            <Col xs={12} md={7}>
                                <Row>
                                    <Col xs={12} md={6} className="noPadding">
                                        <br/>
                                        <input type="number" className="form-control plus" placeholder="Cantidad"/>
                                    </Col>
                                    <Col xs={12} md={6}  className="noPadding">
                                        <br/>
                                        <Button block bsStyle="danger"><i className="fa fa-cart-plus"></i></Button>
                                    </Col>
                                    <Col xs={12} md={12}  className="noPadding">
                                        <p>*todos los precios sin iva incluido</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} md={12}>
                                <p className="sku">SKU: {this.state.data.sku}</p>
                            </Col>
                        </Col>
                         <Col xs={12} md={12}>
                            <br/>
                            <br/>
                            <br/>
                            <h3 className="fortitle">{this.state.data.name}</h3>
                            <br/>
                            <h4>Descripción:</h4>
                            <br/>
                            <p>{this.state.data.description}</p>
                            <br/>
                            <br/>
                            <br/>
                             <YouTubeCustomPlayer  videoId={this.state.data.videoId} />
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