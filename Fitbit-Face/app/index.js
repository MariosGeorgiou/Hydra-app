import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { Accelerometer } from "accelerometer";
import { vibration } from "haptics";

let accelData = document.getElementById("accel-data");

let accel = new Accelerometer();

accel.start();

function refreshData() {
  let data = {
    accel: {
      x: accel.x ? accel.x.toFixed(1) : 0,
      y: accel.y ? accel.y.toFixed(1) : 0,
      z: accel.z ? accel.z.toFixed(1) : 0
    }
  };
  display(data);
}

function display(data){
  accelData.text = JSON.stringify(data.accel);
  //console.log(accelData.text);
  action(data);
}

function action(data){
  let accel = data.accel
  if(accel.x <= 8 && accel.x >= 3){
    if(accel.y >=0 && accel.y <=7){
      if(accel.z >=4 && accel.z <=7){
        console.log("drink") 
        vibration.start("nudge");
      }
    }
  }
}

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");


// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "24h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  let secs = util.zeroPad(today.getSeconds());
  myLabel.text = `${hours}:${mins}:${secs}`;
}

setInterval(refreshData, 1000);
