import { useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import Navbar from "./dashboard/navbar";
import ContentTable from "./dashboard/DashboardTable";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <ContentTable />
      </div>
    </div>
  );
}
