import React, { Component } from 'react';

export default class Submit extends Component{

    render(){
        return(
            <div className='Submit' location={this.props.location}>
                <p>Hello World!</p>
            </div>
        );
    }
}