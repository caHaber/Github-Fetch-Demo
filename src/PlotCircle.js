/**
 * Created by cabertron on 1/8/17.
 */
import React, {Component} from 'react';

class PlotCircle extends Component {

    render (){
        let translate = `translate(${this.props.cx}, ${this.props.cy})`,


            label = "";

        if (this.props.id) label = this.props.id;


        return (
                // <circle
                //       {/*transform={translate}*/}
                //       r={this.props.r}
                //       cx={this.props.cx}
                //       cy={this.props.cy}
                //       >
                // </circle>

            <g className="bar">
                <circle
                      cx={this.props.cx}
                      cy={this.props.cy} r='2'
                      transform="translate(0, 1)">
                </circle>
            </g>
        );



    }




}

export default PlotCircle