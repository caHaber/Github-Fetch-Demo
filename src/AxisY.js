/**
 * Created by cabertron on 1/8/17.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class AxisY extends Component {
    constructor(props) {
        super();
    }


    componentDidUpdate() { this.renderAxis(); }
    componentDidMount() { this.renderAxis(); }

    renderAxis() {
        let node = ReactDOM.findDOMNode(this);

        d3.select(node).call(d3.axisLeft(this.props.yScale));
    }

    render() {
        let translate = `translate(${this.props.leftMargin}, 0)`;
        return (
            <g className="axisY" transform={translate}>
            </g>
        );
    }
}

export default AxisY;
