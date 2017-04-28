import React, {Component} from 'react';
import Navbar from '.././Navbar/Navbar';
import {Grid,Row,Col} from 'react-bootstrap';
import Footer from '.././footer/footer'

class BaseComponent extends Component {
    render(){
        return(
            <Grid fluid={true}>
                <Row>
                    <Col md={12} className="noPadding">
                        <Navbar/>
                        {this.props.children}
                        <Footer />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default BaseComponent;