import { useNavigate } from "react-router-dom";
import "./styles/App.css";

function App() {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <div className="startQuizContainer">
        <h2>hello quiz is here</h2>
        <button
          className="startQuizBtn"
          onClick={() => {
            navigate("/quiz");
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default App;
