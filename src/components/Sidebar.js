import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Sensor Readings
      </Link>
      <Link to="/battery-information" className="item">
        Battery Information
      </Link>
      <Link to="/device-configuration" className="item">
        Device Configuration
      </Link>
    </div>
  );
};

export default Sidebar;
