import React from "react";
import { useState, useEffect } from "react";
import SensorAPI from "../api/SensorAPI";
import {
  GetTimestamp,
  GetBatteryPercent,
  ConvertToJSDate,
  GetBatteryVoltage,
} from "./HelperFunctions";

const BatteryStatusCurrent = () => {
  const [BatteryData, setBatteryData] = useState(0);
  const [UpdatedAt, setUpdatedAt] = useState(0);
  const [currentTime, setCurrentTime] = useState(GetTimestamp());

  const fetchData = async () => {
    const resp = await SensorAPI.get(`/battery/${currentTime}`);
    const item = resp.data.Items.pop();
    setBatteryData(item.payload.M.data.N);
    setUpdatedAt(item.timestamp.N);
  };

  useEffect(() => {
    fetchData();
  }, [currentTime]);

  return (
    <div className="battery-status">
      <h2>Battery Status</h2>
      <h3>{GetBatteryPercent(BatteryData)}%</h3>
      <h3>{GetBatteryVoltage(BatteryData)} V</h3>
      <h3>{`Last Updated on ${ConvertToJSDate(UpdatedAt)}`}</h3>
      <button
        className="ui button primary"
        onClick={() => setCurrentTime(GetTimestamp())}
      >
        Refresh
      </button>
    </div>
  );
};

export default BatteryStatusCurrent;