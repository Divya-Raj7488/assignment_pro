import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const fetchQuiz = createAsyncThunk(
  "quiz/fetchQuiz",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/Uw5CrX");
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch quiz data");
      return rejectWithValue(error.response?.data || "Error fetching quiz");
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    loading: true,
    questions: [],
    instructions: {},
    isAttempted: false,
  },
  reducers: {
    markQuizAttempted: (state) => {
      state.isAttempted = true;
    },
    markQuizUnattempted: (state) => {
      state.isAttempted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuiz.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.instructions = {
          duration: action.payload.duration,
          negativeMark: action.payload.negative_marks,
          correctAnsMarks: action.payload.correct_answer_marks,
        };
        state.questions = action.payload.questions.map((question) => ({
          id: question.id,
          description: question.description,
          isMandatory: question.is_mandatory,
          options: question.options.map((option) => ({
            id: option.id,
            description: option.description,
            isCorrect: option.is_correct,
          })),
        }));
      })
      .addCase(fetchQuiz.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { markQuizAttempted, markQuizUnattempted } = quizSlice.actions;
export default quizSlice.reducer;
