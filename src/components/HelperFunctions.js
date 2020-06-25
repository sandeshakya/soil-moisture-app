import tinycolor from "tinycolor2";
var SENSOR_MIN_VALUE = 600;
var SENSOR_MAX_VALUE = 2500;
var BATTERY_MAX_VOLTAGE = 4.2;
var BATTERY_MAX_VALUE = 4095;

/**
 * Returns current unix timestamp in sensor timestamp format
 */
export const GetTimestamp = () => {
  let d = new Date();
  let timestamp = parseInt(d.getTime() / 1000);
  return timestamp;
};

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const RandomColor = (id) => {
  var color = tinycolor(
    "#" +
      ((Math.abs(Math.sin(id === 0 ? -1 : id)) * 0xffffff) << 0).toString(16)
  );
  return color.darken(25).toString();
};

export const GetSensorPercent = (val) => {
  return Math.min(
    100,
    Math.max(
      0,
      (100 * (val - SENSOR_MIN_VALUE)) / (SENSOR_MAX_VALUE - SENSOR_MIN_VALUE)
    )
  ).toFixed(2);
};

export const GetBatteryPercent = (val) => {
  return Math.min(100, Math.max(0, (100 * val) / BATTERY_MAX_VALUE)).toFixed(2);
};

export const GetBatteryVoltage = (val) => {
  return Math.min(
    BATTERY_MAX_VOLTAGE,
    Math.max(0, (BATTERY_MAX_VOLTAGE * val) / BATTERY_MAX_VALUE)
  ).toFixed(2);
};

/**
 * Convert sensor timestamp to Javascript Date
 * @param {Number} ts Sensor timestamp
 */
export const ConvertToJSDate = (ts) => {
  return new Date(ts * 1000).toLocaleString();
};
