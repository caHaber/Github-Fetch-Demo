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
                    <TextField
                        floatingLabelText="Add keyword to fetch..."
                        id="search"
                        onKeyPress={(ev) => {
                                if (ev.key === 'Enter') {
                                    this.props.search(ev.target.value);
                                    ev.preventDefault();
                                }
                            }}
                    />
                    <SelectField
                        value={this.props.language}
                        onChange={this.props.changeLanguage}
                    >
                        <MenuItem value={'javascript'} primaryText="JavaScript" />
                        <MenuItem value={'swift'} primaryText="Swift" />
                        <MenuItem value={'java'} primaryText="Java" />
                        <MenuItem value={'css'} primaryText="CSS" />
                        <MenuItem value={'c++'} primaryText="C++" />
                        <MenuItem value={''} primaryText="All Languages" />
                    </SelectField>
                </div>

            </MuiThemeProvider>
		);
	}
});

export default Controls;
