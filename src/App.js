// Application
import React, { Component } from 'react';
import * as d3 from 'd3';
import PlotComponent from './PlotComponent'
import Controls from './Controls';
import Loading from './Loading'
import './css/ubuntu.css';
import './css/github.css'
import './style.css';
import './css/animations.css';




class App extends Component{
    constructor() {
        super();

        this.state = {
            data:[],
            xVar:'stargazers_count',
            yVar:'full_name',
            filterNum: '50',
            urlData:'data/Top1000GithubRepos.csv',
            gitData: '',
            searchQ:'',
            language: 'javascript',
            loading: false
        };

        this.changeX = this.changeX.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.changeY = this.changeY.bind(this);
        this.loadGitData = this.loadGitData.bind(this);
        this.mergeData = this.mergeData.bind(this);
        this.search = this.search.bind(this);
    }
    componentWillMount() {
        // this.loadRawData();
        this.loadGitData();
    }
    loadGitData(){


        let app = this;
        let lanT = 'language:' + this.state.language + '&';
        let searchT = this.state.searchQ + '+';

        if(this.state.searchQ === ''){
            searchT = '';
        }
        console.log('https://api.github.com/search/repositories?q=' + searchT + lanT + 'sort=stars&order=desc')
        fetch('https://api.github.com/search/repositories?q=' + searchT + lanT + 'sort=stars&order=desc')
            .then(function(response) {
               return response.json();
            }).then(function (action) {

            console.log(action);
                action  =  action.items.map((d) => {

                        return  {
                            x : d[app.state.xVar],
                            y : d[app.state.yVar],
                            forks: d['forks'],
                            id: d.html_url,
                            name: d.full_name};




                    });
                    app.setState({data: action});

            }).then(this.mergeData());

    }
    mergeData(){
        console.log("Done Loading github data!")
      this.setState({loading:false});

    }
    changeX(event, index, value) {
        this.setState({xVar:value});
        // this.loadRawData();
    }

    changeY(event, index, value) {
        this.setState({yVar:value});
        // this.loadRawData();
    }
    search(event) {

        let app = this;
        app.setState({loading:true});
        let p1 = new Promise(function(resolve, reject) {
            // This is only an example to create asynchronism
            window.setTimeout(
                function() {
                    // We fulfill the promise !
                    resolve(app.loadGitData())
                }, Math.random() * 2000 + 1000);
        });

        p1.then(app.setState({searchQ:event}));
    }

    changeLanguage(event, index, value){

        let app = this;
        app.setState({loading:true});
        let p1 = new Promise(function(resolve, reject) {
            // This is only an example to create asynchronism
            window.setTimeout(
                function() {
                    // We fulfill the promise !
                    resolve(app.loadGitData())
                }, Math.random() * 2000 + 1000);
        });

        p1.then(app.setState({language:value}));


    }



	render() {

        if (!this.state.data.length) {
            return (<h1> Loading raw data from api.github.com/search/repositories </h1>);
        }

        let fullWidth = window.innerWidth * .7,
            fullHeight = 650;
        let params = {
                bins: 20,
                width: fullWidth -150,
                height: fullHeight,
                leftMargin: 100,
                topMargin: 0,
                bottomMargin: 50,
                renderType: this.state.renderType,
            };



        // Return ScatterPlot element
		return (

           <div className="App">
                <h1 className="header"> Explore the vast galaxy of github repos! </h1>
                <p className="desc"> This is a React and plain d3 experiment with the github api. The first in a iteration to pursue increased open source participation.
                Select a language and enter a keyword to search! Click a Bar to fetch the readme!
                </p>
                <Loading loading={this.state.loading}/>

                <svg width={fullWidth} height={fullHeight}>
                    <PlotComponent {...params} data={this.state.data} search={this.state.searchQ}/>
                </svg>
                <div className="marked"></div>
                <div className="info">
                    <Controls
                        searchQ={this.state.searchQ}
                        search={this.search}
                        language={this.state.language}
                        changeLanguage={this.changeLanguage}
                    />
                </div>
            </div>
		);
	}
}

export default App;
