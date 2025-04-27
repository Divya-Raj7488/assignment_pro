import React from "react";
import { useState } from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import AddExpenseForm from "./components/AddExpenseForm";
import Dashboard from "./components/Dashboard";

function App() {
  const [renderId, setRenderId] = useState(2);
  return (
    <main className="App">
      {renderId === 0 && <Homepage setRenderId={setRenderId} />}
      {renderId === 1 && <AddExpenseForm setRenderId={setRenderId} />}
      {renderId === 2 && <Dashboard setRenderId={setRenderId} />}
    </main>
  );
}

export default App;
