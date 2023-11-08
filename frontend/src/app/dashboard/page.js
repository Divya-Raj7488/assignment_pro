'use client'
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ColumnChart from "../components/ColumnChart";
import SparklineChart from "../components/SparklineChart";
import TimeChart from "../components/TimeChart";

const Dashboard = (props) => {
  const [RenderId, setRenderId] = useState(0);
  return (
    <div className="dashboardContainer">
      <div className="sidebarContainer">
      <div className="btnContainer">
        <button className="btn" onClick={()=>{setRenderId(1)}}>Column</button>
        <button className="btn" onClick={()=>{setRenderId(2)}}>Sparkline</button>
        <button className="btn" onClick={()=>{setRenderId(3)}}>Time</button>
      </div>
    </div>
      <div className="chartContainer">
        <div className="searchBarContainer">
          <input type="text" className="searchBar" />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon" />
        </div>
        {RenderId === 0 || RenderId === 1 ? (
          <ColumnChart />
        ) : RenderId === 2 ? (
          <SparklineChart />
        ) : (
          <TimeChart />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
