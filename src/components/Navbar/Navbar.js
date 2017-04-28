import React, { Component } from 'react';
import {Link, IndexLink,hashHistory,Router} from 'react-router';
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap';
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
                
            </Nav>
            <Nav pullRight>
                <input ref="buscar" type="search" placeholder="Buscar..." className="form-control search" onKeyPress={this._handleKeyPress.bind(this)}/>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
        );
    }
}

export default App;


