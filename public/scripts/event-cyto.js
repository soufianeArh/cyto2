cy.on("layoutstop", function (event) {
  console.log("Layout stopped");
  cy.nodes();
  // Additional actions you want to perform when layout stops
});

cy.on("layoutstop", function (event) {
  if (displayLayout === "cise") {
    console.log("here i should lock it cise");
    cy.nodes().lock();
  }
});

tidytreeLayout.addEventListener("click", () => {
  displayLayout = "tidytree";
  cy.edges(`[type="linking"]`).remove();
  cy.add(klayNodes);
  cy.nodes().unlock();
  changeLayout({ name: "tidytree" });
  cy.nodes().lock();
});
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

klayLayout.addEventListener("click", () => {
  displayLayout = "klay";
  cy.edges(`[type="linking"]`).remove();
  cy.add(klayNodes);
  cy.nodes().unlock();
  changeLayout({
    name: "klay",
    klay: {},
  });
  cy.nodes().lock();
});
// avsdfLayout.addEventListener("click",()=>{
//   displayLayout = "avsdf"
//   cy.edges(`[type="linking"]`).remove()
//   cy.nodes().unlock();
//   changeLayout({name : 'avsdf',})
//   cy.nodes().lock();
// })
dagreLayout.addEventListener("click", () => {
  displayLayout = "dagre";
  cy.edges(`[type="linking"]`).remove();
  cy.nodes().unlock();
  changeLayout({ name: "dagre" });
  cy.nodes().lock();
});
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
ciseLayout.addEventListener("click", () => {
  cy.edges(`[type="linking"]`).remove();
  cy.add(linksNodes);
  cy.nodes().unlock();
  displayLayout = "cise";
  changeLayout({ name: "cise" });
  cy.nodes().lock();
});
colaLayout.addEventListener("click", () => {
  cy.add(linksNodes);
  cy.nodes().unlock();
  displayLayout = "cola";
  let layoutOptions = {
    name: "cola",
    infinite: true,
    idealEdgeLength: 5,
    fit: false,
    maxSimulationTime: 10000,
    avoidOverlap: true, //edge though edge
    convergenceThreshold: 0.01,
    nodeSpacing: function (node) {
      return 10;
    },
  };
  changeLayout(layoutOptions);
});
concentricLayout.addEventListener("click", () => {
  let addonsEles = cy.$(`[isAddon = "true"]`);
  addonsEles.remove();
  cy.nodes().unlock();
  cy.edges(`[type="linking"]`).remove();
  displayLayout = "cola";
  let layoutOptions = {
    name: "concentric",
    padding: 15,
    minNodeSpacing: 80,
    avoidOverlap: true,
  };
  changeLayout(layoutOptions);
  cy.nodes().lock();
});

breadLayout.addEventListener("click", () => {
  let addonsEles = cy.$(`[isAddon = "true"]`);
  addonsEles.remove();
  cy.nodes().unlock();
  displayLayout = "breadthfirst";
  cy.edges(`[type="linking"]`).remove();
  let layoutOptions = {
    name: "breadthfirst",
    padding: 15,
    circle: false,
    rankDir: "LR",
    // minNodeSpacing: 50,
    // avoidOverlap: true,
  };
  changeLayout(layoutOptions);
  cy.nodes().lock();
});
// gridLayout.addEventListener("click",()=>{
//   cy.layout({
//     name:"grid"
//   }).run()
//   cy.nodes().lock()
// });



cy.on("click", 'node[type = "subs"]', function (evt) {
  var node = evt.target;
  var label = node.data().label;
  var nodes = [];
  var varieties = [];
  var category = node.data().category;
  console.log("clicked subs", label);
  if (category === "fruits") {
    nodes = nodesFruits.namesData[label];
  } else if (category === "vegetables") {
    nodes = nodesVegetables.namesData[label];
  } else if (category === "others") {
    nodes = nodesOthers.namesData[label];
  }

  if (showNamesList[category].names.includes(label)) {
    nodes.forEach((item) => {
      const removeId = item.data.id;
      cy.remove(`#${removeId}`);
    });
    showNamesList[category].varieties.forEach((item) => {
      item.forEach((item2) => {
        const removeId = item2.data.id;
        cy.remove(`#${removeId}`);
      });
    });

    showNamesList[category].names = showNamesList[category].names.filter(
      (item) => item !== label
    );
    // console.log(  showNamesList[category].names.filter(item => item !== label))
    // console.log(showNamesList[category].names)
    showNamesList[category].varieties = [];

    console.log("delete names", showNamesList);

    refreshLayout();
  } else {
    cy.add(nodes);
    showNamesList[category].names.push(label);
    console.log("add names", showNamesList);
    refreshLayout();
  }

  console.log("clicked " + node.id() + node.data().label);
});
cy.on("click", 'node[type = "names"]', function (evt) {
  var node = evt.target;
  var label = node.data().label;
  var nodes = [];
  var category = node.data().category;
  let popupData = {};
  if (category === "fruits") {
    nodes = nodesFruits.varietiesData[label];
    type = "水果";
  } else if (category === "vegetables") {
    nodes = nodesVegetables.varietiesData[label];
    type = "蔬菜";
  } else if (category === "others") {
    nodes = nodesOthers.varietiesData[label];
    type = "粮油米面";
  }

  if (showNamesList[category].varieties.includes(label)) {
    showNamesList = showNamesList[category].varieties.filter(
      (item) => item !== label
    );
    nodes.forEach((item) => {
      const removeId = item.data.id;
      cy.remove(`#${removeId}`);
    });
    refreshLayout();
  } else {
    showNamesList[category].varieties.push(nodes);
    console.log("add vars", showNamesList);
    cy.add(nodes);
    refreshLayout();
    // popupContent(type, label, "品类")
  }

  console.log("clicked " + node.id() + node.data().label);
});
cy.on("click", 'node[type = "varieties"]', function (evt) {
  var node = evt.target;
  var label = node.data().label;
  var category = node.data().category;
  if (category === "fruits") {
    type = "水果";
  } else if (category === "vegetables") {
    type = "蔬菜";
  } else if (category === "others") {
    type = "粮油米面";
  }
  fetch(
    `https://iot-admin.meseeagro.com/plant_big_data/api/v1/search?plant_name=${label}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      popupContent(type, label, "品种", data.data);
    })
    .catch((err) => console.log("error by catch", err));

  console.log("clicked " + node.id() + node.data().label);
});

cy.on("click", "node", function (event) {
  var clickedNode = event.target;

  var otherNodes = cy.nodes().filter((ele) => ele.id() !== clickedNode.id());
  var relativeEdge = cy.$(`#${clickedNode.data().edgeId}`);
  var otherEdges = cy.edges().filter((ele) => ele.id() !== relativeEdge.id());
  clickedNode.style({
    "background-color": "#FFF",
    color: "#FFF",
  });
  relativeEdge.style({
    "line-color": "#0af",
  });
  otherNodes.style({
    "background-color": "#888", //dark
    color: "#888", //dark
  });
  otherEdges.style({
    "line-color": "#888",
  });
  cy.on("mouseover", "node", function (event) {
    event.target.style("cursor", "pointer");
  });
});

// Restore default cursor when mouse leaves the node
cy.on("mouseout", "node", function (event) {
  event.target.style("cursor", "default");
});
cy.on("zoom", (e) => {
  // console.log(cy.zoom())
  if (cy.zoom() > 0.4) {
    cy.nodes().style("color", "white");
  } else {
    cy.nodes().style("color", "black");
  }
  // console.log(cy.zoom())
});
removePopup.addEventListener("click", () => {
  dragDiv.classList.add("hidden");
});

centerBtn.addEventListener("click", () => {
  cy.center();
  cy.zoom(1.2);
});

