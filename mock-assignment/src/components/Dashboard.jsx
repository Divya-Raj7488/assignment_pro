import { useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import Navbar from "./dashboard/navbar";
import DashboardTable from "./dashboard/DashboardTable";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const tableData = [
    {
      id: 1,
      title: "Getting Started with React",
      keywords: ["React", "JavaScript", "Frontend"],
      wordCount: 1250,
      createdOn: "2025-05-01",
      status: "Draft",
    },
    {
      id: 2,
      title: "Advanced CSS Techniques",
      keywords: ["CSS", "Animation", "Design"],
      wordCount: 980,
      createdOn: "2025-05-05",
      status: "Published",
    },
    {
      id: 3,
      title: "Introduction to TypeScript",
      keywords: ["TypeScript", "JavaScript", "Programming"],
      wordCount: 1520,
      createdOn: "2025-05-08",
      status: "Draft",
    },
    {
      id: 4,
      title: "Responsive Web Design",
      keywords: ["CSS", "Mobile", "Responsive"],
      wordCount: 1100,
      createdOn: "2025-05-10",
      status: "Published",
    },
    {
      id: 5,
      title: "Working with REST APIs",
      keywords: ["API", "REST", "Backend"],
      wordCount: 1340,
      createdOn: "2025-05-12",
      status: "Draft",
    },
  ];
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <Navbar />
        <DashboardTable tableData={tableData} />
      </div>
    </div>
  );
}
