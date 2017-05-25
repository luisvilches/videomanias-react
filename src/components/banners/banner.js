import React,{Component} from 'react';
import {Tabs,Tab,Grid,Row,Col,Carousel,} from 'react-bootstrap';
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
            console: [],
            premiere:[],
            offer:[],
            category:[],
            api: dev
        }
    }
    up(){
        window.scrollTo(0, -15);
    }

    componentWillMount(){
        this.up();
     fetch(`${this.state.api}/bannersPublicidad`)
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
            }
        })

        

        fetch(`${this.state.api}/bannersCategory`)
        .then(res => {
            return res.json()
        })
        .then(response => {
            if(response.status === 'error'){
                alert(response.message);
            } 
            else {
                this.setState({
                    console: response.data
                })
            }
        })
    }

    render(){
        return(
            <div>
                <Grid className="Banns" fluid={false}>
                    <Row>
                        <Col xs={12} md={12}>
                            <Carousel>
                                {this.state.banner.map((item,index) => {
                                    return(
                                        <Carousel.Item key={index}>
                                             <img width={900} height={600} alt="900x500" className="carouselImg" src={item.img}/>
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                        </Col>
                    </Row>
                </Grid>
                <Grid className="topCategory" fluid={false}>
                    <Row className="noPadding">
                        {this.state.console.map((item,index) => {
                            return(
                                <Link to={'/'+ item.category}>
                                    <Col xs={12} md={4} className="card">
                                        <img src={item.img} className="img-responsive "/>
                                    </Col>
                                </Link>
                            )
                        })}
                    </Row>
                </Grid>
                <Grid className="bannerTabs" fluid={true}>
                    <Row>
                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                            <Tab eventKey={1} title="Ultimos Estrenos" className="paddingTabs pd100">
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
                                            url={item.nameUrl}
                                            category={item.category}
                                        />
                                    )
                                    }
                                )}
                            </Tab>
                            <Tab eventKey={2} title="Ultimas Ofertas" className="paddingTabs pd100">
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
                                            category={item.category}
                                            premiere={item.premiere}
                                            url={item.nameUrl}
                                        />
                                    )
                                    }
                                )}
                            </Tab>
                        </Tabs>
                    </Row>
                </Grid>
            </div>
        )
    }
}


class Item extends Component {
    render(){
        return(
             <Link to={location.hash.substr(2) + '/' + this.props.category + '/' + this.props.url}>
                <Col xs={12} md={4} className="marginBottom card noPadding">
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

export default Banner;import Slider from 'react-slick'