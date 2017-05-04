import React, {Component} from 'react';
import Navbar from '.././Navbar/Navbar';
import {Grid,Row,Col} from 'react-bootstrap';
import Footer from '.././footer/footer'

class BaseComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            reload: false
        }
    }

    reload(){
        this.setState({
            reload: true
        })
        console.log('se ejecuta la accion ' + this.state.reload)
    }

    render(){
        return(
            <Grid fluid={true}>
                <Row>
                    <Col md={12} className="noPadding">
                        <Navbar reloadStatus={this.state.reload}/>
                        {React.cloneElement(this.props.children, { reload: this.reload.bind(this) })}
                        <Footer />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default BaseComponent;