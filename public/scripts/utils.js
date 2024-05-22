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

function aggregateData(fetched, counter){
  if(counter===0){
    aggregatedData = {};
  }
  fetched.reverse().forEach(item =>{
  const { report_time, market, highest_price } = item;
  if(!aggregatedData[market]){
    aggregatedData[market] = []
  }
    aggregatedData[market].push([new Date(report_time).toLocaleDateString(), parseFloat(highest_price)])
});
}
function formatData(counter){
  if(counter===0){
    series_high = [];
  }
  for (const market in aggregatedData) {
    let filterArray = series_high.filter(item=> item.name === market.substring(0, market.length - 4))
    if(filterArray.length > 0){
      filterArray[0].points = aggregatedData[market];
    }else{
      series_high.push({
            name: market.substring(0, market.length - 4),
            points: aggregatedData[market],
            spine_label_visible: false,
            spine_label_text: ''
        });
    };
    }
 }
 function updateSlider(){
  //update slider
  let newRangeMin = series_high[1].points[series_high[1].points.length - 1][0];
  console.log("new range min",newRangeMin)
  //jscharting format MM-DD-YYYY NEED TO CONVERT TO nouislider format YYYY-MM-DD
  let [month, day, year] = newRangeMin.split('/');
  if(month.length===1){month = `0${month}`};
  if(day.length===1){month = `0${day}`}

  console.log(newRangeMin, "covertto", `${year}-${month}-${day}T00:00:00Z`);
  let newMinValue =  new Date(`${year}-${month}-${day}T00:00:00Z`).getTime()
  dateSlider.noUiSlider.updateOptions({
     start: [ currentStartDate, currentEndDate],
connect: true,
tooltips: [true, true],
  range: {
    'min': newMinValue,
   'max': new Date().getTime()
 },
 format: {
  to: function(value) {
                console.log("from to value", value)
                const date = new Date(value);
                 console.log("from to", date)
                return date.toISOString().split('T')[0];
            },
  from: function(value) {
                return value;
            }
}, 
 }, false)
 }

 function updateChart(options, name){
  let chart = JSC.chart('chart-container', { 
    legend_position: 'top',
    legend:{
      template: "%icon %name",    },
 debug: false, 
 type: 'line spline', 
 defaultCultureName: "zh-CN",
 legend_visible: true, 
 fill:"#BEBFC1",
 chartArea_fill: "red",
//  defaultPoint_label_hide:true,

// defaultAxis: {
//   defaultTick_gridLine_visible: false,
//   alternateGridFill: "none"
// },
// title_fill: ["#FF0000", "darken", "lightenMore", 90],//works
 chartArea: {
               fill: '#BEBFC1'  // Set your desired background color here
           },
           outline: {         // Set your desired frame (border) color and style here
                   color: '#ffffff',  // Frame (border) color
                   width: 10          // Frame (border) width in pixels
               }
             ,
 xAxis: { 
   crosshair_enabled: true, 
   monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
   scale: { 
     type: 'time',
     advanced: {
                   rangeSelector: {
                       enabled: true,
                       from: '2023-12-29',
                       to: "2024-05-21"
                   }
               } } 
   }, 
 yAxis: [{
   label_text: '价格 (¥)',
   orientation: 'opposite',
   formatString: 'a'
 },
 {
  //Define a secondary axis on the right to host lastPoint ticks.
  id: "secondY",
  defaultTick_enabled: false,
  scale_syncWith: "mainY",
  orientation: "right"
}
],
 defaultSeries: {
    firstPoint_label_text: '<b>%seriesName</b>',
    defaultPoint_marker: {
     type: 'circle',
     size: 8,
     fill: 'white',
     outline: { width: 2, color: 'currentColor' }
   }
 }, 
 title_label_text: `
 ${name}: 价格从${new Date(currentStartDate).toISOString().split('T')[0]}到${new Date(currentEndDate).toISOString().split('T')[0]}`,
 series: options,
 defaultSeries: {
  defaultPoint_marker: { visible: false, type: "circle" },
  firstPoint: { marker_visible: true, label_text: "%yValue" },
  lastPoint: {
    //Add axis ticks for the last point of each series.
    yAxisTick: {
      axisId: "secondY",
      label_text: "%icon %seriesName"
    },
    marker_visible: true,
    label_text: "%yValue"
  },
  
},


}); 

}

function initSlider(){
  noUiSlider.create(dateSlider, {
    start: [ new Date().getTime(), new Date().getTime()],
    connect: true,
    tooltips: [true, true],
    range: {
         //'min': new Date('2023-12-19').getTime(),
        'min': currentStartDate,
        'max': currentEndDate
    },
    format: {
      to: function(value) {
                    // console.log("from to value", value)
                    const date = new Date(value);
                    // console.log("from to", date)
                    return date.toISOString().split('T')[0];
                },
      from: function(value) {
                    return value;
                }
    },
});
dateSlider.noUiSlider.on('change', function(values, handle) {
  currentStartDate = new Date(values[0]).getTime();
  currentEndDate = new Date(values[1]).getTime();
    //get the data of that specific time
    //['2024-04-11', '2024-05-15']
    const startDate = new Date(values[0]);
const endDate = new Date(values[1]);
const filteredData = series_high.map(market => {
    return {
        name: market.name,
        points: market.points.filter(point => {
            const pointDate = new Date(point[0]);
            return pointDate >= startDate && pointDate <= endDate;
        })
    };
});
updateChart(filteredData, selectedLabel)

});
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
