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
    console.log(person);
    
    var trace = {
      y: person[0].otu_ids.slice(0,10),
      x :person[0].sample_values.slice(0,10),
      type: "bar",
      orientation: "h"
    };
    Plotly.newPlot("bar",[trace])

  });
}

  barAndBubble('940');