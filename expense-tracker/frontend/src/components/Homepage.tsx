import React from "react";
import "../styles/homepage.css";
interface HomepageProps {
  setRenderId: React.Dispatch<React.SetStateAction<number>>;
}
const Homepage = ({ setRenderId }: HomepageProps) => {
  return (
    <div className="homepage">
      <div className="homepageBox">
        <h1 className="text-center">Welcome to the Homepage</h1>
        <button
          className="homepageButton"
          onClick={() => {
            setRenderId(1);
          }}
        >
          Add Expenses
        </button>
      </div>
    </div>
  );
};

export default Homepage;
