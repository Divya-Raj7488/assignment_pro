import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./features/quizSlice";
import summaryReducer from "./features/summarySlice";

export default configureStore({
  reducer: {
    quiz: quizReducer,
    summary: summaryReducer,
  },
});
