var margin = {top: 20, right: 20, bottom: 30, left: 50},
    // width = 960 - margin.left - margin.right,
    // height = 500 - margin.top - margin.bottom;
    width = 660 - margin.left - margin.right,
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

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/test2.csv", type, function(error, data) {
	// x.domain(data.map(function(d) { return d.Topics; }));
	// y.domain([0, d3.max(data, function(d) { return d.Count; })]);

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

	// svg.selectAll(".bar")
	//     .data(data)
	//   .enter().append("rect")
	//     .attr("class", "bar")
	//     .attr("x", function(d) { return x(d.Topics); })
	//     .attr("width", x.rangeBand())
	//     .attr("y", function(d) { return y(d.Count); })
	//     .attr("height", function(d) { return height - y(d.Count); });

	svg.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("class","bar")
		.attr("x",20)
		.attr("width",function(d){return x(d.Count); })
		.attr("y",function(d){ return y(d.Topics); })
		.attr("height", y.rangeBand())

});

function type(d) {
  d.Count = +d.Count;
  return d;
}