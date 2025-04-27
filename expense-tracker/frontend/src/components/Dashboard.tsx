import React from "react";
import { BsFillPersonFill } from "react-icons/bs";

interface DashboardProps {
  setRenderId: React.Dispatch<React.SetStateAction<number>>;
}

const Dashboard = ({ setRenderId }: DashboardProps) => {
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row md:justify-evenly">
      <div className="w-full h-full border flex flex-col justify-center items-center gap-2 md:h-full md:w-1/3">
        <div>
          <BsFillPersonFill className="w-16 h-16" />
        </div>
        <div className="font-bold">User</div>
        <div>divya123@gmail.com</div>
      </div>
      <div className="w-full h-full border flex flex-col justify-center gap-4 md:h-full md:w-2/3">
        {/* analyse */}
      </div>
    </div>
  );
};

export default Dashboard;
