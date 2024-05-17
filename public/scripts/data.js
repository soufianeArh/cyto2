var linksNodes = [
      {data:{id:"linked1", type:"linking", source:"vegetables", target:"fruits"}, classes: 'sube'},
      {data:{id:"linked2", type:"linking", source:"vegetables", target:"others"}, classes: 'sube'},
      {data:{id:"linked3", type:"linking", source:"others", target:"fruits"}, classes: 'sube'},
     ];
var klayNodes = [
      {data:{id:"linkKlay", type:"linking",}},
      {data:{id:"linked1-klay", type:"linking", source:"linkKlay", target:"fruits"}, classes: 'sube'},
      {data:{id:"linked2-klay", type:"linking", source:"linkKlay", target:"others"}, classes: 'sube'},
      {data:{id:"linked3-klay", type:"linking", source:"linkKlay", target:"vegetables"}, classes: 'sube'},
    ];
var displayLayout = "cola";
var showNamesList = {
      fruits:{names:[], varieties:[]},
      vegetables:{names:[], varieties:[]},
      others:{names:[], varieties:[]}
      };
let aggregatedData = {};
let series_high = [];
let currentStartDate = new Date().getTime();
let currentEndDate = new Date().getTime();
let selectedLabel = ""