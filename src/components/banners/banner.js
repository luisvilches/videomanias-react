import React,{Component} from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import {Link} from 'react-router';
import './banner.css';


class Banner extends Component{

    constructor(props){
        super(props)

        this.state = {
            banner: []
        }
    }

    componentWillMount(){
     fetch(`http://localhost:4000/banner`)
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
    }

    render(){
        return(
            <Grid>
                <Row>
                    <h2>HOLA MUNDO!!</h2>
                    {this.state.banner.map((item,index) => {
                        return(
                            <Col xs={12} md={12} key={index}>
                                <Link to={'/'+ item.category}>
                                    <br/>
                                    <img src={item.img} className="banners" />
                                    <br/>
                                </Link>
                            </Col>
                        )
                    })}
                </Row>
            </Grid>
        )
    }
}

export default Banner;