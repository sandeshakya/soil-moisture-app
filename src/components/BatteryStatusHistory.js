import React, { useState, useEffect } from "react";
import SensorAPI from "../api/SensorAPI";
import { GetTimestamp, RandomColor } from "./HelperFunctions";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  CartesianGrid,
} from "recharts";

const BatteryStatusHistory = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(50);
  const [currentTime, setCurrentTime] = useState(GetTimestamp());

  const fetchData = async () => {
    var resp = await SensorAPI.get("/battery", {
      params: { timestamp: currentTime, limit: limit },
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
        <div className="two wide column">
          <h4>Data Points</h4>
          <select
            className="ui selection"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
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
        <LineChart width={600} height={300} data={data}>
          <XAxis
            dataKey="timestamp"
            reversed={true}
            tickFormatter={(t) => new Date(t * 1000).toLocaleTimeString()}
          />
          <YAxis domain={[0, 4095]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            key="data"
            type="monotone"
            dataKey="data"
            stroke="#0000FF"
            dot={false}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default BatteryStatusHistory;
