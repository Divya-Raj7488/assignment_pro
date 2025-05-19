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
        <Navbar searchParam={searchParam} setSearchParam={setSearchParam} />
        <ContentTable
          tableData={dashboardData}
          filterParam={filterParam}
          setFilterParam={setFilterParam}
        />
      </div>
    </div>
  );
}
