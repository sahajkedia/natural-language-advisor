import React from "react";
import NewQuestionForm from "./components/NewQuestionForm";

import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

export default function App() {
  return (
    <ThemeConfig>
      <GlobalStyles />
      <NewQuestionForm />
    </ThemeConfig>
  );
}
