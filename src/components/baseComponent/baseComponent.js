import React, {Component} from 'react';
import Navbar from '.././Navbar/Navbar';

class BaseComponent extends Component {
    render(){
        return(
            <main className='container-fluid'>
                <Navbar/>
                {this.props.children}
            </main>
        )
    }
}

export default BaseComponent;