import * as d3 from 'd3';
import d3tip from 'd3-tip';
import marked from 'marked';

var BarChart = function(){
    var height = 500,
        width = 500,
        search = '',
        xScale = d3.scaleBand(),
        yScale = d3.scaleLinear(),
        xTitle = 'X Axis Title',
        yTitle = 'Y Axis Title',
        fill = (d) => 'blue',
        margin = {
            left:70,
            bottom:100,
            top:0,
            right:50,
        };


        // Function returned by ScatterPlot
        var chart = function(selection) {
            // Height/width of the drawing area itself
            var chartHeight = height - margin.bottom - margin.top;
            var chartWidth = width - margin.left - margin.right;

            // Iterate through selections, in case there are multiple
            selection.each(function(data){
                var ele = d3.select(this);
                var svg = ele.selectAll("svg").data([data]);

                // Append static elements (i.e., only added once)
                var gEnter = svg.enter()
                                .append("svg")
                                .attr('width', width)
                                .attr("height", height)
                                .append("g");

                // g element for markers
                gEnter.append('g')
        				.attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')')
        				.attr('height', chartHeight)
        				.attr('width', chartWidth)
                        .attr('class', 'chartG');


                // Append axes to the gEnter element
                gEnter.append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + (chartHeight + margin.top) + ')')
                    .attr('class', 'axis x');

                gEnter.append('g')
                    .attr('class', 'axis y')
                    .attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')

                // Add a title g for the x axis
                gEnter.append('text')
                    .attr('transform', 'translate(' + (margin.left + chartWidth/2) + ',' + (chartHeight + margin.top + 40) + ')')
                    .attr('class', 'title x');

                // Add a title g for the y axis
                gEnter.append('text')
                    .attr('transform', 'translate(' + (margin.left - 40) + ',' + (margin.top + chartHeight/2) + ') rotate(-90)')
                    .attr('class', 'title y');

                // Define xAxis and yAxis functions
                var xAxis = d3.axisBottom();
                var yAxis = d3.axisLeft();

                var tip = d3tip()
                          .attr('class', 'd3-tip')
                          .offset([-10, 0])
                          .html(function(d) {
                            return "<strong>" + d.y + " : " + d.x + "</strong>";
                          });

                ele.select('svg').call(tip);

                //Sorts data on descending

                xScale.rangeRound([0, chartWidth]).domain(data.map((d) => d.x));

                var yMin = d3.min(data, (d) => +d.y) * .95;
                var yMax = d3.max(data, (d) => +d.y) * 1.05;
                yScale.range([chartHeight, 0]).domain([yMin, yMax]);

                xAxis.scale(xScale);
                yAxis.scale(yScale);
                ele.select('.axis.x').transition().duration(1000).call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-45)");

                ele.select('.axis.y').transition().duration(1000).call(yAxis);

                // Update titles
                ele.select('.title.x').text(xTitle)
                ele.select('.title.y').text(yTitle)

                let bars = ele.select('.chartG').selectAll('rect').data(data, (d) => d.x);

                function click(d){
                   return chart.mark(d.x)
                }

                function mouseover(){
                    d3.select(this).classed('pulse',true);
                    tip.show
                }
                function mouseout(){
                    d3.select(this).classed('pulse',false);
                    tip.show
                }

                bars.enter().append('rect')
                    .attr('rx',30)
                    .attr('ry',30)
        			.attr('y', chartHeight)
        			.style('opacity', .3)
        			.attr('x', (d) => xScale(d.x))
                    .attr('width', xScale.bandwidth())
                    .on('mouseover', mouseover)
                    .on('mouseout', mouseout)
                    .on('click', click)
                    // Transition properties of the + update selections
                    .merge(bars)
                    .attr('fill', fill)
        			.transition()
        			.duration(1500)
                    .attr('width', xScale.bandwidth() * .95)
                    .attr('rx',0)
                    .attr('ry',0)
                    // .delay((d) => xScale(d.x) * 2)
                    .attr('x', (d) => xScale(d.x))
                    .attr('y', (d) => yScale(d.y))
                    .attr('height', (d) => (height- margin.top - margin.bottom) - yScale(d.y))

                // Use the .exit() and .remove() methods to remove elements that are no longer in the data
        		bars.exit().remove();
            });
        };

        chart.height = function(value){
            if (!arguments.length) return height;
            height = value;
            return chart;
        };

        chart.width = function(value){
            if (!arguments.length) return width;
            width = value;
            return chart;
        };

        chart.fill = function(value){
            if (!arguments.length) return fill;
            fill = value;
            return chart;
        };


        chart.xTitle = function(value){
            if (!arguments.length) return xTitle;
            xTitle = value;
            return chart;
        };

        chart.yScale = function(value){
            if (!arguments.length) return yScale;
            yScale = value;
            return chart;
        };

        chart.xScale = function(value){
            if (!arguments.length) return xScale;
            xScale = value;
            return chart;
        };

        chart.yTitle = function(value){
            if (!arguments.length) return yTitle;
            yTitle = value;
            return chart;
        };

    chart.search = function(value){
        if (!arguments.length) return search;
        search = value;
        return chart;
    };

    chart.mark = function (val) {
        fetchReadmeAPI(val);
    };

    var myInit = { method: 'GET',
        headers: {
            'Authorization': 'Basic '+btoa('username:password'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        mode: 'cors',
        cache: 'default' };


    function fetchReadme(value, title) {
        fetch(value,myInit).then(function (response) {

            if(response.ok) {
                return response.text();
            } else {
                return null;
            }

        }).then(function (action) {
            let markD = d3.select('.marked');
            if (!!action){
                markD.selectAll("*").remove();
                markD.html('<h2>' + title + '</h2>'+marked(action));
            }else {
                markD.selectAll("*").remove();
                markD.append("h2").text("ReadME NOT FOUND!");
            }
        }).catch(function(error) {
            d3.select(".marked").selectAll("*").remove();
            d3.select(".marked").append("h2").text("Error in Readme fetch!");
        });
    }

    function fetchReadmeAPI(value) {
        fetch('https://api.github.com/repos/' + value + '/readme',myInit).then(function (response) {

            if(response.ok) {
                return response.text();
            } else {
                return null;
            }

        }).then(function (action) {
            let markD = d3.select('.marked');
            if (!!action){
                fetchReadme(JSON.parse(action).download_url, value);
            }else {
                markD.selectAll("*").remove();
                markD.append("h2").text("ReadME NOT FOUND!");
            }
        }).catch(function(error) {
            d3.select(".marked").selectAll("*").remove();
            d3.select(".marked").append("h2").text("Error in Readme fetch!");
        });
    }



        return chart;
};


export default BarChart;
