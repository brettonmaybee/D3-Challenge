var svgWidth = 900;
var svgHeight = 600;

var margin = {
  top: 0,
  right: 0,
  bottom: 100,
  left: 80
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv
d3.csv("../assets/data/data.csv").then(function(data) { 
    data.forEach(function(data) {
        data.healthcare= +data.healthcare;
        data.poverty= +data.poverty;
    console.log(data);
    console.log("Abbreviation:",data.abbr);
    console.log("State:", data.state);
    console.log("Poverty:", data.poverty);
    console.log("Healthcare:", data.healthcare);
    });

    // Create scale functions
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(data, d => d.poverty)+2])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([4, d3.max(data, d => d.healthcare)+2])
      .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Create axis functions
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

      // Create Circles
    var circlesGroup=chartGroup.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "15")
      .attr("fill", 'blue')
      .attr("opacity", ".3")
           
     Initialize tool tip
    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(data) {
      return (`${data.state}<br>Poverty: ${data.poverty}<br>healthcare: ${data.healthcare}`);
    //});

    // Create tooltip in the chart
    //chartGroup.call(toolTip);

    // Create event listeners to display and hide the tooltip
     // circlesGroup.on("click", function(data) {
     // toolTip.show(data, this);
    //})
      // onmouseout event
      //.on("mouseout", function(data, index) {
      //  toolTip.hide(data);
      //});

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");

      // Create Abbreviations
    var textGroup=chartGroup.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", d=>xLinearScale(d.poverty)-12)
      .attr("y", d=>yLinearScale(d.healthcare)+7)
      .text(function(data) {
        return (`${data.abbr}`);
      });     

  }).catch(function(error) {
    console.log(error);
  });
