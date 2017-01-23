// Scatterplot
import React, {Component} from 'react';
import * as d3 from 'd3';
import './ScatterPlot.css';
import BarD3 from './BarChart';



// Scatterplot component
class PlotComponent extends Component{
    constructor(props){
        super(props);
        // Define scatterplot function
        this.xScale = d3.scaleLinear();
        this.yScale = d3.scaleBand();
        this.scatter = BarD3();

    }
    componentDidMount(){
        this.update_d3(this.props);
    }
    // Create chart
    update_d3(props) {


        // Update parameters

        this.scatter
            .width(props.width)
            .height(props.height)
            .search(props.search)
            .yScale(this.yScale)
            .xTitle(props.xTitle)
            .yTitle(props.yTitle);

        // Call d3 update
        d3.select(this.root)
            .datum(props.data)
            .call(this.scatter);


    }
    changeShape(){
        d3.select(this.root).selectAll('rect').transition().attr('fill','red');
    }
    // Update on new props
    componentWillReceiveProps (newProps){
        this.update_d3(newProps);
    }

	render() {
        let translate = `translate(${this.props.leftMargin + 200}, ${-this.props.topMargin - 200})`;
        // this.changeShape();


		// Expose HTML node via ref property
		return (


            <g className="histogram" width={this.props.width} height={this.props.height}>

                <g
                    className="chart"
                    width={this.props.width}
                    height={this.props.height}
                    ref={(node) => { this.root = node;}}
                />


            </g>


		);
	}
}

export default PlotComponent;
