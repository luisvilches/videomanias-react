import React, { Component } from 'react';
import {Link, IndexLink,hashHistory,Router} from 'react-router';
import {Tabs,Tab,Navbar,Nav,NavItem,NavDropdown,MenuItem,Modal,Button} from 'react-bootstrap';
import './Navbar.css';
import '.././icons/css/font-awesome.css';

let dev = 'http://localhost:4000';
let prod = 'https://dowhile-videomania.herokuapp.com';


class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            category: [],
            api: dev,
            shop:'520.990',
            ModalUser: false,
            ModalCart: false,
            initSession: true,
            value: ''
        }
    }


    componentDidMount(){
        fetch(`${this.state.api}/category`)
        .then(res => {
            return res.json()
        })
        .then(response => {
            if(response.status === 'error'){
                alert(response.message);
            } 
            else {
                this.setState({
                    category: response.data
                })
            }
            //console.log(this.refs)
        })
    }
    _handleKeyPress(e) {
        if (e.key === 'Enter') {
           console.log(hashHistory)
           hashHistory.push('/search/content/' + this.refs.buscar.value)
           location.reload();
            //location = ;

        }
    }

    closeUser() {
        this.setState({ ModalUser: false });
    }

    openUser() {
        this.setState({ ModalUser: true });
    }

    login(){
        //console.log(this.refs)

        let user = this.refs.user.value;
        let pass = this.refs.pass.value;

        const formData = new FormData()
        formData.append('name',user)
        formData.append('password',pass)

        fetch('http://localhost:4000/login', {
        method: 'POST',
        body: formData
        })
        .then(r => r.json())
        .then(data => {
            if(data.success === false){
                alert('Usuario o contraseña incorrectos!!')
            } else{
                console.log(data)
                this.closeUser();
                localStorage.setItem('token', data.token);
            }
        })

    }

    
    render() {
        return (
         <Navbar inverse collapseOnSelect fixedTop={true} fluid={true}>
            <Navbar.Header>
            <Navbar.Brand>
                <Link href="#"><img src="/img/isotipo.png" className="logo" alt=""/></Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <Nav>
                {this.state.category.map((item,index) => {
                    return(
                        <li key={index}>
                            <Link to={item.name} key={index} className="link">{item.name}</Link>
                        </li>
                    )
                })}
                
            </Nav>
            <Nav pullRight>
                <NavItem eventKey={1}><i className="fa fa-shopping-cart" aria-hidden="true"></i> $ {this.state.shop} </NavItem>
                <NavItem eventKey={2} onClick={this.openUser.bind(this)}><i className="fa fa-user" aria-hidden="true" ></i></NavItem>
            </Nav>
            <Nav pullRight>
                <input ref="buscar" type="search" placeholder="Buscar..." className="form-control search" onKeyPress={this._handleKeyPress.bind(this)}/>
            </Nav>
            </Navbar.Collapse>
            <Modal show={this.state.ModalUser} onHide={this.closeUser.bind(this)}>
                <Modal.Header closeButton>
                    <i className="fa fa-times-circle pull-right btnClose" onClick={this.closeUser.bind(this)} aria-hidden="true" ></i>
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey={1} id="session">
                        <Tab eventKey={1} title="Inicio de session" className="sessionItem">
                            <h2>inicio de sesion</h2>
                            <br/>
                            <input ref="user" type="text" placeholder="Nombre de usuario" className="form-control"/>
                            <br/>
                            <input ref="pass" type="password" placeholder="Contraseña" className="form-control"/>
                            <br/>
                            <input type="button" onClick={this.login.bind(this)} value="Iniciar session" className="form-control btn-danger"/>
                        </Tab>
                        <Tab eventKey={2} title="registrar" className="sessionItem">
                            <h2>registro</h2>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </Navbar>
        );
    }
}

export default App;


