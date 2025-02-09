import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  responses: {},
  results: null,
};

const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {
    saveResponse: (state, action) => {
      const { questionId, optionId } = action.payload;
      state.responses[questionId] = optionId;
    },
    evaluateQuiz: (state, action) => {
      const { questions } = action.payload;
      let correctAnswers = 0;
      let incorrectAnswers = 0;
      let totalScore = 0;
      let unAnswered = 0;

      questions.forEach((question) => {
        const correctOption = question.options.find(
          (option) => option.isCorrect
        );
        if (state.responses[question.id] === correctOption?.id) {
          correctAnswers++;
          totalScore += 4; // +4 for correct
        } else if (state.responses[question.id] !== undefined) {
          incorrectAnswers++;
          totalScore -= 1; // -1 for incorrect
        } else {
          unAnswered++;
        }
      });

      state.results = {
        totalQuestions: questions.length,
        correctAnswers,
        incorrectAnswers,
        unAnswered,
        totalScore,
      };
    },
    resetResponse: (state) => {
      state.responses = {};
    },
  },
});

export const { saveResponse, evaluateQuiz, resetResponse } =
  summarySlice.actions;
export default summarySlice.reducer;
