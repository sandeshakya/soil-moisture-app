import React, { useState, useEffect } from "react";
import SensorAPI from "../api/SensorAPI";
import "./SensorStyle.css";
import { GetSensorPercent, ConvertToDate } from "./HelperFunctions";

const SensorCurrentItem = ({ id, currentTime, className }) => {
  const [SensorData, setSensorData] = useState(0);
  const [UpdatedAt, setUpdatedAt] = useState(0);

  const fetchData = async (id) => {
    const resp = await SensorAPI.get(`/sensor/${id}/${currentTime}`);
    const item = resp.data.Items.pop();
    setSensorData(item.payload.M.data.N);
    setUpdatedAt(item.timestamp.N);
  };

  useEffect(() => {
    fetchData(id);
  }, [currentTime]);

  return (
    <div className={`sensor-basic-item ${className} `}>
      <h3>{`Sensor ${id}`}</h3>
      <h3>{GetSensorPercent(SensorData)}%</h3>
      <h3>{`Last Updated on ${ConvertToDate(UpdatedAt)}`}</h3>
    </div>
  );
};

export default SensorCurrentItem;
