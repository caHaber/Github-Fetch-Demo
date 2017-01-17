// Application
import React, { Component } from 'react';
import * as d3 from 'd3';
import PlotComponent from './PlotComponent'
import Controls from './Controls';
import './css/github.css'
import './style.css';
import './css/animations.css'

class App extends Component{
    constructor() {
        super();

        this.state = {
            data:[],
            xVar:'repo_name',
            groupVar:'State',
            yVar:'num_stars',
            filterNum: '50',
            urlData:'data/Top1000GithubRepos.csv',
            renderType: 'd3',
            gitData: '',
            contains:''
        };

        this.changeX = this.changeX.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.changeY = this.changeY.bind(this);
        this.changeRender = this.changeRender.bind(this);
        this.loadGitData = this.loadGitData.bind(this);
        this.mergeData = this.mergeData.bind(this);
        this.search = this.search.bind(this);
    }
    componentWillMount() {
        this.loadRawData();
        this.loadGitData();
    }
    loadGitData(){


        var myInit = { method: 'GET',
            headers: {
                'Authorization': 'Basic '+btoa('caHaber:casemaker*21'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            mode: 'cors',
            cache: 'default' };

        let app = this;

        fetch('https://api.github.com/repositories',myInit)
            .then(function(response) {
               return response.json();
            }).then(function (action) {
            app.setState({gitData:action});
            }).then(this.mergeData());

    }
    mergeData(){

    }
    loadRawData() {
        d3.csv(this.state.urlData)
            .row((d) => {

                return {x : d[this.state.xVar],
                        y : d[this.state.yVar],
                        id: d.repo_id,
                        name: d.repo_name};


            })
          .get((error, rows) => {
              if (error) {
                  console.error(error);
                  console.error(error.stack);
              }else{
                  this.setState({data: rows});
          } });

    }
    changeX(event, index, value) {
        this.setState({xVar:value});
        this.loadRawData();
    }

    changeY(event, index, value) {
        this.setState({yVar:value});
        this.loadRawData();
    }
    changeRender(event, index, value) {
        this.setState({renderType:value});
        this.loadRawData();
    }
    search(event) {
        this.setState({search:event.target.value.toLowerCase()})
    }

    changeFilter(event, index, value) {
        this.setState({filterNum:value});
    }
	render() {
        // Prep data
        // let chartData = this.state.data.map((d) => {
        //     let selected = d[this.state.idVar].toLowerCase().match(this.state.search) !== null;
        //     return {
        //         x:d[this.state.xVar],
        //         y:d[this.state.yVar],
        //         group:d[this.state.groupVar],
        //         id:d[this.state.idVar],
        //         selected:selected
        //     }
        // });

        let chartData = this.state.data.slice(0, this.state.filterNum);

        // chartData = chartData.sort((x,y) => d3.descending(x.y, y.y));
        // nest data
        // let nestedData = d3.nest()
        //     .key((d) => d.State)
        //     .rollup(function (s) { return {
        //         x: d3.mean(s, (d) => d.Delinquency),
        //         y: d3.mean(s, (d) => d.DaysOnMarket)
        //      }; })
        //     .entries(this.state.data);
        //
        // this.setState({data:nestedData});

        if (!this.state.data.length) {
            return (<h1> Loading raw data from www.zillow.com/research/data/ </h1>);
        }

        let fullWidth = window.innerWidth * .7,
            fullHeight = window.innerHeight - 120;
        let params = {
                bins: 20,
                width: fullWidth -150,
                height: fullHeight - 150,
                leftMargin: 70,
                topMargin: 0,
                bottomMargin: 50,
                renderType: this.state.renderType,
            };



        // Return ScatterPlot element
		return (

            <div className="App">
                <h1 className="header"> Zillow Housing Research Data by City </h1>
                <Controls
                    changeFilter={this.changeFilter}
                    changeRender={this.changeRender}
                    search={this.search}
                    filterNum={this.state.filterNum}
                    renderType={this.state.renderType}
                />
                    <svg width={fullWidth} height={fullHeight}>
                        <PlotComponent {...params} data={chartData} search={this.state.search}/>
                    </svg>
                <div className="marked"></div>
                <div className="info"><h3> " Click to show readme and stats! "</h3></div>
            </div>
		);
	}
}

export default App;
