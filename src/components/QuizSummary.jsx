import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { evaluateQuiz, resetResponse } from "../store/features/summarySlice";
import { markQuizUnattempted } from "../store/features/quizSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify/unstyled";

export default function SummaryComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { responses, results } = useSelector((state) => state.summary);
  const { questions, isAttempted } = useSelector((state) => state.quiz);

  useEffect(() => {
    if (isAttempted && questions.length > 0) {
      dispatch(evaluateQuiz({ questions }));
    }
  }, [dispatch, isAttempted, questions]);
  if (!isAttempted) {
    return (
      <div className="not-attempted">
        <h2>Attempt the quiz first</h2>
        <button onClick={() => navigate("/")}>Go to Quiz</button>
      </div>
    );
  }

  function finishTest() {
    dispatch(markQuizUnattempted());
    dispatch(resetResponse);
    toast("Quiz Finished");
    navigate("/");
  }

  if (!results) {
    return <p>Calculating results...</p>;
  }

  return (
    <div className="summary">
      <h2>Quiz Summary</h2>
      <p>
        <strong>Total Score:</strong> {results.totalScore}
      </p>
      <p>
        <strong>Correct Answers:</strong> {results.correctAnswers}
      </p>
      <p>
        <strong>Incorrect Answers:</strong> {results.incorrectAnswers}
      </p>
      <p>
        Not Answered : <strong>{results.unAnswered}</strong>
      </p>

      <h3>Question Breakdown</h3>
      {questions.map((question) => {
        const correctOption = question.options.find(
          (option) => option.isCorrect
        );
        const studentAnswer = responses[question.id];
        console.log(studentAnswer);
        const answered = studentAnswer !== undefined;
        const isCorrect = studentAnswer === correctOption?.id;

        return (
          <div
            key={question.id}
            className={`question ${
              answered && !isCorrect ? "incorrect-answer" : ""
            }`}
          >
            <p>
              <strong>Q:</strong> {question.description}
            </p>
            <p>
              <strong>Correct Answer:</strong>{" "}
              {correctOption?.description || "N/A"}
            </p>
            <p>
              <strong>Your Answer:</strong>{" "}
              {question.options.find((opt) => opt.id === studentAnswer)
                ?.description || "Not Answered"}
            </p>
            <hr />
          </div>
        );
      })}
      <button onClick={finishTest}>Finish</button>
    </div>
  );
}
