import React, { Component } from 'react';
import {Link, IndexLink} from 'react-router'
import './Navbar.css';


class App extends Component {

    constructor(){
        super();

        this.state = {
            category: []
        }
    }


    componentDidMount(){
        fetch('http://localhost:4000/category')
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

    
    render() {
        return (
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <IndexLink className="navbar-brand" to="/">LOGO-VIDEOMANIAS</IndexLink>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        {this.state.category.map((item,index) => {
                            return(
                                <li key={index}>
                                    <Link to={item.name}>{item.name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </nav>
        );
    }
}

export default App;
