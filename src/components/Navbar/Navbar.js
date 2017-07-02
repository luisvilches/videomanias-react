import React, { Component } from 'react';
import {Link, IndexLink,hashHistory,Router} from 'react-router';
import {Grid,Row,Col,Tabs,Tab,Navbar,Nav,NavItem,NavDropdown,MenuItem,Modal,Button,Alert,Table,thead,tbody,tr} from 'react-bootstrap';
import './Navbar.css';
import '.././icons/css/font-awesome.css';
import Alert2 from 'react-s-alert';
import Alert3 from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

let dev = 'http://localhost:4000';
let prod = 'https://dowhile-videomania.herokuapp.com';

var user = [];

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            category: [],
            api: prod,
            shop: 0,
            ModalUser: false,
            ModalCart: false,
            ModalSearch: false,
            initSession: true,
            value: '',
            login: true,
            user: [],
            usuario:[],
            totalWebpay: '',
            reload: this.props.reloadStatus
        }
    }

    componentWillReceiveProps(){
        this.componentWillMount()
    }

    reloadPadre(){
        this.props.reload();
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
        //console.log('USUARIO: '+localStorage.getItem('user'))
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
                    shop: result.total,
                    totalWebpay: result.totalG
                })
               // console.log(result.totalG)
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
                    shop: result.total,
                    totalWebpay: result.totalG
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
         //e.preventDefault()
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

    // FUNCION QUE ABRE MODAL CARRITO COMPRAS

    openCart() {
        this.setState({ ModalCart: true });
    }
    closeCart() {
        this.setState({ ModalCart: false });
    }

    openSearch() {
        this.setState({ ModalSearch: true });
    }
    closeSearch() {
        this.setState({ ModalSearch: false });
    }

    

    // FUNCION QUE CIERRA LA SESSION LIMPIANDO EL LOCALSTORAGE

    closeSession(){
        localStorage.clear();
        this.users();
        this.setState({
            shop:0
        });
        this.closeUser();
        this.componentWillMount();
        
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
         <div>
             <Navbar inverse collapseOnSelect fixedTop={true} fluid={true}  className="visible-xs visible-sm">
            <Navbar.Header>
            <Navbar.Brand>
                <Link href="#"><img src="/img/logotipo.jpg" className="logo" alt=""/></Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <Nav inline>
                <NavItem eventKey={1} onClick={this.openUser.bind(this)}><i className="fa fa-user" aria-hidden="true" ></i></NavItem>
                <NavItem eventKey={2} onClick={this.openSearch.bind(this)}><i className="fa fa-search" aria-hidden="true"></i></NavItem>
                <NavItem eventKey={3} onClick={this.openCart.bind(this)}><i className="fa fa-shopping-cart" aria-hidden="true"></i> $ {this.state.shop} </NavItem>
            </Nav>
            <Nav>
                <ul>
                    {this.state.category.map((item,index) => {
                        return(
                            <li key={index} inline>
                                <Link to={item.name} key={index} className="link">{item.name}</Link>
                            </li>
                        )
                    })}
                </ul>
            </Nav>
            </Navbar.Collapse>
            
        </Navbar>
        <Navbar inverse collapseOnSelect fixedTop={true} fluid={true} className="hidden-xs hidden-sm">
            <Navbar.Header>
            <Navbar.Brand>
                <Link href="#"><img src="/img/logotipo.jpg" className="logo" alt=""/></Link>
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
                <NavItem eventKey={1} onClick={this.openUser.bind(this)}><i className="fa fa-user" aria-hidden="true" ></i></NavItem>
                <NavItem eventKey={2} onClick={this.openSearch.bind(this)}><i className="fa fa-search" aria-hidden="true"></i></NavItem>
                <NavItem eventKey={3} onClick={this.openCart.bind(this)}><i className="fa fa-shopping-cart" aria-hidden="true"></i> $ {this.state.shop} </NavItem>
            </Nav>
            </Navbar.Collapse>

            <Modal show={this.state.ModalUser} onHide={this.closeUser.bind(this)}>
                <Modal.Header closeButton>
                    <i className="fa fa-times-circle pull-right btnClose" onClick={this.closeUser.bind(this)} aria-hidden="true" ></i>
                </Modal.Header>
                <Modal.Body>
                   {this.state.login ? <Users handler={this.closeSession.bind(this)} reload={this.componentWillMount.bind(this)}/>: <LoginRegister handler={this.afterSession.bind(this)} api={this.state.api} reload={this.componentWillMount.bind(this)} reloadPadre={this.reloadPadre.bind(this)}/>}
                </Modal.Body>
            </Modal>

            <Modal show={this.state.ModalCart} onHide={this.closeCart.bind(this)}>
                <Modal.Header closeButton>
                    <i className="fa fa-times-circle pull-right btnClose" onClick={this.closeCart.bind(this)} aria-hidden="true" ></i>
                    <h3>Mi carrito de compras</h3>
                </Modal.Header>
                <Modal.Body>
                   {this.state.login ? <CartLoginActive dirApi={this.state.api} reload={this.users.bind(this)} totalWebpay={this.state.totalWebpay} total={this.state.shop}/> : <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}><h4>Debes Iniciar session para continuar!</h4></Alert>}
                </Modal.Body>
            </Modal>

            <Modal show={this.state.ModalSearch} onHide={this.closeSearch.bind(this)}>
                <Modal.Header closeButton>
                    <i className="fa fa-times-circle pull-right btnClose" onClick={this.closeSearch.bind(this)} aria-hidden="true" ></i>
                    Ingrese las palabras a buscar
                </Modal.Header>
                <Modal.Body>
                   <input ref="buscar" type="search" placeholder="Buscar..." className="form-control" onKeyPress={this._handleKeyPress.bind(this)}/>
                </Modal.Body>
            </Modal>

        </Navbar>
         </div>
        );
    }
}

class CartLoginActive extends Component{
    constructor(props){
        super(props);

        this.state = {
            api: this.props.dirApi,
            cart: [],
            total: this.props.total,
            totalWebpay: this.props.totalWebpay
        }
    }

    componentWillMount(){
        fetch(`${this.state.api}/app/user/${localStorage.getItem('user')}`,{
            headers: {
                'Authorization': `Bearer ${ localStorage.getItem('token')}`, 
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            this.setState({
                cart: response.cart
            })
            console.log(response.cart)
        })
    }

    deleteCartItem(id){
        fetch(`${this.state.api}/user/cart/${id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(response => {
            this.componentWillMount();
            this.props.reload();
        })
    }
    generarTransaccion(){
        if(!this.state.total == 0){
            var formData = new FormData();
            formData.append('amount',this.state.totalWebpay)
            formData.append('user',localStorage.getItem('user'))
            fetch(`${this.state.api}/transaccion`,{
                method:'POST',
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                //alert(response.url);
                //location()
                console.log(response.url)
                console.log(this.props)
                window.location.href = response.url
            })
        }
    }
    render(){
        return(
            <Grid fluid>
                <Row>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>SKU</th>
                            <th>ITEM</th>
                            <th>CANTIDAD</th>
                            <th>PRECIO</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.cart.map((item,index) => {
                                return(
                                    <tr key={index}>
                                        <td>{item.sku}</td>
                                        <td>{item.item}</td>
                                        <td className="text-center">{item.cant}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            <Button bsStyle="danger" onClick={this.deleteCartItem.bind(this,item._id)}>x</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Col xs={12} md={12} className="conatinerGenerateSale">
                        <h4>Total: {this.state.total}</h4>
                        <br/>
                        <Button onClick={this.generarTransaccion.bind(this)} bsStyle="info" className="pull-right">Generar compra</Button>
                    </Col>                    
                </Row>
            </Grid>
        )
    }
}

class LoginRegister extends Component {

    constructor(props){
        super(props);

        this.state = {
            api: this.props.api,
            rut: false
        }
        
    }
    validaRut(rutCompleto) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
            return false;
        var tmp 	= rutCompleto.split('-');
        var digv	= tmp[1]; 
        var rut 	= tmp[0];
        if ( digv == 'K' ) digv = 'k' ;
        return (this.dv(rut) == digv );
    }
    dv(T){
        var M=0,S=1;
        for(;T;T=Math.floor(T/10))
            S=(S+T%10*(9-M++%6))%11;
        return S?S-1:'k';
    }

    register(){

        let rut = this.refs.rut.value;

        if(rut === null || rut === ''){
            Alert2.warning('Debes ingresar tu Rut para continuar', {
                position: 'top',
                effect: 'scale',
                onShow: function () {
                    setTimeout(function(){
                        Alert2.closeAll()
                    },3000)
                },
                beep: false,
                offset: 100
            });
        }
        else if(!this.validaRut(rut) === true){
             Alert2.error('Rut ingresado no es valido', {
                position: 'top',
                effect: 'scale',
                onShow: function () {
                    setTimeout(function(){
                        Alert2.closeAll()
                    },3000)
                },
                beep: false,
                offset: 100
            });
        }
        else if(this.refs.name.value === '' || this.refs.name.value === 'undefined' || this.refs.name.value === null){
            Alert2.warning('El campo nombre es requerido', {
                position: 'top',
                effect: 'scale',
                onShow: function () {
                    setTimeout(function(){
                        Alert2.closeAll()
                    },3000)
                },
                beep: false,
                offset: 100
            });
        }
        else if(this.refs.secondName.value === '' || this.refs.secondName.value === 'undefined' || this.refs.secondName.value === null){
            Alert2.warning('El campo apellido es requerido', {
                position: 'top',
                effect: 'scale',
                onShow: function () {
                    setTimeout(function(){
                        Alert2.closeAll()
                    },3000)
                },
                beep: false,
                offset: 100
            });
        }
        else if(this.refs.mail.value === '' || this.refs.mail.value === 'undefined' || this.refs.mail.value === null){
            Alert2.warning('El campo correo electronico es requerido', {
                position: 'top',
                effect: 'scale',
                onShow: function () {
                    setTimeout(function(){
                        Alert2.closeAll()
                    },3000)
                },
                beep: false,
                offset: 100
            });
        }
        else if(this.refs.username.value === '' || this.refs.username.value === 'undefined' || this.refs.username.value === null){
            Alert2.warning('El campo nombre de ususario es requerido', {
                position: 'top',
                effect: 'scale',
                onShow: function () {
                    setTimeout(function(){
                        Alert2.closeAll()
                    },3000)
                },
                beep: false,
                offset: 100
            });
        }
        else if(this.refs.password.value === '' || this.refs.password.value === 'undefined' || this.refs.password.value === null){
            Alert2.warning('El campo password es requerido', {
                position: 'top',
                effect: 'scale',
                onShow: function () {
                    setTimeout(function(){
                        Alert2.closeAll()
                    },3000)
                },
                beep: false,
                offset: 100
            });
        }
        else{
            var formData = new FormData();
            formData.append('rut', this.refs.rut.value)
            formData.append('name', this.refs.name.value)
            formData.append('apellido', this.refs.secondName.value)
            formData.append('mail', this.refs.mail.value)
            formData.append('phone', this.refs.phone.value)
            formData.append('username', this.refs.username.value)
            formData.append('password', this.refs.password.value)
            formData.append('admin', false)

            fetch(`${this.state.api}/register`,{
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                if(response.staus === 'success'){
                    Alert2.success(response.message, {
                        position: 'top',
                        effect: 'scale',
                        onShow: function () {
                            setTimeout(function(){
                                Alert2.closeAll()
                            },3000)
                        },
                        beep: false,
                        offset: 100
                    });
                }else{
                    Alert2.error(response.message, {
                        position: 'top',
                        effect: 'scale',
                        onShow: function () {
                            setTimeout(function(){
                                Alert2.closeAll()
                            },3000)
                        },
                        beep: false,
                        offset: 100
                    });
                }
            })
        }
    }

    login(){
        if(this.refs.user.value === '' || this.refs.user.value === 'undefined' || this.refs.user.value === null){
            Alert3.warning('El campo correo electronico es requerido', {
                position: 'top',
                effect: 'scale',
                onShow: function () {
                    setTimeout(function(){
                        Alert2.closeAll()
                    },3000)
                },
                beep: false,
                offset: 100
            });
        }
        else if(this.refs.pass.value === '' || this.refs.pass.value === 'undefined' || this.refs.pass.value === null){
            Alert3.warning('El campo password es requerido', {
                position: 'top',
                effect: 'scale',
                onShow: function () {
                    setTimeout(function(){
                        Alert2.closeAll()
                    },3000)
                },
                beep: false,
                offset: 100
            });
        }
        else{

            let user = this.refs.user.value;
            let pass = this.refs.pass.value;

            const formData = new FormData()
            formData.append('mail',user)
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
                    //this.props.reload();
                    this.props.reloadPadre();
                }
            })
        }

    }

    recover(){
        if(this.refs.user.value === "" || this.refs.user.value === 'undefined' || this.refs.user.value === null){
            Alert3.warning('El campo correo electronico es requerido', {
                position: 'top',
                effect: 'scale',
                onShow: function () {
                    setTimeout(function(){
                        Alert2.closeAll()
                    },3000)
                },
                beep: false,
                offset: 100
            });
        }
        else {
            var formData = new FormData();
            formData.append('mail', this.refs.user.value)
            fetch(`${this.state.api}/recover`,{
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(response => {
                if(response.status === 'success'){
                    Alert3.success(response.message, {
                        position: 'top',
                        effect: 'scale',
                        onShow: function () {
                            setTimeout(function(){
                                Alert2.closeAll()
                            },3000)
                        },
                        beep: false,
                        offset: 100
                    });
                }else{
                    Alert3.warning(response.message, {
                        position: 'top',
                        effect: 'scale',
                        onShow: function () {
                            setTimeout(function(){
                                Alert2.closeAll()
                            },3000)
                        },
                        beep: false,
                        offset: 100
                    });
                }
            })
        }
    }

    render(){
        return(
            <Tabs defaultActiveKey={1} id="session">
                <Tab eventKey={1} title="Inicio de session" className="sessionItem">
                    <h2>inicio de sesion</h2>
                    <Alert3 stack={{limit: 3}} html={false} />
                    <br/>
                    <input ref="user" type="text" placeholder="Correo electronico" className="form-control"/>
                    <br/>
                    <input ref="pass" type="password" placeholder="Contraseña" className="form-control"/>
                    <br/>
                    <input type="button" onClick={this.login.bind(this)} value="Iniciar session" className="form-control btn-danger"/>
                    <br/>
                    <br/>
                    <a className="pull-right" onClick={this.recover.bind(this)}>Olvide mi contraseña</a>
                </Tab>
                <Tab eventKey={2} title="registrar" className="sessionItem">
                    <h2>Formulario de registro</h2>
                    <Alert2 stack={{limit: 3}} html={false} />
                    <br/>
                    <input ref="rut" type="text" placeholder="Rut" className="form-control" required/>
                    <br/>
                    <input ref="name" type="text" placeholder="Nombre" className="form-control" required/>
                    <br/>
                    <input ref="secondName" type="text" placeholder="Apellido" className="form-control" required/>
                    <br/>
                    <input ref="mail" type="text" placeholder="Email" className="form-control" required/>
                    <br/>
                    <input ref="phone" type="text" placeholder="Telefono" className="form-control" required/>
                    <br/>
                    <input ref="username" type="text" placeholder="Nombre de usuario" className="form-control" required/>
                    <br/>
                    <input ref="password" type="text" placeholder="Contraseña" className="form-control" required/>
                    <br/>
                    <input type="button" onClick={this.register.bind(this)} value="Registrar" className="form-control btn-danger"/>
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
                                <h3>Bienvenido <b>{user.username}</b></h3>
                                <br/>
                                <br/>
                                <h4>Mis Datos</h4>
                                <hr/>
                                <br/>
                                <h5>Rut: <b>{user.rut}</b></h5>
                                <h5>Nombre: <b>{user.name} {user.apellido}</b></h5>
                                <h5>Telefono: <b>{user.phone}</b></h5>
                                <h5>Correo electronico: <b>{user.mail}</b></h5>
                                <br/>
                                <hr/>
                            </Tab>
                            <Tab eventKey={2} title="Mis compras" className="sessionItem">
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Fecha</th>
                                        <th>Transaccion</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {user.my_shopping.map((item,index) => {
                                        return(
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.Date}</td>
                                            <td>{item.transaction}</td>
                                            <td>${item.total}</td>
                                        </tr>
                                        )
                                    })}
                                    </tbody>
                                </Table>
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


