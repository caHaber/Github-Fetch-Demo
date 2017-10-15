import React from 'react';
import './css/Controls.css';
import {MuiThemeProvider, SelectField, MenuItem, RaisedButton} from 'material-ui';

// Needed for onTouchTap (to avoid warning from material-ui)
// See: https://github.com/callemall/material-ui/issues/4670
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const style = {
    margin: 12,
    };

const repos = [
    'pants',
    'intellij-pants-plugin',
    'pex'
];
      
const menuItems = (values) => {
    return values.map((name) => (
        <MenuItem
            key={name}
            value={name}
            primaryText={name}
        />
    ));
}
// Scatterplot component
var Controls = React.createClass({
	render() {
		return (
            <MuiThemeProvider>
                <div className="controls"> 
                    <SelectField
                        floatingLabelText="Pantsbuild Repo:"
                        value={this.props.repo}
                        onChange={this.props.changeRepo}
                    >
                    {menuItems(repos)}
                    </SelectField>
                    <RaisedButton onClick={this.props.savePdf} label="Download Visualizations" primary={true} style={style} />
                </div>

            </MuiThemeProvider>
		);
	}
});

export default Controls;
