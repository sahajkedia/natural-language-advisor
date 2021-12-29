import React from "react";
import Assessmentfrom from "./components/Assessmentform";
import LoadQuestion from "./components/LoadQuestion";
import NewQuestionForm from "./components/NewQuestionForm";

import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

export default function App() {
  return (
    <ThemeConfig>
      <GlobalStyles />
      {/* <NewQuestionForm /> */}
      <Assessmentfrom/>
      {/* <LoadQuestion/> */}
    </ThemeConfig>
  );
}
