
// map part

// var basic_choropleth = new Datamap({
// 			  element: document.getElementById("Map"),
// 			  projection: 'mercator',
// 			  fills: {
// 			    defaultFill: "#d9d9d9"
// 			  },
// 			  geographyConfig: {
// 			  	highlightFillColor: '#48CAF2'
// 			  }
// 			});
// // var map = d3.select("#Map")
// // map.append("object")

// 		.attr("type","image/svg+xml")
// 		.attr("data","data/Blank_Map_Pacific_World.svg")


// bar plot
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    // width = 960 - margin.left - margin.right,
    // height = 500 - margin.top - margin.bottom;
    width = 300 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var y = d3.scale.ordinal()
	.rangeRoundBands([0,height], .1)

var x = d3.scale.linear()
	.range([0,width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svgContainer = d3.select("#Bar_plot").append("svg")
		.attr("class","container")
		.attr("x",800)
		.attr("y",200)
		.attr("width",  width + margin.left + margin.right)
	    .attr("height",  height + margin.top + margin.bottom)

var svg = svgContainer
  .append("g")
    .attr("transform", "translate(" + 50 + "," + margin.top + ")");

var fileName = "data/test2.csv";
//var fileName = "data/bar_chart.csv";
var	parseDate = d3.time.format("%Y-%m-%d").parse;
//var	parseDate = d3.time.format("%Y-%m").parse;

function type(d) {
	  d.Count = +d.Count;
	  return d;
	}


var bar_plot = function(file, index) {
	d3.csv(file, type, function(error, data) {
		//console.log(data);
		console.log(index);
		Data = data;

		data = data[index];
		temp = [];

		temp.push({Count:data.topic1, Topics:1});
		temp.push({Count:data.topic2, Topics:2});
		/*
		temp.push({Count:4, Topics:data.topic4});
		temp.push({Count:5, Topics:data.topic5});
		temp.push({Count:5, Topics:data.topic6});
		temp.push({Count:6, Topics:data.topic7});
		temp.push({Count:8, Topics:data.topic8});
		*/


		console.log(temp);
		//x.domain([0,d3.max(temp,function(d){return d.Count;})]);
		//y.domain(temp.map(function(d){return d.Topics;}));

		x.domain([0,25]);
		y.domain([1,2]);

		d3.select("svg").remove();
		svgContainer = d3.select("#Bar_plot").append("svg")
				.attr("class","container")
				.attr("x",800)
				.attr("y",200)
				.attr("width",  width + margin.left + margin.right)
			    .attr("height",  height + margin.top + margin.bottom)

		svg = svgContainer
		  .append("g")
		    .attr("transform", "translate(" + 50 + "," + margin.top + ")");

		svg.append("g")
		    .attr("class", "x axis")
		    .attr("transform", "translate(0," + height + ")")
		    .call(xAxis)
		    .append("text")
		    .attr("x",width+10)
		    .attr("y", 20)
		    .attr("dy", ".71em")
		    .style("text-anchor", "end")
		    .text("Frequency");

		svg.append("g")
		    .attr("class", "y axis")
		    .call(yAxis)

		svg.selectAll(".bar")
			.data(temp)
			.enter().append("rect")
			.attr("class","bar")
			.attr("x",2)
			.attr("width",function(d){return x(d.Count); })
			.attr("y",function(d){ return y(d.Topics); })
			.attr("height", y.rangeBand())

	});
	
};
bar_plot(fileName, 0);


// slider:
//var x = d3.time.scale()  
    //.domain([d3.min(data, function(d) { return d[0]; }), d3.max(data, function(d) { return d[0]; })])  
    //.range([0, width]);  

var slider2 = d3.select("#Date_slider").append("div")
	.attr("class","sliderContainer")
	.append("div")
	.attr("class","slider");

// set up an array to hold the months
// lets be fancy for the demo and select the current month.
var months = ["2013/06/24","2013/06/25","2013/06/26"]

var activeMonth = new Date().getMonth();

// console.log(activeMonth);

$(".slider")
    // activate the slider with options    
    .slider({ 
        min: 0, 
        max: months.length-1, 
        //value: activeMonth 
    })
                    
    // add pips with the labels set to "months"
    .slider("pips", {
        rest: "label",
        labels: months
    })
                    
    // and whenever the slider changes, lets echo out the month
    .on("slide", function(e,ui) {
    	console.log("You selected " + months[ui.value] + " (" + ui.value + ")");
    	bar_plot(fileName, ui.value);
        $("#labels-months-output").text( "You selected " + months[ui.value] + " (" + ui.value + ")");
    });
