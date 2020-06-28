import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="ui sidebar left vertical visible menu">
      <Link to="/" className="item">
        Sensor Readings
      </Link>
      <Link to="/battery-information" className="item">
        Battery Information
      </Link>
      <Link to="#" className="item">
        Configure Device
      </Link>
    </div>
  );
};

export default Sidebar;
