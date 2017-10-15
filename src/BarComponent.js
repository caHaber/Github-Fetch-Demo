// Scatterplot
import React, {Component} from 'react';
import * as d3 from 'd3';
import './css/ScatterPlot.css';
import {ORFrame} from 'semiotic';

const dateAccess = (i) => {
    var oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - (52-i)*7);
    oneWeekAgo = oneWeekAgo.toDateString();
    return oneWeekAgo.substring(4, oneWeekAgo.length);
}

class BarComponent extends Component{
	render() {

        const tiles = Array(this.props.data.length)
            .fill()
            .map((d,i) => ({ step: dateAccess(i), value: this.props.data[i]}))

        const heatScale = d3.scaleQuantize()
            .domain([d3.min(tiles,d => d.value),d3.max(tiles,d => d.value)])
            .range( ["#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]);    
          
        const axis = {
                orient: "left",
                tickFormat: d => d,
                label: {
                  name: this.props.yscaleName,
                  position: { anchor: "middle" },
                  locationDistance: 40
                }
            }
       
		return (
            <ORFrame
            size={[ 1200,600 ]}
            data={tiles}
            axis={axis}
            projection={'vertical'}
            style={d => ({ fill: heatScale(d.value), stroke: "white", strokeWidth: 0 })}
            type={'bar'}
            oAccessor={d => d.step}
            rAccessor={d => d.value}
            oLabel={d => <text transform="rotate(90)">{d}</text>}
            margin={{ left: 100, top: 50, bottom: 120, right: 50 }}
            oPadding={2}
            disableContext={true} 
            tooltipContent={d => 
                <div className="tooltip-content" >
                <p>Date: {d.step}</p>
                </div>}
            />
		);
	}
}

export default BarComponent;
