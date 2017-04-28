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
    }

    render(){
        return(
            <Grid className="Banns">
                <Row>
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
                </Row>
            </Grid>
        )
    }
}

export default Banner;