import React, { useState } from "react";
import SensorBasicItem from "./SensorCurrentItem";
import { GetTimestamp } from "./HelperFunctions";

const SensorCurrentList = () => {
  const [currentTime, setCurrentTime] = useState(GetTimestamp());

  return (
    <div>
      <h2>Sensor Current Status</h2>
      <div className="ui grid">
        <div className="row">
          <SensorBasicItem
            className="eight wide column"
            id="1"
            currentTime={currentTime}
          />
          <SensorBasicItem
            className="eight wide column"
            id="2"
            currentTime={currentTime}
          />
        </div>
        <div className="row">
          <button
            className="ui button primary"
            onClick={() => setCurrentTime(GetTimestamp())}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default SensorCurrentList;
