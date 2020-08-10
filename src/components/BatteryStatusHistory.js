import React, { useState, useEffect } from "react";
import SensorAPI from "../api/SensorAPI";
import {
  GetTimestamp,
  RandomColor,
  GetSensorPercent,
  GetBatteryPercent,
  ConvertToDate,
  BATTERY_MAX_VALUE,
  GetBatteryVoltage,
  HourToMilli,
} from "./HelperFunctions";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const BatteryStatusHistory = () => {
  const [data, setData] = useState([]);
  const [duration, setDuration] = useState(1);
  const [currentTime, setCurrentTime] = useState(GetTimestamp());

  const LINE_COLOR_BATTERY_PERCENT = "#0000FF";
  const LINE_COLOR_BATTERY_VOLTAGE = "#FF0000";

  const fetchData = async () => {
    var resp = await SensorAPI.get("/battery", {
      params: {
        timestamp_to: currentTime,
        timestamp_from: currentTime - HourToMilli(duration),
      },
    });
    setData(
      resp.data.Items.map((item) => {
        return { data: item.payload.M.data.N, timestamp: item.timestamp.N };
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, [currentTime]);

  return (
    <div>
      <h2>Battery Status History</h2>
      <div className="ui grid">
        <div className="four wide column">
          <h4>Duration</h4>
          <select
            name="duration"
            className="ui selection"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="1">Last Hour</option>
            <option value="6">Last 6 Hours</option>
            <option value="12">Last 12 Hours</option>
            <option value="24">Last Day</option>
          </select>
        </div>
        <div className="five wide column">
          <button
            className="ui button primary"
            onClick={() => setCurrentTime(GetTimestamp())}
          >
            Update
          </button>
        </div>
      </div>
      <div>
        <ResponsiveContainer width="99%" height={300}>
          <LineChart data={data}>
            <XAxis
              dataKey="timestamp"
              reversed={true}
              tickFormatter={(t) => new Date(Number(t)).toLocaleTimeString()}
              scale="linear"
            />
            <YAxis
              yAxisId="left"
              unit="%"
              domain={[0, BATTERY_MAX_VALUE]}
              tickFormatter={(item) => {
                return GetBatteryPercent(item);
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              unit="V"
              domain={[0, BATTERY_MAX_VALUE]}
              tickFormatter={(item) => {
                return GetBatteryVoltage(item);
              }}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              labelFormatter={(t) => ConvertToDate(t)}
              formatter={(value, name, entry) => {
                return entry.color === LINE_COLOR_BATTERY_PERCENT
                  ? [`${GetBatteryPercent(value)} %`, "Percent"]
                  : [`${GetBatteryVoltage(value)} V`, "Voltage"];
              }}
            />
            <Line
              yAxisId="left"
              key="data"
              type="monotone"
              dataKey="data"
              stroke={LINE_COLOR_BATTERY_PERCENT}
              dot={false}
            />
            <Line
              yAxisId="right"
              key="data"
              type="monotone"
              dataKey="data"
              stroke={LINE_COLOR_BATTERY_VOLTAGE}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BatteryStatusHistory;
