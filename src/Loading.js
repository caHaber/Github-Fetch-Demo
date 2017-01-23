
import React, { Component } from 'react';
import img from '../imgs/loading.svg';

class Loading extends Component {
    render(){

        if (!this.props.loading){
        return null;
        }

        return (

            <img className="loader" src={img}/>

        );

    }

}

        export default Loading;