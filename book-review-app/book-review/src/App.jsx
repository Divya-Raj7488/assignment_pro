import "./App.css";
import BookList from "./components/BookList";
import BookDetailPage from "./components/BookDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
