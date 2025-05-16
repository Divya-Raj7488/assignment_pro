import { useState } from "react";
import "./App.css";
import ProductTable from "./components/ProductTable";
import Dashboard from "./components/Dashboard";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Dashboard />
    </>
  );
}

export default App;
