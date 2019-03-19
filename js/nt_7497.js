var wsCom = false;
var RobotCom = false;
NetworkTables.addWsConnectionListener(function(connected) {
  console.log("Websocket  connected: " + connected);
  wsCom = connected;
  updateCommStat();
}, true);

NetworkTables.addRobotConnectionListener(function(connected) {
  console.log("Robot connected: " + connected);
  updateCommStat();
}, true);

function updateCommStat(stat) {
  if (wsCom && RobotCom) {
    $("#Connected").html("Connected success");
    $("#WIFI").html("Ws connected");

  } else if (wsCom) {
    $("#Connected").html("No Robot");
    $("#WIFI").html("Only Ws");
  } else if (RobotCom) {
    $("#Connected").html("Only Robot");
    $("#WIFI").html("NO Ws");

  } 
}

// Connection Stat
NetworkTables.addGlobalListener(function(key, value, isNew) {
  if(key.split('/')[1] == "SmartDashboard" || false){
    console.log(key, " ", value);
  }
}, true);

//System Info
NetworkTables.addKeyListener("/LiveWindow/Ungrouped/PowerDistributionPanel[1]/Voltage", function(key, value, isNew) {
  $("#Power").html("Battery: " +value+" V");
}, true);


//FMS
NetworkTables.addKeyListener("/FMSInfo/EventName", function(key, value, isNew) {
  $("#event").html("Event "+value);
  console.log("event");
}, true);

NetworkTables.addKeyListener("/FMSInfo/MatchNumber", function(key, value, isNew) {
  $("#timer").html(value);
}, true);

NetworkTables.addKeyListener("/FMSInfo/StationNumber", function(key, value, isNew) {
  $("#station").html(value);
}, true);




//Panel
NetworkTables.addKeyListener("/SmartDashboard/Panel", function(key, value, isNew){
  var Panel = value;
  if (Panel == "up"){
    $("#Panel").attr("src","/images/PanelUP.PNG")
  }
  else  {
    $("#Panel").attr("src","/images/Panel45.PNG")
  }
}, true);



//Cyclinder
NetworkTables.addKeyListener("/SmartDashboard/Cylinder",function(value){
  var Cylinder = value;
  if (Cylinder == "OUT"){
    $("#Cylinder").attr("src","/images.CylinderIN.PNG");
  }
  else {
    $("#Cylinder").attr("src","/images.CylinderOUT.PNG");
  }
},true);





//PanelCoder
NetworkTables.addKeyListener("/SmartDashboard/PanelCoder", function(key,value,isNew){
  $("#PanelCoder").html("Panel Enc: " + value);
}, true);
//Chassis
NetworkTables.addKeyListener("/SmartDashboard/Chassis", function(value){
  switch (value)  {
    case 1:
      $("#Chassis").attr("src","/images.ChassisA.PNG");
      break;
    case 2:
      $("#Chassis").attr("src","/images.ChassisN.PNG");
    break;
    case 3:
      $("#Chassis").attr("src","/images.ChassisF.PNG");
      break;
  }
},true);


//Camera
var FrontCamURL = "http://roboRIO-7497-FRC.local:1181/?action=stream";
var GroundCamURL = "";
loadCameraOnConnect({
  container: '#Front',
  port: 80,
  host:FrontCamURL,
  image_url: '/mjpg/video.mjpg',
  data_url: '/css/common.css',  
  attrs : {
    width:640,
    height:480
  }

});

loadCameraOnConnect({

  
  container: '#Ground',
  port: 80,
  host:GroundCamURL,
  image_url: '/mjpg/video.mjpg',
  data_url: '/css/common.css',
  attrs : {
    width:640,
    height:480
  }
});


