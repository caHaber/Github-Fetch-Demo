// Scatterplot
import React from 'react';
import './Controls.css';
import {MuiThemeProvider, SelectField, MenuItem, TextField} from 'material-ui';



// Needed for onTouchTap (to avoid warning from material-ui)
// See: https://github.com/callemall/material-ui/issues/4670
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


// Scatterplot component
var Controls = React.createClass({

	render() {
		// Return links and show anything inside the <App> component (children)
		return (
            <MuiThemeProvider>
                <div className="controls">
                    <br/>
                    <SelectField
                        key="2"
                        floatingLabelText="Select Filter Amount"
                        value={this.props.filterNum}
                        onChange={this.props.changeFilter}
                    >
                        <MenuItem value={'50'} primaryText="50" />
                        <MenuItem value={'100'} primaryText="100" />
                        <MenuItem value={'1000'} primaryText="Show All" />

                    </SelectField>
                    <TextField
                        hintText="Search"
                        onChange={this.props.search}
                    />
                    <SelectField
                        key="3"
                        floatingLabelText="Select Render Type"
                        value={this.props.renderType}
                        onChange={this.props.changeRender}
                    >
                        <MenuItem value={'react'} primaryText="react" />
                        <MenuItem value={'d3'} primaryText="d3" />


                    </SelectField>
                </div>
            </MuiThemeProvider>
		);
	}
});

export default Controls;
