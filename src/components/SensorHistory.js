import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  GetTimestamp,
  asyncForEach,
  RandomColor,
  GetSensorPercent,
  ConvertToJSDate,
  SENSOR_MAX_VALUE,
} from "./HelperFunctions";
import SensorAPI from "../api/SensorAPI";

const SensorHistory = () => {
  const [data, setData] = useState([]);
  const [duration, setDuration] = useState(3600);
  const [selectedSensors, setSelectedSensors] = useState({ 1: true, 2: false });
  const [currentTime, setCurrentTime] = useState(GetTimestamp());

  // for each selected sensor, get data, parse out data and timestamp
  // combine to one array for line graph
  const fetchData = async () => {
    let dataPoints = [];
    var counter = 0;
    asyncForEach(Object.keys(selectedSensors), async (id) => {
      if (selectedSensors[id]) {
        var resp = await SensorAPI.get(`/sensor/${id}`, {
          params: {
            timestamp_to: currentTime,
            timestamp_from: currentTime - duration,
          },
        });
        dataPoints[counter] = resp.data.Items.map((item) => {
          return {
            [id]: item.payload.M.data.N,
            timestamp: item.timestamp.N,
          };
        });
        // console.log(dataPoints[counter]);
        counter += 1;
      }
    }).then(() => {
      //combine to one array if multiple data points
      if (counter > 1) {
        for (var i = 1; i < counter; i++) {
          console.log(i);
          dataPoints[0] = dataPoints[0].map((item1) => {
            return {
              ...item1,
              ...dataPoints[i].find(
                (item2) => item2.timestamp === item1.timestamp
              ),
            };
          });
        }
      }
      setData(dataPoints[0]);
    });

    // setData(dataPoints[0]);
  };

  useEffect(() => {
    fetchData();
  }, [currentTime]);

  return (
    <div>
      <h2>Sensor History</h2>
      <div className="ui grid">
        <div className="five wide column">
          <h4>Duration</h4>
          <select
            name="duration"
            className="ui selection"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="3600">Last Hour</option>
            <option value="21600">Last 6 Hours</option>
            <option value="43200">Last 12 Hours</option>
            <option value="86400">Last Day</option>
          </select>
        </div>
        <div className="six wide column">
          <button
            className={`ui button ${selectedSensors[1] ? "green" : "red"}`}
            onClick={() =>
              setSelectedSensors({ ...selectedSensors, 1: !selectedSensors[1] })
            }
          >
            Sensor 1
          </button>
          <button
            className={`ui button ${selectedSensors[2] ? "green" : "red"}`}
            onClick={() =>
              setSelectedSensors({ ...selectedSensors, 2: !selectedSensors[2] })
            }
          >
            Sensor 2
          </button>
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
            name="Time"
            tickFormatter={(t) => new Date(t * 1000).toLocaleTimeString()}
            scale="linear"
          />
          <YAxis
            unit="%"
            domain={[0, SENSOR_MAX_VALUE]}
            tickFormatter={(item) => {
              return GetSensorPercent(item);
            }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            labelFormatter={(t) => ConvertToJSDate(t)}
            formatter={(value, name) => [
              `${GetSensorPercent(value)} %`,
              `Sensor ${name}`,
            ]}
          />
          <Legend />
          {Object.keys(selectedSensors).map((id) => {
            return (
              <Line
                key={id}
                type="monotone"
                dataKey={id}
                stroke={RandomColor(id)}
                dot={false}
              />
            );
          })}
        </LineChart>
      </div>
    </div>
  );
};

export default SensorHistory;
