dataset = d3.json("../../samples.json");
console.log(dataset);

function unpack(rows, index) {
  return rows.map(row => row[index]);
}

// add the names as options in my HTML
function addOption(){
  d3.json("../../samples.json").then(function(data){
    console.log(data)
    var people = data.names;
    console.log(people);
    people.forEach(function(person){
      var select = document.getElementById('selDataset');
      var option = document.createElement('option');
      option.value = person;
      option.innerHTML = person;
      select.appendChild(option);
      console.log(option);
    });

});
};
addOption();

// d3.select("#selDataset").property("value") =  dataset.names
d3.selectAll("#selDataset").on("change", barAndBubble);

function barAndBubble(){
  d3.json("../../samples.json").then(function(samp) {
    var idSelected = d3.select("#selDataset").property("value");
    var person = samp.samples.filter(person => person.id === idSelected);
    // console.log(person[0].otu_ids.slice(0,10).map(d=>`OTU-${d}`));
    // console.log(person[0].otu_ids.slice(0,10).map(String));
    
    var tableData = samp.metadata.filter(person => person.id == idSelected);
    var tableLoc = d3.select("#sample-metadata");
    tableLoc.html("");
    Object.entries(tableData[0]).forEach(function([key,value]){
      tableLoc.append('p').text(`${key} : ${value}`)
    });
    

    var trace = {
      y: person[0].otu_ids.slice(0,10).map(d=>`OTU-${d}`).reverse(),
      x :person[0].sample_values.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
    };
    Plotly.newPlot("bar",[trace])

    var trace1 = {
      y: person[0].sample_values,
      x: person[0].otu_ids,
      text: person[0].otu_labels,
      mode: 'markers',
      marker: {
        size: person[0].sample_values,
        color: person[0].otu_ids
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Marker Size',
      showlegend: false,
      height: 600,
      width: 1200
    };
    
    Plotly.newPlot('bubble', data, layout);

  });
}

  barAndBubble('940');