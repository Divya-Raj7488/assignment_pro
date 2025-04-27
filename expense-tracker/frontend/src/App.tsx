import React from "react";
import { useState } from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import AddExpenseForm from "./components/AddExpenseForm";

function App() {
  const [renderId, setRenderId] = useState(1);
  return (
    <main className="App">
      {renderId === 0 && <Homepage setRenderId={setRenderId} />}
      {renderId === 1 && <AddExpenseForm setRenderId={setRenderId} />}
    </main>
  );
}

export default App;
