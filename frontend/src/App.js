import React from "react";
import AssessmentForm from "./components/Assessmentform";
import LoadQuestions from "./components/LoadQuestion";
import Video from "./components/Video";
import NewQuestionForm from "./components/NewQuestionForm";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import Test from "./components/Test";
import Quiz from "./components/quiz";

export default function App() {
  return (
    <ThemeConfig>
      <GlobalStyles />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={NewQuestionForm} />
          <Route path="/take-assessment" component={AssessmentForm} />
          <Route path="/load-questions" component={LoadQuestions} />
          <Route path="/video" component={Video} />
          <Route path="/test" component={Test} />
          <Route path="/quiz" component={Quiz} />
        </Switch>
      </BrowserRouter>
    </ThemeConfig>
  );
}
