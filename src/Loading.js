import React, { Component } from 'react';
import img from './img/loading.svg';

class Loading extends Component {
    render(){
        if (!this.props.loading){
            return null;
        }
        // eslint-disable-next-line
        return (<img className="loader" src={img}/>);
    }

}

        export default Loading;
