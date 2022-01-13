import React from "react";
import AssessmentForm from "./components/Assessmentform";
import LoadQuestions from "./components/LoadQuestion";
import Video from "./components/Video";
import NewQuestionForm from "./components/NewQuestionForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import Test from "./components/Test";
import Quiz from "./components/quiz";

export default function App() {
  return (
    <ThemeConfig>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<NewQuestionForm />} />
          <Route path="/take-assessment" element={<AssessmentForm />} />
          <Route path="/load-questions" element={<LoadQuestions />} />
          <Route path="/video" element={<Video />} />
          <Route path="/test" element={<Test />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </ThemeConfig>
  );
}
