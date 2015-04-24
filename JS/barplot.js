	var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    // width = 960 - margin.left - margin.right,
	    // height = 500 - margin.top - margin.bottom;
	    width = 300 - margin.left - margin.right,
	    height = 300 - margin.top - margin.bottom;
	// var x = d3.scale.ordinal()
	//     .rangeRoundBands([0, width], .1);

	var y = d3.scale.ordinal()
		.rangeRoundBands([0,height], .1)


	// var y = d3.scale.linear()
	//     .range([height, 0]);

	var x = d3.scale.linear()
		.range([0,width]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .ticks(10);


	var mapContainer = d3.select("body")
	// .append("svg")
	// 	.attr("width",1000)
	// 	.attr("height",1000)
	.append("object")
		.attr("type","image/svg+xml")
		.attr("data","data/Association_of_National_Olympic_Committees.svg")

	var svgContainer = d3.select("body").append("svg")
		.attr("class","container")
		.attr("width",  700 + width + margin.left + margin.right)
	    .attr("height",  200 + height + margin.top + margin.bottom)

	// var world_map = svgContainer.append("g")
	// 	.attr("transform", "translate(" + 20 + "," + margin.top + ")")
	// 	.append("text")
	// 	.text("Map Under Construction");

	// <object type="image/svg+xml" data="data/Association_of_National_Olympic_Committees.svg">Your browser does not support SVG</object>


	// var world_map =  svgContainer.append("svg")
	// 	.attr("width",  1000)
	// 	.attr("height",  1000)
	// 	.attr("transform", "translate(" + 20 + "," + margin.top + ")")
	// .append("object")
	// 	.attr("type","image/svg+xml")
	// 	.attr("data","data/Association_of_National_Olympic_Committees.svg")
	// console.log("lalalalala")
	


		// pot the bars
	var svg = svgContainer
	  .append("g")
	    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	    .attr("transform", "translate(" + 700 + "," + margin.top + ")");

	var fileName = "data/test2.csv";

	var bar_plot = function(file) {
		d3.csv(file, type, function(error, data) {

			x.domain([0,d3.max(data,function(d){return d.Count;})]);
			y.domain(data.map(function(d){return d.Topics;}));

			console.log(data);

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
				.data(data)
				.enter().append("rect")
				.attr("class","bar")
				.attr("x",2)
				.attr("width",function(d){return x(d.Count); })
				.attr("y",function(d){ return y(d.Topics); })
				.attr("height", y.rangeBand())

		});
	};
	
	bar_plot(fileName);

	var slider2 = d3.select("body").append("div")
		.attr("class","sliderContainer")
		.append("div")
		.attr("class","slider");

	// set up an array to hold the months
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	// lets be fancy for the demo and select the current month.
	var activeMonth = new Date().getMonth();

	console.log(activeMonth);

	$(".slider")
	                    
	    // activate the slider with options
	    .slider({ 
	        min: 0, 
	        max: months.length-1, 
	        value: activeMonth 
	    })
	                    
	    // add pips with the labels set to "months"
	    .slider("pips", {
	        rest: "label",
	        labels: months
	    })
	                    
	    // and whenever the slider changes, lets echo out the month
	    .on("slidechange", function(e,ui) {
	        $("#labels-months-output").text( "You selected " + months[ui.value] + " (" + ui.value + ")");
	    });


	// $(".slider").slider().slider("pips",{
	// });

	function type(d) {
	  d.Count = +d.Count;
	  return d;
	}