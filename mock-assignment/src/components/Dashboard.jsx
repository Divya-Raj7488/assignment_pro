import { useEffect, useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import Navbar from "./dashboard/Navbar";
import ContentTable from "./dashboard/ContentTable";
import { tableData } from "../../data.json";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchedData, setSearchedData] = useState(tableData);
  const [dashboardData, setDashboardData] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [filterParam, setFilterParam] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleSearch = (searchParam) => {
    const filteredData = tableData.filter((item) => {
      return item.title.toLowerCase().includes(searchParam.toLowerCase());
    });
    setSearchedData(filteredData);
    setDashboardData(filteredData);
    if (filterParam) {
      setFilterParam("");
    }
  };
  const handleFilter = (filterParam) => {
    if (filterParam) {
      const filteredData = dashboardData.filter((item) => {
        return item.keywords.some((keyword) => {
          return keyword.toLowerCase().includes(filterParam.toLowerCase());
        });
      });
      setDashboardData(() => {
        return filteredData;
      });
    } else {
      setDashboardData(searchedData);
    }
  };

  const handleSort = (sortParam) => {
    let sortedData = [...dashboardData];

    if (sortParam === "1") {
      sortedData.sort((a, b) => a.wordCount - b.wordCount);
    } else if (sortParam === "2") {
      sortedData.sort((a, b) => b.wordCount - a.wordCount);
    } else if (sortParam === "3") {
      sortedData.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
    } else {
      sortedData.sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
    }

    setDashboardData(sortedData);
    console.log("sortedData", sortedData);
  };

  useEffect(() => {
    setDashboardData(() => {
      return tableData;
    });
  }, []);

  useEffect(() => {
    const delayedDebounced = setTimeout(() => {
      handleSearch(searchParam);
    }, 500);
    return () => clearTimeout(delayedDebounced);
  }, [searchParam]);

  useEffect(() => {
    const filterDebounced = setTimeout(() => {
      handleFilter(filterParam);
    }, 500);
    return () => clearTimeout(filterDebounced);
  }, [filterParam]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          searchParam={searchParam}
          setSearchParam={setSearchParam}
          setDashboardData={setDashboardData}
          handleSort={handleSort}
        />
        <ContentTable
          tableData={dashboardData}
          filterParam={filterParam}
          setFilterParam={setFilterParam}
        />
      </div>
    </div>
  );
}
