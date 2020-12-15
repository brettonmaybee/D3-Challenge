// Load data from data.csv
d3.csv("../assets/data/data.csv").then(function(data) {

    console.log(data);
  
    // log a list of state names
  var states = data.map(data => data.state);
  console.log("states", states);
  });

