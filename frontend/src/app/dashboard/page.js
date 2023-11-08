import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar";
import ColumnChart from "../components/ColumnChart";
import SparklineChart from "../components/SparklineChart";
import TimeChart from "../components/TimeChart";

const Dashboard = () => {
  return (
    <div className="dashboardContainer">
      <Sidebar />
      <div className="chartContainer">
        <div className="searchBarContainer">
          <input type="text" className="searchBar" />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon" />
        </div>
        <ColumnChart />
        {/* <SparklineChart /> */}
      </div>
    </div>
  );
};

export default Dashboard;
