import React, { Component } from 'react';
import {Link, IndexLink,hashHistory,Router} from 'react-router';
import {Grid,Row,Col,Tabs,Tab,Navbar,Nav,NavItem,NavDropdown,MenuItem,Modal,Button} from 'react-bootstrap';
import './Navbar.css';
import '.././icons/css/font-awesome.css';

let dev = 'http://localhost:4000';
let prod = 'https://dowhile-videomania.herokuapp.com';

var user = [];

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            category: [],
            api: dev,
            shop: 0,
            ModalUser: false,
            ModalCart: false,
            initSession: true,
            value: '',
            login: true,
            user: [],
            usuario:[]
        }
    }

    //TRAE LAS CATEGORIAS

    categorys(){
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
        })
    }

    //TRAE TODA LA INFORMACION DEL USUARIO

    users(){
        fetch(`${this.state.api}/app/user/${localStorage.getItem('user')}`, {
            headers: {
                'Authorization': `Bearer ${ localStorage.getItem('token')}`, 
                'Content-Type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(data => {
            this.setState({
                usuario: data
            })
            user = data;
            console.log(this.state.usuario._id)
            return data;
        })
        .then(user => {
            fetch(`${this.state.api}/user/cart/total/${user._id}`)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    shop: result.total
                })
            })
        })
    }

    intervalCartUser(){
        var api = this.state.api;
            fetch(`${api}/app/user/${localStorage.getItem('user')}`, {
            headers: {
                'Authorization': `Bearer ${ localStorage.getItem('token')}`, 
                'Content-Type': 'application/json'
            }
        })
        .then(r => r.json())
        .then(data => {
            return data;
        })
        .then(user => {
            fetch(`${api}/user/cart/total/${user._id}`)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    shop: result.total
                })
                console.log(result)
            })
        })
    }

    // VALIDA SI LA SESSION ESTA INICIADA

    validationSession(){
        if(localStorage.getItem("success") === false || localStorage.getItem("success") === null){
            this.setState({
                login:false
            })
        } else {
            this.setState({
                login:true
            })
        }
    }

    //FUNCION PARA LA BUSQUEDA AL PRECIONAR LA TECLA ENTER
    
    _handleKeyPress(e) {
        if (e.key === 'Enter') {
           console.log(hashHistory)
           hashHistory.push('/search/content/' + this.refs.buscar.value)
           location.reload();
            //location = ;

        }
    }

    // FUNCION QUE CIERRA EL MODAL DE USUARIO

    closeUser() {
        this.setState({ ModalUser: false });
    }

    // FUNCION PARA EL INICIO DE SESSION

    afterSession(){
        this.users();
        this.closeUser();
    }

    // FUNCION QUE HABRE EL MODAL DE USUARIO

    openUser(e) {
         e.preventDefault()
        if(localStorage.getItem("success") === false || localStorage.getItem("success") === null){
            this.setState({
                login:false
            })
        } else {
            this.setState({
                login:true
            })
        }
        this.setState({ ModalUser: true });
    }

    // FUNCION QUE CIERRA LA SESSION LIMPIANDO EL LOCALSTORAGE

    closeSession(){
        localStorage.clear();
        this.users();
        this.setState({
            shop:0
        });
        this.closeUser();
        location.reload();
        
    }

    // FUNCIONES QUE SE EJECUTAN ANTES DEL RENDERIZADO DEL COMPONENTE

    componentWillMount(){
        
        this.categorys();
        this.users();
        this.validationSession();
        this.intervalCartUser();
       
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
                   {this.state.login ? <Users handler={this.closeSession.bind(this)}/>: <LoginRegister handler={this.afterSession.bind(this)} api={this.state.api}/>}
                </Modal.Body>
            </Modal>
        </Navbar>
        );
    }
}

class LoginRegister extends Component {

    constructor(props){
        super(props);

        this.state = {
            api: this.props.api
        }
        
    }
    login(){
        //console.log(this.refs)

        let user = this.refs.user.value;
        let pass = this.refs.pass.value;

        const formData = new FormData()
        formData.append('name',user)
        formData.append('password',pass)

        fetch(this.state.api + '/login', {
        method: 'POST',
        body: formData
        })
        .then(r => r.json())
        .then(data => {
            if(data.success === false){
                alert('Usuario o contraseña incorrectos!!')
            } else{
                console.log(data)
                localStorage.setItem('token', data.token);
                localStorage.setItem('success', data.success);
                localStorage.setItem('user', data.user._id)
                this.setState({
                    login: true,
                    user: data
                })
                this.props.handler();
                this.forceUpdate();
                location.reload();
            }
        })

    }

    render(){
        return(
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
                    <h2>Formulario de registro</h2>
                    <br/>
                    <input ref="rut" type="text" placeholder="Rut" className="form-control"/>
                    <br/>
                    <input ref="name" type="text" placeholder="Nombre" className="form-control"/>
                    <br/>
                    <input ref="secondName" type="text" placeholder="Apellido" className="form-control"/>
                    <br/>
                    <input ref="mail" type="text" placeholder="Email" className="form-control"/>
                    <br/>
                    <input ref="phone" type="text" placeholder="Telefono" className="form-control"/>
                    <br/>
                    <input ref="username" type="text" placeholder="Nombre de usuario" className="form-control"/>
                    <br/>
                    <input ref="password" type="password" placeholder="Contraseña" className="form-control"/>
                    <br/>
                    <input ref="secondPassword" type="password" placeholder="Nuevamente la contraseña" className="form-control"/>
                    <br/>
                    <input type="button" onClick={this.props.click} value="Registrar" className="form-control btn-danger"/>
                </Tab>
            </Tabs>
        )
    }
}

class Users extends Component {

     

    componentDidMount(){
        if(localStorage.getItem("success") === false || localStorage.getItem("success") === null){
            this.setState({
                login:false
            })
        } else {
            this.setState({
                login:true
            })
        }
    }

    closeSession(){
        localStorage.clear();
    }

    render(){
        return(
            <Grid fluid>
                <Row>
                    <Col xs={12} md={12}>
                        <Tabs defaultActiveKey={1} id="session">
                            <Tab eventKey={1} title="Mi cuenta" className="sessionItem">
                                <h5>Bienvenido {user.name}</h5>
                                <br/>
                            </Tab>
                            <Tab eventKey={2} title="Mis compras" className="sessionItem">
                                
                            </Tab>
                        </Tabs>
                        <Button onClick={this.props.handler}>Cerrar session</Button>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default App;


