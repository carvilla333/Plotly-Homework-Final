////
// function to build the bar chart and the bubble chart
function chart_function(sample) {

// Using the D3 library to read in samples.json.
d3.json("samples.json").then((data) => {
  var samp= data.samples;
  var array= samp.filter(sampleobject => 
      sampleobject.id == sample);
  var result= array[0]
  var sample_value = result.sample_values;
  var otu_id = result.otu_ids;
  var otu_label = result.otu_labels;

// data for our bar chart assigned to a variable
var horizontal_bar_chart_info =[
  {
    y:otu_id.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
    x:sample_value.slice(0,10).reverse(),
    text:otu_label.slice(0,10).reverse(),
    type:"bar",
    orientation:"h"

  }
];
// data for our bar chart layout assigned to a variable
var bar_chart_layout = {
  title: "",
  margin: { t: 5, l: 150 }
};

Plotly.newPlot("bar", horizontal_bar_chart_info, bar_chart_layout);
// data for our bubble chart layout assigned to a variable
var bubble_chart_layout = {
  margin: { t: 0 },
  xaxis: { title: "OTU ID" },
  hovermode: "closest",
  };
  
// data four our bubble chart assigned to a variable  
var bubble_chart_info = [ 
{
  x: otu_id,
  y: sample_value,
  text: otu_label,
  mode: "markers",
  marker: {
    color: otu_id,
    size: sample_value,
    }
 }
];

Plotly.newPlot("bubble", bubble_chart_info, bubble_chart_layout);
});
}
//
////




////
// Metadata function
function sample_metadata_function(sample) {
  d3.json("samples.json").then((data) => {
    var sample_metadata = data.metadata;
    var metadata_array= sample_metadata.filter(sampleobject => 
      sampleobject.id == sample);
    var result= metadata_array[0]
    var panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });
  });
}
//
////




////
//
function init() {
// this gets refernce for dropdown select element
var select_element = d3.select("#selDataset");

// using sample name list for select option
d3.json("samples.json").then((data) => {
  var sample_name = data.names;
  sample_name.forEach((sample) => {
    select_element
      .append("option")
      .text(sample)
      .property("value", sample);
  });

  // this will use first sample name for initial plots from the list
  const sample_first = sample_name[0];
  chart_function(sample_first);
  sample_metadata_function(sample_first);
});
}
//
////



////
//
function sample_select_change(newSample) {
// we will get new data for new sample selections
chart_function(newSample);
sample_metadata_function(newSample);
}
//
////




// start dashboard
init();
