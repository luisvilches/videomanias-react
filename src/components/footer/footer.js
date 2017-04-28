import React,{Component} from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import './footer.css'


class Footer extends Component {

    componentDidMount(){
        
    }

    render(){
        return(
            <Grid fluid={true}>
                <Row>
                    <Col md={12} className="footer">

                    </Col>
                </Row>
            </Grid>
        )
    }
}


export default Footer;