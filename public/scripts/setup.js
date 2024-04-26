var cy = cytoscape({
      container: document.getElementById('cy'),
wheelSensitivity: 0.3,
animate: true,
refresh: 1,
zoomingEnabled: true,
layout: {
name: 'cola',
infinite: true,
idealEdgeLength: 5,
fit:false,
maxSimulationTime:10000,
avoidOverlap: true, //edge though edge
convergenceThreshold: 0.01,
nodeSpacing: function( node ){ return 10; },
},
style:  [
{
selector: 'node',
style: {
'color': 'white',//label used to be black to not show
'background-color': '#FFF',//node
'label': 'data(label)',
'font-size': '8px',
'width': '6px', // Set width of special nodes
'height': '6px',
cursor: 'pointer'
}
},
{
selector: '.sube1',
style: {
edgeLength: 50,
idealEdgeLength: 100
}
},
{
selector: '#box',
style: {
'shape': 'rectangle',
'color': 'white',
'text-wrap': 'wrap',
// 'background-color': '#0F0F1C',// color is same as canvas~bg
'background-color': '#f00',
'label': 'data(content)',
'width': '200px', // Set width of special nodes
'height': '200px',
'font-size': '16px',
// 'font-weight': 'bold',
'color': "beige",
// 'content': 'data(content)',
'text-valign': 'center',
}
},{
selector: 'edge',
style: {
'line-color': ' #888',
// 'target-arrow-color': '#ccc',
// 'target-arrow-shape': 'triangle',
'curve-style': 'unbundled-bezier',
'target-arrow-width': 1 ,
'control-point-distance': 5,//curvy ratio
'width': '0.5px', // Set width of special nodes
}
},
{
selector: '.linkedge',
style: {
'width': '1px',
'control-point-distance': 20,//curvy ratio
}
},{
selector: '.category',
style: {
'background-color': 'blue',
'font-size': '18px',
"marginBottom":"10px"
}
},
{
selector: '#parent1',
style: {
'background-color': 'blue'
}
},
{
selector: '#centere1',
style: {
length: 700,
"curve-style": 'unbundled-bezier',//curvy style
'control-point-distance': 10,//curvy ratio
'control-point-weight': 0.5//ratio of how much it will invade target
}
},
{
selector: '.orange',
style: {
'color': 'black',//label
'background-color': '#f60',//node
'display':"none"
}
},
{
selector: '.litchi',
style: {
'color': 'black',//label


}
}
],
elements:[
nodesFruits.category,
...nodesFruits.subsData,
nodesVegetables.category,
...nodesVegetables.subsData,
nodesOthers.category,
...nodesOthers.subsData,
...linksNodes
]
});

function addFlag(category, color) {
      cy.nodeHtmlLabel([
        {
          query: `#${category}`,
          valign: "center",
          halign: "center",
          valignBox: "center",
          halignBox: "center",
          backgroundColor: "blue",
          tpl: function (data) {
            return `<i class="fa-solid fa-flag" style="color:${color} ; font-size: 14px;"></i>`;
          },
        },
      ]);
    }
    addFlag("fruits", "#761e50");
    addFlag("vegetables", "#286d1d");
    addFlag("others", "#cdb57e");