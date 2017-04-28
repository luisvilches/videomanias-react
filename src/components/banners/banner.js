import React,{Component} from 'react';
import {Grid,Row,Col,Carousel,} from 'react-bootstrap';
import {Link} from 'react-router';
import './banner.css';

let dev = 'http://localhost:4000';
let prod = 'https://dowhile-videomania.herokuapp.com';

class Banner extends Component{

    constructor(props){
        super(props)

        this.state = {
            index: 5,
            direction: null,
            banner: [],
            premiere:[],
            offer:[],
            api: dev
        }
    }

    componentWillMount(){
     fetch(`${this.state.api}/banner`)
        .then(res => {
            return res.json()
        })
        .then(response => {
            if(response.status === 'error'){
                alert(response.message);
            } 
            else {
                this.setState({
                    banner: response.data
                })
                console.log(response.data)
            }
        })


         fetch(`${this.state.api}/offer`)
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
                console.log(response.data)
            }
        })


         fetch(`${this.state.api}/premiere`)
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
                console.log(response.data)
            }
        })
    }

    render(){
        return(
            <Grid className="Banns" fluid={true}>
                <Row>
                    <Col xs={12} md={12}>
                        <Carousel>
                            {this.state.banner.map((item,index) => {
                                return(
                                    <Carousel.Item key={index}>
                                        <Link to={'/'+ item.category}>
                                            <img width={900} height={500} alt="900x500" className="carouselImg" src={item.img}/>
                                        </Link>
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                    </Col>
                </Row>
                <br/>
                <br/>
                <br/>
                <Row>
                    <Col xs={12} md={12}>
                        <Col xs={12} md={12} className="bgTitle">
                            <h2 className="text-center">Estrenos</h2>
                        </Col>
                        <Col xs={12} md={12} className="noPadding">
                            {this.state.premiere.map((item,index) => {
                                    return(
                                       <Link to={'/' + this.props.url}>
                                            <Col xs={12} md={3} className="marginBottom card">
                                                <Col xs={12} md={12}>
                                                    <img src={item.image} className="cover" />
                                                    <br/>
                                                    <h4 className="text-center name">{item.name}</h4>
                                                    <h4 className="text-center price">$ {item.price}.-</h4>
                                                </Col>
                                            </Col>
                                        </Link>
                                    )
                                })}
                        </Col>
                    </Col>
                </Row>
                <br/>
                <br/>
                <br/>
                <Row>
                    <Col xs={12} md={12}>
                        <Col xs={12} md={12} className="bgTitle">
                            <h2 className="text-center">Ofertas</h2>
                        </Col>
                        <Col xs={12} md={12} className="noPadding">
                            {this.state.offer.map((item,index) => {
                                    return(
                                        <Link to={'/' + this.props.url}>
                                            <Col xs={12} md={3} className="marginBottom card">
                                                <Col xs={12} md={12}>
                                                    <img src={item.image} className="cover" />
                                                    <br/>
                                                    <h4 className="text-center name">{item.name}</h4>
                                                    <h4 className="text-center price">$ {item.price}.-</h4>
                                                </Col>
                                            </Col>
                                        </Link>
                                    )
                                })}
                        </Col>
                        <br/>
                        <br/>
                        <br/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Banner;