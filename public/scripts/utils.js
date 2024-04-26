function changeLayout(options) {
  cy.layout(options).run();
}

function refreshLayout() {
  if (displayLayout === "breadthfirst") {
    changeLayout({
      name: "breadthfirst",
      minNodeSpacing: 80,
      avoidOverlap: true,
    });
  } else if (displayLayout === "concentric" || displayLayout === "cola") {
    changeLayout({
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
    });
  } else if (displayLayout === "cise") {
    changeLayout({
      name: "cola",
      infinite: true,
      fit: false,
      maxSimulationTime: 1000, /////////12
      avoidOverlap: true,
      stop: function () {
        console.log("stopped");
        cy.nodes().lock();
      },
      nodeSpacing: function (node) {
        return 10;
      },
    });

    // cy.nodes().lock();
  }
  // else if(displayLayout==="cose-bilkent"){
  //   changeLayout({name:"cose-bilkent"})
  // }
  else if (displayLayout === "dagre") {
    changeLayout({ name: "dagre" });
  }
  //   else if (displayLayout==="avsdf"){
  //     changeLayout({name:"circle",
  //     padding: 30,
  //   avoidOverlap:true,
  //   stop:function (){cy.nodes().lock()}
  // })
  //   }
  else if (displayLayout === "klay") {
      cy.nodes().unlock();
      changeLayout({
            name: "klay",
            klay: {},
          });
      cy.nodes().lock();
  } else if (displayLayout === "ngraph") {
    changeLayout({ name: "cytoscape-ngraph.forcelayout" });
  } else if (displayLayout === "d3-force") {
    changeLayout({ name: "d3-force" });
  }
  // else if(displayLayout==="spread"){
  //   changeLayout({name:"spread"})
  // }
  // else if(displayLayout==="springy"){
  //   changeLayout({name:"springy"})
  // }
  else if (displayLayout === "tidytree") {
    changeLayout({ name: "tidytree" });
  }
}

function displayError() {
  errorAlert.classList.remove("hidden");
  setTimeout(() => {
    errorAlert.classList.add("hidden");
  }, 1000);
}

function displayName(nodesData, nameData, category) {
  console.log("displayName active");
  const relativeSub = nodesData.varietiesData[nameData][0].data.parentSub;
  if (!showNamesList[category].names.includes(relativeSub)) {
    const relativeSubNode = cy.nodes(`[label = '${relativeSub}']`);
    relativeSubNode.trigger("click");
  }

  const selectedName = cy.nodes(`[label = '${nameData}'][type="names"]`);
  selectedName.trigger("click");
}

function displaySub(nodesData, subData) {
  console.log(showNamesList);
  // if(!showNamesList[category].subs.includes(relativeSub)){
  //       const relativeSubNode = cy.nodes(`[label = '${relativeSub}']`)
  //       relativeSubNode.trigger('click');
  //     }
  const selectedName = cy.nodes(`[label = '${subData}'][type="subs"]`);

  selectedName.trigger("click");
}

function popupContent(type, label, typeIndex, data) {
  dragHeaderTitle.innerHTML = `
            ${typeIndex}: ${label}<br>
            `;
  dragCtn.innerHTML = `
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
              ${
                data.growth_cycles.length === 0
                  ? ""
                  : data.growth_cycles.map((cycle, index) => {
                      return `
                <div class="data-list-container">
                  <h2> 生长周期 ${index + 1} </h2>
                  <ul>
                  <li>日子: ${cycle.day}</li>
                  <li>max_日子: ${cycle.max_day}</li>
                  <li>min_日子: ${cycle.min_day}</li>
                  <li>循环: ${cycle.cycle}</li>
                  <li>创建时间: ${cycle.created_at}</li>
                  <li>更新时间: ${cycle.updated_at}</li>
                  <li>删除时间: ${cycle.deleted_at}</li>
               
                  ${
                    cycle.cycle_thresholds.length === 0
                      ? ""
                      : cycle.cycle_thresholds.map((threshold, i) => {
                          return `
                    <div class="data-list-container">
                    <h2>阈值 ${index + 1} - ${i + 1}</h2>
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
                    `;
                        })
                  }
                </ul>
                </div>
                  `;
                    })
              }
            </div>
              `;
  dragDiv.classList.remove("hidden");
}


dragElement(document.getElementById("mydiv2"), "mydiv2header2");
dragElement(document.getElementById("mydiv"), "mydivheader");
function dragElement(elmnt, headerId) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
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
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
