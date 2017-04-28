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
            api:dev
        }
    }
     componentWillMount(){
      fetch(`${this.state.api}/search/${this.props.params.search}`)
        .then(res => {
            return res.json()
        })
        .then(response => {
            if(response.status === 'error'){
                alert(response.message);
            } 
            else {
                if(response.index == 0){
                    this.setState({
                        value: 'Artículo buscado no encontrado, probar con algo más.',
                        count: response.count
                    })
                }else{
                    this.setState({
                        value: '',
                        count: response.count,
                        data: response.data
                    })
                }
            }
        })
    }

    click(){
         this.props.router.push(this.state.api + '/PS3');
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
                            <Col xs={12} md={4}>
                                <Col xs={12} md={6}>
                                    <Link to={location.hash.substr(2) + '/' + item.nameUrl}>
                                        <img src={item.image} className="cover" />
                                    </Link>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Link to={location.hash.substr(2) + '/' + this.props.url}>
                                        <h4>{item.name}</h4>
                                    </Link>
                                    <br/>
                                </Col>
                            </Col>
                        )
                    })}
                </Row>
            </Grid>
        )
    }
}

export default Search;