import React,{Component} from 'react';
import {Link} from 'react-router'
import {Col,Grid,Row,Button} from 'react-bootstrap';
import './search.css';

let dev = 'http://localhost:4000';
let prod = 'https://dowhile-videomania.herokuapp.com';

class Search extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            value: '',
            count: '',
            search:this.props.params.search,
            api:dev
        }
    }
    up(){
        window.scrollTo(0, -15);
    }
     componentWillMount(){
        console.log(this.state.search)
        this.up();
        fetch(`${this.state.api}/product`)
            .then(res => {
                return res.json()
            })
            .then(response => {
                var dd = response.data;
                var filter = dd.filter(item => {return item.name.toString().toLowerCase().includes(this.props.params.search)}) 
                
                if(filter.length == 0){
                    console.log('sin resultados')
                    this.setState({
                        count: filter.length,
                        value: 'Artículo buscado no encontrado, probar con algo más.'
                    })
                }else{
                    this.setState({
                        data: filter,
                        count: filter.length,
                        value: ''
                    })
                }
            })
    }

    click(category,product){
         this.props.router.push(this.state.api + '/' + category + '/' + product);
    }
    render(){
        return(
            <Grid className="Product">
                <Row>
                    <Col xs={12} md={4}>
                        <br/>
                        <br/>
                        <br/>
                        <h3>{this.state.count} resultados para '{this.props.params.search}'</h3>
                        <p>{this.state.value}</p>
                        <br/>
                        <br/>
                    </Col>
                </Row>
                <Row>
                    {this.state.data.map((item,index) => {
                        return (
                            <Link to={'/'+ item.category + '/' + item.nameUrl}>
                                <Col xs={12} md={4} className="marginBottom card relative">
                                    <Col xs={12} md={12}>
                                        <img src={item.image} className="cover" />
                                        <Col>
                                            <Col xs={12} md={6}className={item.offer ? 'visibleOffer':'hide'}>
                                                <span> Oferta </span>
                                            </Col>
                                            <Col xs={12} md={6} className={item.premiere ? 'visiblePremiere':'hide'}>
                                                <span> Estreno </span>
                                            </Col>
                                        </Col>
                                        <br/>
                                        <h4 className="text-center">{item.name}</h4>
                                        <h4 className="text-center">$ {item.price}.-</h4>
                                    </Col>
                                </Col>
                            </Link>
                        )
                    })}
                </Row>
            </Grid>
        )
    }
}

export default Search;