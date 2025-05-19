import { useEffect, useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import Navbar from "./dashboard/Navbar";
import ContentTable from "./dashboard/ContentTable";
import { tableData } from "../../data.json";
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dashboardData, setDashboardData] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    setDashboardData(tableData);
  }, [tableData]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <ContentTable tableData={dashboardData} />
      </div>
    </div>
  );
}
