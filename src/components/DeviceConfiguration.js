import React, { useState, useEffect } from "react";
import SensorAPI from "../api/SensorAPI";
import { BATTERY_MAX_VALUE, SENSOR_MAX_VALUE } from "./HelperFunctions";

const DeviceConfiguration = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    water_cycle: 1,
    time_to_sleep: 60,
    sensor_1_threshold: 0,
    sensor_2_threshold: 0,
  });
  const [InputValidation, setInputValidation] = useState({
    water_cycle: {
      hasError: false,
      errMsg: "Water Cycle must be between 1 and 6 seconds",
    },
    time_to_sleep: {
      hasError: false,
      errMsg: "Time to Sleep must be between 60 and 600 seconds",
    },
    sensor_1_threshold: {
      hasError: false,
      errMsg: "Sensor 1 Threshold must be between 0 and 100",
    },
    sensor_2_threshold: {
      hasError: false,
      errMsg: "Sensor 2 Threshold must be between 0 and 100",
    },
  });
  const [isEditable, setIsEditable] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const HandleInputValidation = () => {
    const newState = { ...InputValidation };
    newState.water_cycle.hasError = !(
      1 <= deviceInfo.water_cycle && deviceInfo.water_cycle <= 6
    );
    newState.time_to_sleep.hasError = !(
      60 <= deviceInfo.time_to_sleep && deviceInfo.time_to_sleep <= 600
    );
    newState.sensor_1_threshold.hasError = !(
      0 <= deviceInfo.sensor_1_threshold && deviceInfo.sensor_1_threshold <= 100
    );
    newState.sensor_2_threshold.hasError = !(
      0 <= deviceInfo.sensor_2_threshold && deviceInfo.sensor_2_threshold <= 100
    );
    setInputValidation(newState);
    setHasErrors(
      !Object.keys(InputValidation).every(
        (item) => InputValidation[item].hasError === false
      )
    );
  };

  const HandleTextChange = (e) => {
    setDeviceInfo({
      ...deviceInfo,
      [e.target.name]: e.target.value,
    });
  };

  const fetchData = async () => {
    const resp = await SensorAPI.get(`/device-config`);
    const data = resp.data.state.reported;
    setDeviceInfo({
      water_cycle: data.water_cycle,
      time_to_sleep: data.time_to_sleep,
      sensor_1_threshold: (
        (data.sensor_1_threshold / SENSOR_MAX_VALUE) *
        100
      ).toFixed(2),
      sensor_2_threshold: (
        (data.sensor_2_threshold / SENSOR_MAX_VALUE) *
        100
      ).toFixed(2),
    });
    HandleInputValidation();
  };

  const postData = async (event) => {
    event.preventDefault();
    const resp = await SensorAPI.post("/device-config", {
      state: {
        reported: {
          water_cycle: deviceInfo.water_cycle,
          time_to_sleep: deviceInfo.time_to_sleep,
          sensor_1_threshold:
            (deviceInfo.sensor_1_threshold * SENSOR_MAX_VALUE) / 100,
          sensor_2_threshold:
            (deviceInfo.sensor_2_threshold * SENSOR_MAX_VALUE) / 100,
        },
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, [true]);

  return (
    <div>
      <h2>Device Configuration Page</h2>
      <form onSubmit={(event) => postData(event)} className="ui form">
        <div className="fields">
          <div
            className={`field ${
              InputValidation.water_cycle.hasError && "error"
            }`}
          >
            <label>Water Cycle (s)</label>
            <input
              type="text"
              name="water_cycle"
              onChange={HandleTextChange}
              onBlur={HandleInputValidation}
              disabled={!isEditable}
              value={deviceInfo.water_cycle}
              placeholder="How long to pump water"
            />
          </div>
          <div
            className={`field ${
              InputValidation.time_to_sleep.hasError && "error"
            }`}
          >
            <label>Time to Sleep (s)</label>
            <input
              type="text"
              name="time_to_sleep"
              onChange={HandleTextChange}
              onBlur={HandleInputValidation}
              disabled={!isEditable}
              value={deviceInfo.time_to_sleep}
              placeholder="Device sleep duration"
            />
          </div>
        </div>
        <div className="fields">
          <div
            className={`field ${
              InputValidation.sensor_1_threshold.hasError && "error"
            }`}
          >
            <label>Sensor 1 Threshold (%)</label>
            <input
              type="text"
              name="sensor_1_threshold"
              onChange={HandleTextChange}
              onBlur={HandleInputValidation}
              disabled={!isEditable}
              value={deviceInfo.sensor_1_threshold}
              placeholder="Sensor 1 Threshold Level"
            />
          </div>
          <div
            className={`field ${
              InputValidation.sensor_2_threshold.hasError && "error"
            }`}
          >
            <label>Sensor 2 Threshold (%)</label>
            <input
              type="text"
              name="sensor_2_threshold"
              onChange={HandleTextChange}
              onBlur={HandleInputValidation}
              disabled={!isEditable}
              value={deviceInfo.sensor_2_threshold}
              placeholder="Sensor 2 Threshold Level"
            />
          </div>
        </div>
        <div className="fields">
          <div className="field">
            <button
              type="submit"
              className="ui button primary"
              disabled={hasErrors}
            >
              Submit
            </button>
          </div>
          <div className="inline field">
            <div className="ui toggle checkbox">
              <input
                type="checkbox"
                name="Editable"
                value={isEditable}
                onChange={() => setIsEditable(!isEditable)}
              />
              <label htmlFor="Editable">Editable</label>
            </div>
          </div>
        </div>
      </form>
      <div className={`ui message ${hasErrors ? "error" : "success"}`}>
        <div className="header">Following parameters must be met</div>
        <ul>
          {Object.keys(InputValidation).map((item) => (
            <li key={item}>{InputValidation[item].errMsg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeviceConfiguration;
