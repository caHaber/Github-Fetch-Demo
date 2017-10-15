import React, { Component } from 'react';
import PlotComponent from './PlotComponent'
import BarComponent from './BarComponent'
import Controls from './Controls';
import Loading from './Loading';
import crowbar from './js/svg-crowbar.js';
import './css/style.css';

class App extends Component{
    constructor() {
        super();

        this.state = {
            data:[],
            year_data: [],
            owner:'pantsbuild',
            repo: 'pants',
            loading: true
        };
        
        this.changeRepo = this.changeRepo.bind(this);
        
        this.loadPunchCardData = this.loadPunchCardData.bind(this);
        this.loadYearData = this.loadYearData.bind(this);
        this.mergeData = this.mergeData.bind(this);

        this.savePdf = this.savePdf.bind(this);
    }
    componentWillMount() {
        this.loadPunchCardData();
    }
    loadYearData(){

        let app = this;
        let repo = this.state.repo;
        let owner = this.state.owner;
        let resourceType = 'stats/participation';

        fetch('https://api.github.com/repos/' + owner + '/' + repo + '/' + resourceType)
        .then(function(response) {
           return response.json();
        }).then(function (action) {
            app.setState({year_data: action.all});
        })
        .then(this.mergeData());

    }
    savePdf(event){   
        crowbar.call();
    }
    loadPunchCardData(){
        let app = this;
        let repo = this.state.repo;
        let owner = this.state.owner;
        let resourceType = 'stats/punch_card';

        fetch('https://api.github.com/repos/' + owner + '/' + repo + '/' + resourceType)
            .then(function(response) {
               return response.json();
            }).then(function (action) {

            // ####################################
            // ACCESSOR ON ENTRANCE OF API DATA --- Usually do specific data accessing in viz component
            // ####################################
            // action  =  action.items.map((d) => {
            //         return  {
            //             x : d[app.state.xVar],
            //             y : d[app.state.yVar],
            //             forks: d['forks'],
            //             id: d.html_url,
            //             name: d.full_name};

            //     });

                app.setState({data: action});
                
            })
            .then(this.mergeData())
            .then(this.loadYearData());

    }
    mergeData(){
      this.setState({loading:false});
    }
    changeRepo(event, index, value){

        let app = this;
        app.setState({loading:true});
        let p1 = new Promise(function(resolve, reject) {
            window.setTimeout(
                function() {
                    resolve(app.loadPunchCardData())
                }, Math.random() * 2000 + 1000);
        });
        p1.then(app.setState({repo:value}));
    }
	render() {

        if (!this.state.data.length) {
            return (<div>
            <h1> Loading raw data from github for {this.state.owner}/{this.state.repo} </h1>  <Loading loading={true}/>
            </div>);
        }

        let fullWidth = window.innerWidth * .7,
            fullHeight = window.innerHeight;

        let params = {
                bins: 20,
                width: fullWidth -150,
                height: fullHeight - 150,
                leftMargin: 100,
                topMargin: 0,
                bottomMargin: 50,
                yscaleName: "# of commits"
            };
            

        const total = this.state.data.reduce(function(sum, value) {
            return sum + value[2];
            }, 1);    

        const year_total = this.state.year_data.reduce(function(sum, value) {
            return sum + value;
            }, 1);

		return (
           <div className="App">
                <h1 className="header"> TwitterOSS Metrics Demo </h1>
                <h4>University of San Francisco: CS490 Capstone Project</h4>
                <div className="stats">
                    <h2>  Total commit frequency {this.state.owner}/{this.state.repo} : {total} total commits  </h2>
                </div>               
                <PlotComponent {...params} data={this.state.data}/>
                {this.state.year_data.length > 0 && 
                    <div>
                    <h2> Total Commits by week for the last 52 weeks : {year_total} total commits in year</h2>
                    <BarComponent {...params} data={this.state.year_data}/>
                    </div>
                }
                <div className="info">
                    <Controls
                        repo={this.state.repo}
                        changeRepo={this.changeRepo}
                        savePdf={this.savePdf}
                    />
                </div>
                <Loading loading={this.state.loading}/>
            </div>
		);
	}
}

export default App;
