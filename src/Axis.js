/**
 * Created by cabertron on 1/8/17.
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Axis extends Component {
    constructor(props) {
        super();
    }

    componentDidUpdate() { this.renderAxis(); }
    componentDidMount() { this.renderAxis(); }

    renderAxis() {
        let node = ReactDOM.findDOMNode(this);

        d3.select(node).call(d3.axisBottom(this.props.xScale));
    }

    render() {
        let translate = `translate(0, ${this.props.height})`;
        return (
            <g className="axis" transform={translate}>
            </g>
        );
    }
}

export default Axis;