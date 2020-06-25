import React from "react";
import SensorCurrentList from "./SensorCurrentList";

const App = () => {
  return (
    <div className="ui container">
      <h1 className="ui header">Soil Moisture App</h1>
      <SensorCurrentList />
      <div className="ui divider"></div>
    </div>
  );
};

export default App;
