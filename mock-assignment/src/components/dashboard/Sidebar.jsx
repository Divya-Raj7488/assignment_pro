import React from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div
      className={`hidden md:block ${
        isSidebarOpen ? "w-64" : "w-16"
      } bg-muted/20 border-r transition-all duration-300`}
    >
      <div className="p-4 flex items-center justify-between border-b">
        {isSidebarOpen && <h1 className="text-xl font-semibold">Dashboard</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="ml-auto"
        >
          {isSidebarOpen ? (
            <ChevronLeft size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </Button>
      </div>

      <nav className="flex-1 py-4">
        <div className="space-y-1 px-2">
          {["Dashboard", "Content", "Analytics", "Settings"].map(
            (item, index) => (
              <Button
                key={index}
                variant={index === 1 ? "secondary" : "ghost"}
                className={`w-full justify-start ${!isSidebarOpen &&
                  "justify-center"}`}
              >
                <span className={`${!isSidebarOpen ? "sr-only" : ""}`}>
                  {isSidebarOpen ? item : item[0]}
                </span>
              </Button>
            )
          )}
        </div>
      </nav>

      <div className="p-4 border-t mt-auto">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-semibold">
            U
          </div>
          {isSidebarOpen && <span className="ml-2">User Name</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
