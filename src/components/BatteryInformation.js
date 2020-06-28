import React from "react";
import BatteryStatusCurrent from "./BatteryStatusCurrent";
import BatteryStatusHistory from "./BatteryStatusHistory";

const BatteryInformation = () => {
  return (
    <div>
      <BatteryStatusCurrent />
      <div className="ui divider"></div>
      <BatteryStatusHistory />
      <div className="ui divider"></div>
    </div>
  );
};

export default BatteryInformation;
