import React from "react";
import SensorCurrentList from "./SensorCurrentList";
import SensorHistory from "./SensorHistory";
import BatteryStatusCurrent from "./BatteryStatusCurrent";
import BatteryStatusHistory from "./BatteryStatusHistory";

const App = () => {
  return (
    <div className="ui container">
      <h1 className="ui header">Soil Moisture App</h1>
      <SensorCurrentList />
      <div className="ui divider"></div>
      <SensorHistory />
      <div className="ui divider"></div>
      <BatteryStatusCurrent />
      <div className="ui divider"></div>
      <BatteryStatusHistory />
    </div>
  );
};

export default App;
