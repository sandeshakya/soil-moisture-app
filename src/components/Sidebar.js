import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [curItem, setCurItem] = useState("SENSOR");
  return (
    <div className="ui three item menu">
      <Link
        to="/"
        className={`item ${curItem === "SENSOR" && "active"}`}
        onClick={() => setCurItem("SENSOR")}
      >
        Sensor Readings
      </Link>
      <Link
        to="/battery-information"
        className={`item ${curItem === "BATTERY" && "active"}`}
        onClick={() => setCurItem("BATTERY")}
      >
        Battery Information
      </Link>
      <Link
        to="/device-configuration"
        className={`item ${curItem === "CONFIG" && "active"}`}
        onClick={() => setCurItem("CONFIG")}
      >
        Device Configuration
      </Link>
    </div>
  );
};

export default Sidebar;
