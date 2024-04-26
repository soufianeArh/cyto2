console.log("nodesFruits from ", nodesFruits)
const logoutBtn = document.getElementById("logout-btn")
logoutBtn.addEventListener(
  "click",()=>{
    console.log("logout")
    fetch("http://localhost:3000/logout")
  })


var linksNodes = [
  {data:{id:"linked1", type:"linking", source:"vegetables", target:"fruits"}, classes: 'sube'},
  {data:{id:"linked2", type:"linking", source:"vegetables", target:"others"}, classes: 'sube'},
  {data:{id:"linked3", type:"linking", source:"others", target:"fruits"}, classes: 'sube'},
 ];
var klayNodes = [
  {data:{id:"linkKlay"}},
  {data:{id:"linked1-klay", type:"linking", source:"linkKlay", target:"fruits"}, classes: 'sube'},
  {data:{id:"linked2-klay", type:"linking", source:"linkKlay", target:"others"}, classes: 'sube'},
  {data:{id:"linked3-klay", type:"linking", source:"linkKlay", target:"vegetables"}, classes: 'sube'},
]
 


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
//Layout events
function changeLayout (options){
cy.layout(options).run()
}
cy.on('layoutstop', function(event) {
console.log('Layout stopped');
cy.nodes()
// Additional actions you want to perform when layout stops
});
var displayLayout = "cola"
function refreshLayout (){
if(displayLayout === "breadthfirst"){
  changeLayout({name:"breadthfirst",  
  minNodeSpacing: 80,
   avoidOverlap: true,})
}else if(displayLayout === "concentric" || displayLayout === "cola"){
  changeLayout({
  name: 'cola',
  infinite: true,
  idealEdgeLength: 5,
  fit:false,
  maxSimulationTime:10000,
  avoidOverlap: true, //edge though edge
  convergenceThreshold: 0.01,
  nodeSpacing: function( node ){ return 10; },
})
}else if(displayLayout==="cise"){
  changeLayout({
  name:"cola",
  infinite: true,
  fit:false,
  maxSimulationTime: 1000, /////////12
  avoidOverlap: true,
  stop: function(){
    console.log("stopped")
     cy.nodes().lock()
    },
  nodeSpacing: function( node ){ return 10; }
});

  // cy.nodes().lock();
}
// else if(displayLayout==="cose-bilkent"){
//   changeLayout({name:"cose-bilkent"})
// }
else if(displayLayout==="dagre"){
  changeLayout({name:"dagre"})
}
//   else if (displayLayout==="avsdf"){
//     changeLayout({name:"circle",
//     padding: 30,
//   avoidOverlap:true,
//   stop:function (){cy.nodes().lock()}
// })
//   }
else if(displayLayout==="klay"){
  changeLayout({name:"klay"})
}else if(displayLayout==="ngraph"){
  changeLayout({name:"cytoscape-ngraph.forcelayout"})
}else if(displayLayout==="d3-force"){
  changeLayout({name:"d3-force"})
}
// else if(displayLayout==="spread"){
//   changeLayout({name:"spread"})
// }
// else if(displayLayout==="springy"){
//   changeLayout({name:"springy"})
// }
else if (displayLayout==="tidytree"){
  changeLayout({name:"tidytree"})
}
}
cy.on('layoutstop', function(event) {
if(displayLayout==="cise"){
  console.log("here i should lock it cise")
  cy.nodes().lock();
}
});
const colaLayout = document.getElementById("cola-layout");
const concentricLayout = document.getElementById("concentric-layout");
// const gridLayout = document.getElementById("grid-layout");
const breadLayout = document.getElementById("bread-layout");
const ciseLayout = document.getElementById("cise-layout");
// const d3ForceLayout = document.getElementById("d3Force-layout");
// const bilkentLayout = document.getElementById("bilkent-layout");
const dagreLayout = document.getElementById("dagre-layout");
// const avsdfLayout = document.getElementById("avsdf-layout");
const klayLayout = document.getElementById("klay-layout");
// const ngraphLayout = document.getElementById("ngraph-layout");
// const spreadLayout = document.getElementById("spread-layout");
// const springyLayout = document.getElementById("springy-layout");
const tidytreeLayout= document.getElementById("tidytree-layout");
tidytreeLayout.addEventListener("click",()=>{
displayLayout = "tidytree"
cy.edges(`[type="linking"]`).remove()
cy.add(klayNodes)
cy.nodes().unlock();
changeLayout({name : 'tidytree',})
cy.nodes().lock();
})
// springyLayout.addEventListener("click",()=>{
//   displayLayout = "springy"
//   console.log("springy")
//   // cy.edges(`[type="linking"]`).remove()
//   cy.nodes().unlock();
//   changeLayout({name : 'springy',})
//   cy.nodes().lock();
// })
// spreadLayout.addEventListener("click",()=>{
//   displayLayout = "spread"
//   cy.edges(`[type="linking"]`).remove()
//   cy.nodes().unlock();
//   changeLayout({name : 'spread',})
//   cy.nodes().lock();
// })
// ngraphLayout.addEventListener("click",()=>{
//   displayLayout = "ngraph"
//   cy.edges(`[type="linking"]`).remove()
//   cy.nodes().unlock();
//   changeLayout({name : 'cytoscape-ngraph.forcelayout',})
//   cy.nodes().lock();
// })

klayLayout.addEventListener("click",()=>{
displayLayout = "klay"
cy.edges(`[type="linking"]`).remove()
cy.add(klayNodes)
cy.nodes().unlock();
changeLayout({
  name : 'klay',
  klay:{


}})
cy.nodes().lock();
})
// avsdfLayout.addEventListener("click",()=>{
//   displayLayout = "avsdf"
//   cy.edges(`[type="linking"]`).remove()
//   cy.nodes().unlock();
//   changeLayout({name : 'avsdf',})
//   cy.nodes().lock();
// })
dagreLayout.addEventListener("click",()=>{
displayLayout = "dagre"
cy.edges(`[type="linking"]`).remove()
cy.nodes().unlock();
changeLayout({name : 'dagre',})
cy.nodes().lock();
})
// bilkentLayout.addEventListener("click",()=>{
//   displayLayout = "cose-bilkent"
//   cy.add(linksNodes)
//   cy.nodes().unlock();
//   changeLayout({name : 'cose',})
//   cy.nodes().lock();
// })
//  d3ForceLayout.addEventListener("click", ()=>{
//     cy.add(linksNodes)
//     cy.nodes().unlock();
//     displayLayout = "d3-force"
//     changeLayout({name : 'd3-force',});

//   }) 
ciseLayout.addEventListener("click",()=>{
cy.edges(`[type="linking"]`).remove()
cy.add(linksNodes)
cy.nodes().unlock();
displayLayout = "cise"
changeLayout({name : 'cise',})
cy.nodes().lock();

})
colaLayout.addEventListener("click",()=>{
cy.add(linksNodes)
cy.nodes().unlock();
displayLayout = "cola"
let layoutOptions = {
  name: 'cola',
  infinite: true,
  idealEdgeLength: 5,
  fit:false,
  maxSimulationTime:10000,
  avoidOverlap: true, //edge though edge
  convergenceThreshold: 0.01,
  nodeSpacing: function( node ){ return 10; },
};
changeLayout(layoutOptions)
})
concentricLayout.addEventListener("click",()=>{
let addonsEles = cy.$(`[isAddon = "true"]`)
addonsEles.remove()
cy.nodes().unlock();
cy.edges(`[type="linking"]`).remove()
displayLayout = "cola"
let layoutOptions = {
  name:"concentric",
  padding: 15,
  minNodeSpacing: 80,
   avoidOverlap: true,
}
changeLayout(layoutOptions)
cy.nodes().lock();
});

breadLayout.addEventListener("click",()=>{
let addonsEles = cy.$(`[isAddon = "true"]`)
addonsEles.remove();
cy.nodes().unlock();
displayLayout = "breadthfirst";
cy.edges(`[type="linking"]`).remove()
let layoutOptions = {
  name:"breadthfirst",
  padding: 15,
  circle: false,
  rankDir: 'LR'
  // minNodeSpacing: 50,
  // avoidOverlap: true,
}
changeLayout(layoutOptions)
cy.nodes().lock();
})
// gridLayout.addEventListener("click",()=>{
//   cy.layout({
//     name:"grid"
//   }).run()
//   cy.nodes().lock()
// });

//not found 
const errorAlert = document.getElementById("error-id");
function displayError(){
errorAlert.classList.remove("hidden")
  setTimeout(() => {
    errorAlert.classList.add("hidden")
  }, 1000);
}
//name seatch
const headerInput2 = document.getElementById("header-search-input2");
const headerSearch2 = document.getElementById("header-search-btn2");
function displayName(nodesData, nameData, category ) {
console.log("displayName active")
const relativeSub = nodesData.varietiesData[nameData][0].data.parentSub;
    if(!showNamesList[category].names.includes(relativeSub)){
      const relativeSubNode = cy.nodes(`[label = '${relativeSub}']`)
      relativeSubNode.trigger('click');
    }
 
    const selectedName = cy.nodes(`[label = '${nameData}'][type="names"]`)
    selectedName.trigger('click');
}
headerSearch2.addEventListener("click",()=>{
console.log("headerSearch2 clicked", headerInput2.value);
if (nodesFruits.varietiesData[headerInput2.value]){
   displayName(nodesFruits, headerInput2.value, "fruits")
}else if (nodesVegetables.varietiesData[headerInput2.value]){
  displayName(nodesVegetables, headerInput2.value, "vegetables")
}else if (nodesOthers.varietiesData[headerInput2.value]){
  displayName(nodesOthers, headerInput2.value, "others")
}else{
  displayError()
}
})
//sub seatch
const headerInput = document.getElementById("header-search-input");
const headerSearch = document.getElementById("header-search-btn");
function displaySub(nodesData, subData ) {
console.log(showNamesList)
// if(!showNamesList[category].subs.includes(relativeSub)){
//       const relativeSubNode = cy.nodes(`[label = '${relativeSub}']`)
//       relativeSubNode.trigger('click');
//     }
    const selectedName = cy.nodes(`[label = '${subData}'][type="subs"]`);

    selectedName.trigger('click');
}
headerSearch.addEventListener("click",()=>{
console.log("headerSearch2 clicked", headerInput2.value);
if (nodesFruits.namesData[headerInput.value]){
   displaySub(nodesFruits, headerInput.value)
}else if (nodesVegetables.namesData[headerInput.value]){
  displaySub(nodesVegetables, headerInput.value)
}else if (nodesOthers.namesData[headerInput.value]){
  displaySub(nodesOthers, headerInput.value)
}else {
   displayError()
}
})


var showNamesList = {
fruits:{names:[], varieties:[]},
vegetables:{names:[], varieties:[]},
others:{names:[], varieties:[]}
}
const dragDiv = document.getElementById("mydiv");
const dragHeaderTitle = document.getElementById("mydivheader-title")
const dragCtn = document.getElementById("drag-ctn");

function popupContent (type, label, typeIndex, data){
dragHeaderTitle.innerHTML=`
${typeIndex}: ${label}<br>
`
dragCtn.innerHTML =  `
<div class="drag-item">
  <i class="fa-solid fa-handshake"></i>
  <p>类别: ${type}</p>
</div>
<div class="drag-item">
  <i class="fa-solid fa-certificate"></i>
  <p> ${typeIndex} : ${label}</p>
</div>
<div class="data-list-container">
  <h2>植物信息</h2>
   <li>ID:  ${data.id}</li>
   <li>等级: ${data.level}</li>
   <li>种类:  ${data.sort}</li>
   <li>创建时间: ${data.created_at}</li>
   <li>更新时间: ${data.updated_at}</li>
   <li>删除时间: ${data.deleted_at}</li>
  ${data.growth_cycles.length === 0  ?
    ""
    :
    data.growth_cycles.map((cycle, index)=>{
      return `
    <div class="data-list-container">
      <h2> 生长周期 ${index +1} </h2>
      <ul>
      <li>日子: ${cycle.day}</li>
      <li>max_日子: ${cycle.max_day}</li>
      <li>min_日子: ${cycle.min_day}</li>
      <li>循环: ${cycle.cycle}</li>
      <li>创建时间: ${cycle.created_at}</li>
      <li>更新时间: ${cycle.updated_at}</li>
      <li>删除时间: ${cycle.deleted_at}</li>
   
      ${cycle.cycle_thresholds.length === 0 ?
      ""
      :
      cycle.cycle_thresholds.map((threshold, i)=>{
        return`
        <div class="data-list-container">
        <h2>阈值 ${index +1} - ${i+1}</h2>
        <ul>
              <li>光强度_h: ${threshold.light_intensity_h}</li>
              <li>光强度_l: ${threshold.light_intensity_l}</li>
              <li>光照时间_h: ${threshold.light_time_h}</li>
              <li>光照时间_l: ${threshold.light_time_l}</li>
              <li>温度_h: ${threshold.temp_h}</li>
              <li>温度_l: ${threshold.temp_l}</li>
              <li>湿度_h: ${threshold.humidity_h}</li>
              <li>湿度_l: ${threshold.humidity_l}</li>
              <li>voc_h: ${threshold.voc_h}</li>
              <li>voc_l: ${threshold.voc_l}</li>
              <li>pm2_5_h: ${threshold.pm2_5_h}</li>
              <li>pm2_5_l: ${threshold.pm2_5_l}</li>
              <li>pm10_h: ${threshold.pm10_h}</li>
              <li>pm10_l: ${threshold.pm10_l}</li>
              <li>ch2o_h: ${threshold.ch2o_h}</li>
              <li>ch2o_l: ${threshold.ch2o_l}</li>
              <li>co2_h: ${threshold.co2_h}</li>
              <li>co2_l: ${threshold.co2_l}</li>
              <li>土壤温度_h: ${threshold.soil_temp_h}</li>
              <li>土壤温度_l: ${threshold.soil_temp_l}</li>
              <li>土壤湿度_h: ${threshold.soil_humidity_h}</li>
              <li>土壤湿度_l: ${threshold.soil_humidity_l}</li>
              <li>soil_ec_h: ${threshold.soil_ec_h}</li>
              <li>soil_ec_l: ${threshold.soil_ec_l}</li>
              <li>土壤ph_h: ${threshold.soil_ph_h}</li>
              <li>土壤ph_l: ${threshold.soil_ph_l}</li>
              <li>soil_an_h: ${threshold.soil_an_h}</li>
              <li>soil_an_l: ${threshold.soil_an_l}</li>
              <li>soil_tn_h: ${threshold.soil_tn_h}</li>
              <li>soil_tn_l: ${threshold.soil_tn_l}</li>
              <li>soil_ap_h: ${threshold.soil_ap_h}</li>
              <li>soil_ap_l: ${threshold.soil_ap_l}</li>
              <li>soil_ak_h: ${threshold.soil_ak_h}</li>
              <li>soil_ak_l: ${threshold.soil_ak_l}</li>
              <li>创建时间: ${threshold.created_at}</li>
              <li>更新时间: ${threshold.updated_at}</li>
              <li>删除时间: ${threshold.deleted_at}</li>
            </ul>
            </div>
        `
      })
      }
    </ul>
    </div>
      `
    })
    }
</div>
  `
  dragDiv.classList.remove("hidden")
}
cy.on('click', 'node[type = "subs"]', function(evt){
    var node = evt.target;
    var label = node.data().label;
    var nodes = [];
    var varieties = [];
    var category = node.data().category
    console.log("clicked subs", label)
    if(category==="fruits"){
       nodes = nodesFruits.namesData[label];
    }else if(category==="vegetables"){
       nodes = nodesVegetables.namesData[label]
    }else if(category==="others"){
      nodes = nodesOthers.namesData[label]
    }

    if(showNamesList[category].names.includes(label)){
      
      nodes.forEach(item =>{
        const removeId = item.data.id;
        cy.remove(`#${removeId}`)
      })
      showNamesList[category].varieties.forEach(item =>{
        item.forEach(item2=>{
              const removeId = item2.data.id;
               cy.remove(`#${removeId}`)
        })
      })

      showNamesList[category].names = showNamesList[category].names.filter(item => item !== label);
      // console.log(  showNamesList[category].names.filter(item => item !== label))
      // console.log(showNamesList[category].names)
      showNamesList[category].varieties = []
      
      console.log("delete names",showNamesList)

      refreshLayout();
    }else{
      cy.add(nodes);
      showNamesList[category].names.push(label);
      console.log("add names",showNamesList)
      refreshLayout();
    }

console.log( 'clicked ' + node.id() + node.data().label );
});
cy.on('click', 'node[type = "names"]', function(evt){
    var node = evt.target;
    var label = node.data().label;
    var nodes = [];
    var category = node.data().category;
    let popupData={};
    if(category==="fruits"){
       nodes = nodesFruits.varietiesData[label];
       type="水果"
    }else if(category==="vegetables"){
       nodes = nodesVegetables.varietiesData[label];
       type="蔬菜"
    }else if(category==="others"){
      nodes = nodesOthers.varietiesData[label];
      type="粮油米面"
    }

    if(showNamesList[category].varieties.includes(label)){
      showNamesList = showNamesList[category].varieties.filter(item => item !== label);
      nodes.forEach(item =>{
        const removeId = item.data.id;
        cy.remove(`#${removeId}`)
      })
      refreshLayout();
    }else{
      showNamesList[category].varieties.push(nodes);
      console.log("add vars",showNamesList)
      cy.add(nodes);
      refreshLayout();
      // popupContent(type, label, "品类")
      
    }

console.log( 'clicked ' + node.id() + node.data().label );
});
cy.on('click', 'node[type = "varieties"]', function(evt){
    var node = evt.target;
    var label = node.data().label;
    var category = node.data().category;
    if(category==="fruits"){
       type="水果"
    }else if(category==="vegetables"){
       type="蔬菜"
    }else if(category==="others"){
      type="粮油米面"
    }
    fetch(`https://iot-admin.meseeagro.com/plant_big_data/api/v1/search?plant_name=${label}`)
   .then(res=> res.json())
   .then(data=> {
    console.log(data);
    popupContent(type, label, "品种", data.data)
  })
   .catch(err=> console.log("error by catch", err))
     

console.log( 'clicked ' + node.id() + node.data().label );
});

//chanche style for clicked node
cy.on('click', 'node', function(event){
var clickedNode = event.target;

var otherNodes = cy.nodes().filter((ele)=>  ele.id() !== clickedNode.id())
var relativeEdge = cy.$(`#${ clickedNode.data().edgeId }`)
var otherEdges = cy.edges().filter((ele)=> ele.id() !== relativeEdge.id())
 clickedNode.style({
  'background-color': '#FFF',
  'color': '#FFF'
 });
 relativeEdge.style({
    'line-color': '#0af',
  })
 otherNodes.style({
  'background-color': '#888', //dark
  'color': '#888', //dark
 })
 otherEdges.style({
  'line-color': '#888',
 })
cy.on('mouseover', 'node', function(event) {
 event.target.style('cursor', 'pointer');
});})





// Restore default cursor when mouse leaves the node
cy.on('mouseout', 'node', function(event) {
event.target.style('cursor', 'default');
});



cy.on("zoom", (e)=>{
// console.log(cy.zoom())
if(cy.zoom() > 0.4){
cy.nodes().style('color', 'white');
}else{
cy.nodes().style('color', 'black');
}
// console.log(cy.zoom())
});
function addFlag (category, color){
cy.nodeHtmlLabel([
{query: `#${category}`,
valign: "center",
halign: "center",
valignBox: "center",
halignBox: "center",
backgroundColor:"blue",
tpl: function(data) {
   return `<i class="fa-solid fa-flag" style="color:${color} ; font-size: 14px;"></i>`

}},])
}
addFlag("fruits","#761e50")
addFlag("vegetables","#286d1d")
addFlag("others","#cdb57e")
const removePopup = document.getElementById("compress-remove");
removePopup.addEventListener("click",()=>{
dragDiv.classList.add('hidden');
})
dragElement(document.getElementById("mydiv2"), "mydiv2header2");
dragElement(document.getElementById("mydiv"), "mydivheader");
function dragElement(elmnt, headerId) {
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
if (document.getElementById(headerId)) {
// if present, the header is where you move the DIV from:
document.getElementById(headerId).onmousedown = dragMouseDown;
} else {
// otherwise, move the DIV from anywhere inside the DIV:
elmnt.onmousedown = dragMouseDown;
}

function dragMouseDown(e) {
e = e || window.event;
e.preventDefault();
// get the mouse cursor position at startup:
pos3 = e.clientX;
pos4 = e.clientY;
document.onmouseup = closeDragElement;
// call a function whenever the cursor moves:
document.onmousemove = elementDrag;
}

function elementDrag(e) {
e = e || window.event;
e.preventDefault();
// calculate the new cursor position:
pos1 = pos3 - e.clientX;
pos2 = pos4 - e.clientY;
pos3 = e.clientX;
pos4 = e.clientY;
// set the element's new position:
elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
}

function closeDragElement() {
// stop moving when mouse button is released:
document.onmouseup = null;
document.onmousemove = null;
}
}
//centers events
const centerBtn = document.getElementById("center-btn");
centerBtn.addEventListener("click",()=>{
cy.center()
cy.zoom(1.2)
});
//exports events
const exportPNG = document.getElementById("export-png");
exportPNG.addEventListener("click",()=>{
let link = document.createElement("a");
link.href = cy.png();
link.download = 'image_filename.png';
link.click()
})
const exportJPG = document.getElementById("export-jpg");
exportPNG.addEventListener("click",()=>{
let link = document.createElement("a");
link.href = cy.jpg();
link.download = 'image_filename.jpg';
link.click()
})
const exportJSON = document.getElementById("export-json");
exportJSON.addEventListener("click",()=>{
let link = document.createElement("a");
link.href = cy.json();
link.download = 'image_filename.json';
link.click()
})
const compassUp = document.getElementById("compass-up");
const compassDown = document.getElementById("compass-down")
const compassLeft = document.getElementById("compass-left")
const compassRight = document.getElementById("compass-right")
compassUp.addEventListener("click", ()=>{
var currentX = cy.pan().x;
var currentY = cy.pan().y;
cy.pan({x: currentX, y: currentY-20});
})
compassDown.addEventListener("click", ()=>{
var currentX = cy.pan().x;
var currentY = cy.pan().y;
cy.pan({x: currentX, y: currentY+20});
})
compassLeft.addEventListener("click", ()=>{
var currentX = cy.pan().x;
var currentY = cy.pan().y;
cy.pan({x: currentX-20, y: currentY});
})
compassRight.addEventListener("click", ()=>{
var currentX = cy.pan().x;
var currentY = cy.pan().y;
cy.pan({x: currentX+20, y: currentY});
})
