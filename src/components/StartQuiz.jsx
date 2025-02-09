import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuiz, markQuizAttempted } from "../store/features/quizSlice";
import { saveResponse } from "../store/features/summarySlice";
import "../styles/quiz.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function StartQuiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, questions, instructions } = useSelector(
    (state) => state.quiz
  );

  useEffect(() => {
    dispatch(fetchQuiz());
  }, [dispatch]);

  function saveResponseFromStudent(questionId, optionId) {
    dispatch(saveResponse({ questionId, optionId }));
  }

  function submitQuiz() {
    dispatch(markQuizAttempted());
    toast.success("Quiz submitted successfully");
    navigate("/summary");
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="quizQuestion">
      <h2>Please go through all questions</h2>
      <div className="instructions">
        <div>Duration: {instructions?.duration}</div>
        <div>Negative Marks: {instructions?.negativeMark}</div>
        <div>Correct Answer Marks: {instructions?.correctAnsMarks}</div>
      </div>
      <div className="questions">
        {questions.map(({ id, description, options }, idx) => (
          <div key={id}>
            <div>
              {idx + 1}. {description}
            </div>
            <ul>
              {options.map(({ id: optionId, description }) => (
                <li key={optionId}>
                  <input
                    type="radio"
                    name={`question-${id}`}
                    id={`option-${optionId}`}
                    onClick={() => saveResponseFromStudent(id, optionId)}
                  />
                  <label htmlFor={`option-${optionId}`}>{description}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button onClick={submitQuiz}>Submit Quiz</button>
      </div>
    </div>
  );
}
