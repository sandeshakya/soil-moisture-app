import React from "react";
import SensorHistory from "./SensorHistory";
import SensorCurrentList from "./SensorCurrentList";

const SensorReadings = () => {
  return (
    <div>
      <SensorCurrentList />
      <div className="ui divider"></div>
      <SensorHistory />
      <div className="ui divider"></div>
    </div>
  );
};

export default SensorReadings;
