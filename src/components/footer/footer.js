import React,{Component} from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import './footer.css'


class Footer extends Component {

    componentDidMount(){
        
    }

    render(){
        return(
            <Row className="footer">
                <Col md={4} className="iso">
                    <img src="img/isotipo.png" alt="" className="img-responsive isotipo"/>
                </Col>
                <Col md={4} className="pd">
                    <h4><i className="fa fa-whatsapp phone"></i> ¿Tienes consultas?</h4>
                    <h2 className="up">+56 9 8888 8888</h2>
                    <h4>O escribenos a <br/><b>ventas@videomanias.cl</b></h4>
                    <br/>
                    <ul className="list-inline">
                        <li>
                            <a href="https://www.facebook.com/Dowhile-249855992087726" target="_blank" className="btn-social btn-outline"><span className="sr-only">Facebook</span><i className="fa fa-fw fa-facebook"></i></a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/dowhile.cl/" target="_blank" className="btn-social btn-outline"><span className="sr-only">Google Plus</span><i className="fa fa-fw fa-instagram"></i></a>
                        </li>
                        <li>
                            <a href="https://twitter.com/DowhileCL" target="_blank" className="btn-social btn-outline"><span className="sr-only">Twitter</span><i className="fa fa-fw fa-twitter"></i></a>
                        </li>
                    </ul>
                </Col>
                <Col md={4} className="webpay">
                    <img src="img/webpay5.png" alt="" className="img-responsive"/>
                </Col>
                <Col md={12} className="by">
                    <p>Copyright © Videomanias 2017 - Todos los derechos reservados. <span className="pull-right">Desarrollado por <a href="http://www.dowhile.cl" target="_blank">Dowhile Inc.</a></span></p>
                </Col>
            </Row>
        )
    }
}


export default Footer;