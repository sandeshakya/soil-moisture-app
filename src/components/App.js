import React from "react";
import SensorCurrentList from "./SensorCurrentList";
import SensorHistory from "./SensorHistory";
import BatteryStatusCurrent from "./BatteryStatusCurrent";
import BatteryStatusHistory from "./BatteryStatusHistory";
import SensorReadings from "./SensorReadings";
import BatteryInformation from "./BatteryInformation";
import Header from "./Header";
import { Router, Switch, Route } from "react-router-dom";
import history from "../history";
import Sidebar from "./Sidebar";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
        <Sidebar />
        <Switch>
          <Route path="/" exact component={SensorReadings} />
          <Route
            path="/battery-information"
            exact
            component={BatteryInformation}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
